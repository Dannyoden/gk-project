<template>
    <div class="body" v-if="this.clubTeam">
        <nav-bar />
        <div id="wrapper">
            <HeroBanner label="Manage team"/>
            <TeamComponent :club-team="this.clubTeam"/>
            <PlayerLabel/>
            <div class="is-flex is-flex-direction-column is-align-items-center">
                <PlayerComponent
                v-for="player in clubTeam.players"
                :key="player.id"
                :player="player"/>
            </div>
            <PlaceHolder
            v-if="this.clubTeam.players.length === 0 && this.clubTeam.id"
            icon="fas fa-arrow-down"
            :text="placeholderText"/>
            <div class="fixed-button">
                <Button
                :icon-data="{icon: 'fas fa-plus', position: 'left'}"
                class-name="button is-centered is-primary"
                text="Add Player"
                @clicked="addPlayer" />
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import NavBar from "@/components/navigation/NavBar.vue";

import ClubTeamDto from "@/data/dto/ClubTeamDto";
import ClubTeamBackend from "@/backend/ClubTeamBackend";
import Button from "@/components/common/Button.vue";
import PlayerComponent from "@/components/manageteam/components/PlayerComponent.vue";
import TeamComponent from "@/components/manageteam/components/TeamComponent.vue";
import Footer from "@/components/navigation/Footer.vue";
import HeroBanner from "@/components/common/HeroBanner.vue";
import PlayerLabel from "@/components/manageteam/components/PlayerLabel.vue";
import PlaceHolder from "@/components/common/PlaceHolder.vue";
const pText = 'You haven\'t added any players yet. You can do so by clicking the \'Add Player\' button below';

@Component({
  components: {
    PlaceHolder,
    PlayerLabel,
    TeamComponent,
    NavBar,
    PlayerComponent,
    HeroBanner,
    Footer,
    Button
  }
})
export default class ManageTeam extends Vue {

  private clubTeam: ClubTeamDto = new ClubTeamDto();
  private placeholderText = pText;

  created() {
    this.getTeam();
  }

  private addPlayer() {
    this.$router.push('/manage-team/player');
  }

  private getTeam() {
    let loader = this.initLoader();
    ClubTeamBackend.retrieveTeam().subscribe(clubTeamDto => {
      this.clubTeam = clubTeamDto;
      this.$store.commit('ClubTeamModule/setClubTeam', this.clubTeam);
    }, (error: any) => {
      console.log(error);
      loader.hide();
    }, () => {
      loader.hide();
    });
  }

  initLoader() {
    return this.$loading.show({
      opacity: 0.2,
      color: '#50ffe5',
      backgroundColor: '#ffffff',
      width: 40,
      canCancel: true
    });
  }
}

</script>

<style scoped lang="scss">


.body {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.hero-body {
    padding: 30px;
}

.box {
  margin: 20px;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%);
}

.label {
  margin-bottom: 15px;
}

.fixed-button {
  position: fixed;
  align-self: center;
  bottom: 6vh;
  z-index: 1;
}

#wrapper {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
}

@media screen and (min-width: 768px) {
  .columns {
    margin-left: -2rem;
    margin-right: -2rem;
  }
}

</style>
