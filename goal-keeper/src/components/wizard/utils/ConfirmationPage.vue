<template>
    <div id="confirmation-page-wrapper">
        <div class="box">
            <div id="session-details">
                <p> Date: {{ sessionDate }} </p>
                <p> Name: {{ sessionName }} </p>
                <p> Duration: {{ sessionDuration }} minutes</p>
            </div>
        </div>
        <div class="box">
            <h5 class="title is-5">First Team</h5>
            <div class="team">
                <div class="card-content first-team-player"
                     v-for="player in firstTeam"
                     :key="player.player.id">
                    {{ player.hasDuplicateName ? player.player.givenName + ' ' + player.player.surname : player.player.givenName }}
                </div>
            </div>
        </div>
        <div class="box">
            <h5 class="title is-5">Second Team</h5>
            <div class="team">
                <div class="card-content second-team-player"
                     v-for="player in secondTeam"
                     :key="player.player.id">
                    {{ player.hasDuplicateName ? player.player.givenName + ' ' + player.player.surname : player.player.givenName }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {SessionTeam} from '@/data/enum/SessionTeam';
import {SessionWizardPlayer} from '@/data/interface/SessionWizardPlayer';

const SessionWizardModuleInstance = namespace('SessionWizardModule')

@Component
export default class ConfirmationPage extends Vue {

    @SessionWizardModuleInstance.Getter('sessionName')
    getSessionName: string | undefined;

    @SessionWizardModuleInstance.Getter('sessionDuration')
    getSessionDuration: number | undefined;

    @SessionWizardModuleInstance.Getter('sessionDate')
    getSessionDate: Date | undefined;

    @SessionWizardModuleInstance.Getter('playersOfTeam')
    getPlayersOfTeam!: (team: SessionTeam) => SessionWizardPlayer[];

    get sessionName(): string {
        return this.getSessionName ? this.getSessionName : '';
    }

    get sessionDuration(): number | string {
        return this.getSessionDuration ? this.getSessionDuration : '';
    }

    get sessionDate(): Date | string {
        if (!this.getSessionDate) {
            return '';
        }
        return this.getSessionDate ? this.getSessionDate.toLocaleDateString('nl') : '';
    }

    get firstTeam() {
        return this.getPlayersOfTeam(SessionTeam.FIRST);
    }

    get secondTeam() {
        return this.getPlayersOfTeam(SessionTeam.SECOND);
    }

}
</script>

<style scoped lang="scss">

#confirmation-page-wrapper {
    max-width: 500px;
    width: 100%;
}

#session-details {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.team {
    display: flex;
    flex-wrap: wrap;
}

.title.is-5, #session-details {
  color:  whitesmoke;
}

.card-content {
    margin: 5px;
    padding: 10px;
    border-radius: 5px;
}

.first-team-player {
    background: turquoise;
}

.second-team-player {
    background: lightcoral;
}

.box {
  background-color: #363636;
}


</style>
