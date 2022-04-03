<template>
    <div class="body"
        :key="componentKey">
        <nav-bar/>
        <div class="box">
            <span class="tag is-info is-pulled-left">{{ label }}</span>
            <button class="delete is-pulled-right"
                    @click="navigateBack">
            </button>
            <div class="container">
                <div class="field">
                    <label  class="label"
                            for="given-name">
                        Given name
                    </label>
                <div class="control has-icons-left has-icons-right">
                    <input  id="given-name"
                            class="input is-primary"
                            v-model="player.givenName"
                            type="text"
                            placeholder="enter a given name"
                            autocomplete="off">
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </div>
                <p v-if="!givenNameValid"
                   class="help is-danger">
                    Please enter a valid given name
                </p>
            </div>
            <div class="field">
                <label  class="label"
                        for="surname">
                    Surname
                </label>
                <div class="control has-icons-left has-icons-right">
                    <input  id="surname"
                            class="input is-primary"
                            v-model="player.surname"
                            type="text"
                            placeholder="enter a surname"
                            autocomplete="off">
                    <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                    </span>
                </div>
                <p v-if="!lastnameValid"
                   class="help is-danger">
                    Please enter a valid surname
                </p>
            </div>
            <div class="field">
                <label class="label"
                        for="shirt-number">
                    Shirt number
                </label>
                <div class="control has-icons-left has-icons-right">
                    <input  id="shirt-number"
                            class="input is-primary"
                            v-model="player.shirtNumber"
                            type="number"
                            placeholder="enter a shirt number"
                            autocomplete="off">
                    <span class="icon is-small is-left">
                        <i class="fas fa-tshirt"></i>
                    </span>
                </div>
                <p v-if="!shirtNumberIsValid"
                   class="help is-danger">
                    Please enter a shirt number between 1 and 99
                </p>
            </div>
            <div class="field">
                <label class="label"
                        for="position">
                    Position
                </label>
                <div class="control">
                    <div class="select is-primary">
                        <select id="position"
                                v-model="player.position">
                            <option>GOALKEEPER</option>
                            <option>DEFENDER</option>
                            <option>MIDFIELDER</option>
                            <option>STRIKER</option>
                        </select>
                    </div>
                </div>
                <p v-if="!positionValid"
                   class="help is-danger">
                    Please select a position
                </p>
            </div>
            <div class="field">
                <label  class="label"
                        for="preferred-foot">
                    Preferred foot
                </label>
                <div class="control">
                    <div class="select is-primary">
                        <select id="preferred-foot"
                                v-model="player.preferredFoot">
                            <option>RIGHT</option>
                            <option>LEFT</option>
                            <option>BOTH</option>
                        </select>
                    </div>
                </div>
                <p v-if="!preferredFootValid"
                   class="help is-danger">
                    Please select the preferred foot
                </p>
            </div>
            <date-picker
                label="Date of birth"
                :date="date"
                @dateChanged="setDate">
            </date-picker>
                <div class="field is-grouped">
                    <Button v-if="isEditPlayer"
                            :icon-data="{icon: 'fas fa-trash-alt', position: 'left'}"
                            class-name="button is-centered is-danger is-outlined"
                            @clicked="changeShowRemovePlayerPopUp"/>
                    <Button :icon-data="{icon: 'far fa-save', position: 'left'}"
                            class-name="button is-centered is-primary is-outlined no-background"
                            text="Save"
                            @clicked="submitForm(true)"/>
                    <Button :icon-data="{icon: 'fas fa-angle-double-right', position: 'right'}"
                            class-name="button is-centered is-info is-outlined"
                            text="Add more"
                            @clicked="submitForm(false)"/>
                </div>
                <PopUp
                    v-if="showRemovePlayerPopUp"
                    :pop-up-text="this.removePlayerMessage"
                    @decline="changeShowRemovePlayerPopUp"
                    @confirm="removePlayer" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import NavBar from "@/components/navigation/NavBar.vue";
import Footer from "@/components/navigation/Footer.vue";
import PlayerDto from "@/data/dto/PlayerDto";
import ClubTeamDto from "@/data/dto/ClubTeamDto";
import Button from "@/components/common/Button.vue";
import {namespace} from "vuex-class";
import PlayerBackend from "@/backend/PlayerBackend";
import DatePicker from "@/components/wizard/utils/DatePicker.vue";
import PopUp from '@/components/common/PopUp.vue';
import {findPlayerByIdAndTeam} from '@/components/wizard/utils/SessionWizardUtils';

