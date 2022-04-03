<template>
    <div class="body">
        <nav-bar />
        <div class="wrapper">
            <div class="box">
                <div class="box-header">
                    <span class="tag is-info is-pulled-left">{{ LABEL_TEXT }}</span>
                    <button class="delete is-pulled-right" @click="navigateBack"></button>
                </div>
                <div class="stepper">
                    <ul class="steps has-content-centered is-horizontal has-gaps">
                        <li v-for="(step, index) in SESSION_WIZARD_STEPS()"
                            :key="step.title"
                            class="steps-segment"
                            :class="{ 'is-active': index + 1 === currentStep, 'is-dashed': (index + 1) >= currentStep }">
                            <span class="steps-marker">
                                <span v-if="SESSION_WIZARD_STEPS()[index].hasIcon" class="icon">
                                    <i :class="SESSION_WIZARD_STEPS()[index].iconValue" />
                                </span>
                                <span v-else> {{ SESSION_WIZARD_STEPS()[index].iconValue }} </span>
                            </span>
                        </li>
                    </ul>
                    <ul v-for="(step, index) in SESSION_WIZARD_STEPS()"
                        :key="index"
                        class="steps-content">
                        <li v-if="(index + 1) === currentStep"
                            class="step-content">
                            <component
                                v-bind:is="step.component">
                            </component>
                        </li>
                    </ul>
                </div>
                <footer class="footer-buttons">
                    <button v-if="this.currentStep > 1"
                            class="button is-primary is-outlined no-background"
                            @click="previousStep"> {{ backButtonMessage }} </button>
                    <p v-else></p>
                    <button v-if="this.currentStep <= 4"
                            id="next-and-finish-button"
                            class="button is-primary is-outlined no-background"
                            @click="nextStep"
                            :disabled="noValidSessionDetails">{{ nextOrFinishButton }}</button>
                    <p v-else></p>
                </footer>
            </div>
        </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/components/navigation/NavBar.vue';
import SessionDetails from '@/components/wizard/utils/SessionDetails.vue';
import Routes from '@/router/Routes';
import TeamPicker from '@/components/wizard/utils/TeamPicker.vue';
import SessionWizardModule from '@/store/modules/SessionWizardModule';
import {namespace} from 'vuex-class';
import ClubTeamBackend from '@/backend/ClubTeamBackend';
import ClubTeamDto from '@/data/dto/ClubTeamDto';
import PlayerDto from '@/data/dto/PlayerDto';
import ConfirmationPage from '@/components/wizard/utils/ConfirmationPage.vue';
import SessionDto from '@/data/dto/SessionDto';
import SessionBackend from '@/backend/SessionBackend';

const ClubTeamModuleInstance = namespace('ClubTeamModule');
const SessionWizardModuleInstance = namespace('SessionWizardModule');

@Component({
    components: {
        SessionDetails,
        NavBar
    }
})
export default class SessionWizard extends Vue {

    @ClubTeamModuleInstance.Getter('clubTeamExists')
    clubTeamExist!: boolean;

    @ClubTeamModuleInstance.Getter('clubTeamPlayers')
    clubTeamPlayers!: () => PlayerDto[];

    @SessionWizardModuleInstance.Getter('sessionWizardTeamExists')
    sessionWizardTeamExists!: boolean;

    @SessionWizardModuleInstance.Getter('currentStep')
    step!: number;

    @SessionWizardModuleInstance.Getter('hasValidSessionDetails')
    hasValidSessionDetails!: boolean;

    @SessionWizardModuleInstance.Getter('session')
    getSession!: SessionDto;

    readonly LABEL_TEXT = 'Create Session';
    backButtonMessage = 'Back';
    nextButtonMessage = 'Next';

    /*
        Om errors te voorkomen tijdens refreshen van de pagina is het nodig dat zowel
        tijdens de created als mounted lifecycle hooks gecheckt wordt of de
        SessionWizardModule al bestaat binnen de store. Zo niet dan moet deze worden
        aangemaakt.
     */
    created() {
        if (this.$store.hasModule('SessionWizardModule')) {
            return;
        }
        this.$store.registerModule('SessionWizardModule', SessionWizardModule);

        if (this.clubTeamExist) {
            this.initSessionWizardPlayers();
            return;
        }

        this.getTeamDetails();
    }

