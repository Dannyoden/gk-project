<template>
    <div class="body">
        <nav-bar/>
        <div class="box">
            <span class="tag is-info is-pulled-left">
                {{ label }}
            </span>
            <button class="delete is-pulled-right"
                    @click="navigateBack">
            </button>
            <div class="container">
                <label  for="team-name"
                        class="has-text-weight-bold">
                        Team name
                </label>
                <input  id="team-name"
                        class="input is-primary"
                        type="text"
                        placeholder="Team name"
                        autocomplete="off"
                        v-model="clubTeam.name">
                <div class="label">
                    <p v-if="!nameIsValid"
                       class="help is-danger has-text-weight-light">
                        Please enter your club name
                    </p>
                </div>
                <label for="competition"
                       class="has-text-weight-bold">
                    Competition
                </label>
                <input id="competition"
                       class="input is-primary"
                       type="text"
                       placeholder="Competition"
                       autocomplete="off"
                       v-model="clubTeam.competition">
                <div class="label">
                    <p v-if="!competitionIsValid"
                       class="help is-danger has-text-weight-light">
                        Please enter the name of your competition
                    </p>
                </div>
                <label for="country"
                       class="has-text-weight-bold">
                    Country
                </label>
                <input id="country"
                       class="input is-primary"
                       type="text"
                       placeholder="Country"
                       autocomplete="off"
                       v-model="clubTeam.country">
                <div class="label">
                    <p v-if="!countryIsValid"
                       class="help is-danger has-text-weight-light">
                        Please enter the country your team is in
                    </p>
                </div>
                <div class="field is-grouped">
                    <Button :icon-data="{icon: 'far fa-save', position: 'left'}"
                            class-name="button is-centered is-primary is-outlined no-background"
                            text="Save"
                            @clicked="submitForm(false)"/>
                    <Button
                        v-if="!this.storedClubTeam"
                        :icon-data="{icon: 'fas fa-angle-double-right', position: 'left'}"
                        class-name="button is-centered is-info is-outlined"
                        text="Add Players"
                        @clicked="submitForm(true)"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import NavBar from "@/components/navigation/NavBar.vue";
import Footer from "@/components/navigation/Footer.vue";
import {namespace} from "vuex-class";
import ClubTeamBackend from "@/backend/ClubTeamBackend";
import ClubTeamDto from "@/data/dto/ClubTeamDto";
import Button from "@/components/common/Button.vue";
import InputField from "@/components/common/InputField.vue";

const ClubTeamModule = namespace("ClubTeamModule");

@Component({
    components: {
        NavBar,
        Footer,
        InputField,
        Button
    }
})
export default class TeamWizard extends Vue {

    @ClubTeamModule.State('clubTeam')
    private storedClubTeam: ClubTeamDto | undefined;
    private clubTeam: ClubTeamDto | undefined;

    private nameIsValid: boolean = true;
    private competitionIsValid: boolean = true;
    private countryIsValid: boolean = true;
    private label: string | undefined;

    created() {
    if (!this.storedClubTeam) {
        this.label = 'Create team';
        this.clubTeam = {
            id: undefined,
            name: undefined,
            competition: undefined,
            country: undefined,
            players: []
        }
    } else {
            this.clubTeam = this.storedClubTeam;
            this.label = 'Edit team';
        }
    }

    private validateForm(): boolean {
        this.nameIsValid = this.clubTeam!.name?.length !> 0;
        this.competitionIsValid = this.clubTeam!.competition?.length !> 0;
        this.countryIsValid = this.clubTeam!.country?.length !> 0;
        return this.nameIsValid && this.competitionIsValid && this.countryIsValid;
    }

    submitForm(toPlayerWizard: boolean) {
        const isValid = this.validateForm();
        if (isValid && this.clubTeam && this.clubTeam.id) {
            this.updateTeam(this.clubTeam, toPlayerWizard);
        } else if (isValid && this.clubTeam && !this.clubTeam.id) {
            this.createTeam(this.clubTeam, toPlayerWizard);
        }
    }

    private createTeam(clubTeam: ClubTeamDto, toPlayerWizard: boolean){
        ClubTeamBackend.createClubTeam(clubTeam)
            .toPromise()
            .finally(() => {
                this.$toasted.global.teamCreatedToast({
                    message: this.clubTeam?.name
                });
                if (toPlayerWizard) {
                    this.$router.push('/manage-team/player');
                } else {
                    this.navigateBack();
            }
        });
    }

    private updateTeam(clubTeam: ClubTeamDto, toPlayerWizard: boolean){
        ClubTeamBackend.updateClubTeam(clubTeam)
            .toPromise()
            .finally(() => {
                this.$toasted.global.teamUpdatedToast({
                    message: this.clubTeam?.name
                });
                if (toPlayerWizard) {
                    this.$router.push('/manage-team/player');
                } else {
                    this.navigateBack();
                }
        });
    }

    navigateBack() {
        this.$router.push('/manage-team');
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

.field.is-grouped {
  display: flex;
  justify-content: flex-start;
  margin-top: 40px;
}

 .fa-save:before {
   content: "\f0c7";
   margin-right: 8px;
 }

 .fa-angle-double-right:before {
   content: "\f101";
   margin-left: 8px;
 }

.is-primary.textarea, .is-primary.input {
  border-color: turquoise;
  margin-top: 10px;
  color: #f5f5f5;
  background-color: #292929;
}

::placeholder {
  color: grey;
}

.has-text-weight-bold {
  font-weight: 700 !important;
  color: whitesmoke;
}

</style>