const ClubTeamModule = namespace("ClubTeamModule");
const ADD_PLAYER = 'Add player';
const EDIT_PLAYER = 'Edit player';

@Component({
    components: {
        PopUp,
        NavBar,
        Footer,
        DatePicker,
        Button
    }
})
export default class PlayerWizard extends Vue {

    @ClubTeamModule.State('clubTeam')
    private clubTeam!: ClubTeamDto;

    private componentKey = 0;
    private label = ADD_PLAYER;
    private givenNameValid = true;
    private lastnameValid = true;
    private preferredFootValid = true;
    private shirtNumberIsValid = true;
    private positionValid = true;
    private showRemovePlayerPopUp = false;

    player: PlayerDto = {
        id: undefined,
        givenName: undefined,
        surname: undefined,
        shirtNumber: undefined,
        position: undefined,
        preferredFoot: undefined,
        dateOfBirth: undefined
    }

    created() {
        const playerId = this.$route.params.playerId;
        if (playerId && this.clubTeam.players) {
            this.label = EDIT_PLAYER;
            this.player = findPlayerByIdAndTeam(playerId, this.clubTeam.players)!;
        }
    }

    get date() {
        return this.player.dateOfBirth;
    }

    get isEditPlayer() {
        return this.label === EDIT_PLAYER;
    }

    get isAddPlayer() {
        return this.label === ADD_PLAYER;
    }

    private setDate(date: Date) {
        this.player.dateOfBirth = date;
    }

    get removePlayerMessage(): string {
        return 'Are you sure you want to delete ' + this.player.givenName + ' ' + this.player.surname + '?';
    }

    changeShowRemovePlayerPopUp() {
        this.showRemovePlayerPopUp = !this.showRemovePlayerPopUp;
    }

    createEmptyPlayerWizard() {
        this.componentKey += 1;
        if (this.label === EDIT_PLAYER) {
            this.label = ADD_PLAYER;
        }
        this.player = new PlayerDto();
    }

    private removePlayer() {
        if (this.player) {
            PlayerBackend.deletePlayer(this.player)
                .subscribe(() => {
                    this.navigateBack();
                })
        }
    }

    submitForm(navigateBack: Boolean) {
        const isValid = this.validateForm();
            if (isValid && this.player) {
                PlayerBackend.upsertPlayer(this.player)
                    .subscribe(() => {
                        if (this.isEditPlayer) {
                            this.$toasted.global.playerUpdatedToast({
                                message: this.player.givenName + ' ' + this.player.surname
                            });
                        }
                        if (this.isAddPlayer) {
                            this.$toasted.global.playerAddedToast({
                                message: this.player.givenName + ' ' + this.player.surname
                            });
                        }
                        if (navigateBack) {
                            this.navigateBack();
                        } else {
                            this.createEmptyPlayerWizard();
                        }
                    });
            }
    }

    navigateBack() {
        this.$router.push('/manage-team');
    }

    private validateForm(): boolean {
        this.givenNameValid = this.player!.givenName?.length !> 0;
        this.lastnameValid = this.player!.surname?.length !> 0;
        this.shirtNumberIsValid = !this.player!.shirtNumber ? false : this.player.shirtNumber >= 1 && this.player.shirtNumber <= 99;
        this.positionValid = this.player!.position?.length !> 0;
        this.preferredFootValid = this.player!.preferredFoot?.length !> 0;
        return this.givenNameValid && this.lastnameValid && this.shirtNumberIsValid && this.positionValid && this.preferredFootValid;
    }

}
</script>

<style scoped lang="scss">

.box {
    margin: 20px;
    background-color: #292929;
}

.container {
    margin-top: 50px;
}

.label:not(:last-child) {
    margin-bottom: 0.5em;
    color: whitesmoke;
}

.field.is-grouped {
    display: flex;
    justify-content: flex-start;
    margin-top: 40px;
}

.steps:not(.is-hollow) .steps-segment.is-active .steps-marker:not(.is-hollow) {
    background-color: #06d1b2;
    color: #fff;
}

.fa-save:before {
    content: "\f0c7";
    margin-right: 8px;
}

.fa-angle-double-right:before {
    content: "\f101";
    margin-left: 8px;
}

.select.is-primary select {
    border-color: turquoise;
    background-color: #262626;
    color: whitesmoke;
}

.control.has-icons-right .input, .control.has-icons-right .select select {
    padding-right: 2.5em;
    background-color: #262626;
    color: whitesmoke;
}

::placeholder {
    color: grey;
}
</style>