    mounted() {
        if (this.$store.hasModule('SessionWizardModule')) {
            return;
        }
        this.$store.registerModule('SessionWizardModule', SessionWizardModule);

        if (this.clubTeamExist) {
            this.initSessionWizardPlayers();
            return;
        }

        this.getTeamDetails();
    }

    beforeDestroy() {
        if (this.$store.hasModule('SessionWizardModule')) {
            this.$store.unregisterModule('SessionWizardModule');
        }
    }

    initSessionWizardPlayers() {
        const clubTeamPlayers = this.clubTeamPlayers();
        this.$store.commit('SessionWizardModule/setTeam', clubTeamPlayers);
    }

    getTeamDetails() {
        ClubTeamBackend.retrieveTeam().subscribe(
            (clubTeamDto: ClubTeamDto) => {
                this.$store.commit('ClubTeamModule/setClubTeam', clubTeamDto);
                this.$store.commit('SessionWizardModule/setTeam', clubTeamDto.players);
            }, (error: any) => {
                console.error(error);
            }
        );
    }

    get currentStep() {
        return this.step;
    }

    get noValidSessionDetails() {
        return !this.hasValidSessionDetails;
    }

    get nextOrFinishButton() {
        return this.step === 4 ? this.nextButtonMessage = 'Finish' : this.nextButtonMessage;
    }

    private async nextStep(event: MouseEvent) {
        if (this.step === 4) {
            const session = this.getSession;
            SessionBackend.createSession(session).subscribe(() => this.navigateBack(event));
            return;
        }
        this.$store.commit('SessionWizardModule/setPreviousStep', this.step);
        this.$store.commit('SessionWizardModule/setStep', 1);
    }

    private previousStep() {
        if (this.step === 1) {
            return;
        }
        if (this.nextButtonMessage === 'Finish') {
            this.nextButtonMessage = 'Next';
        }
        this.$store.commit('SessionWizardModule/setPreviousStep', this.step);
        this.$store.commit('SessionWizardModule/setStep', -1);
    }

    private navigateBack(event: any) {
        if (this.currentStep === this.SESSION_WIZARD_STEPS().length && event.target.id === 'next-and-finish-button') {
            this.$toasted.global.sessionCreatedToast({
                message: this.getSession.name
            });
        }
        this.$router.push({
            name: Routes.Main
        });
    }

    readonly SESSION_WIZARD_STEPS = () => [
        {
            title: 'Session Details',
            component: SessionDetails,
            hasIcon: true,
            iconValue: 'far fa-calendar'
        },
        {
            title: 'Select First Team',
            component: TeamPicker,
            hasIcon: false,
            iconValue: 1
        },
        {
            title: 'Select Second Team',
            component: TeamPicker,
            hasIcon: false,
            iconValue: 2
        },
        {
            title: 'Confirmation',
            component: ConfirmationPage,
            hasIcon: true,
            iconValue: 'fa fa-check'
        }
    ]
}
</script>

<style scoped lang="scss">

.body {
    display: flex;
    flex-direction: column;
}

.body .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}

.body .wrapper .tag {
    display: flex;
    width: 100px;
}

.body .wrapper .box {
    display: flex;
    flex-direction: column;
    margin: 5px;
    width: 95%;
    background-color: #1e1e1e;

    .box-header {
        display: flex;
        justify-content: space-between;
    }

    .stepper {
        flex: 1;
        margin: 20px 0 0 0;
        padding: 0;

        .steps {
            margin: 20px 0 20px 0;
        }

        .steps-content .step-content {
            display: flex;
            justify-content: center;
            margin-top: 10vh;

            h1 {
                font-size: 32px;
                text-align: center;
                margin: 40px 0 40px 0;
            }
        }
    }

    .footer-buttons {
        display: flex;
        justify-content: space-between;
        margin: 5vh 0 5vh 0;
    }
}

</style>
