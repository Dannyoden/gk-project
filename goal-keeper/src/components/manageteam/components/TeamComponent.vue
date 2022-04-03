<template>
  <div class="box">
    <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Team name</p>
            <span class="icon-text has-text-black">
          <span class="icon">
            <i class="fas fa-star"></i>
          </span>
            <span id="name" class="clubname">{{ clubTeam.name }}</span>
          </span>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Strikers</p>
          <h6 class="subtitle is-6">{{numberOfPlayersWithPosition('STRIKER')}}</h6>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Midfielders</p>
          <h6 class="subtitle is-6">{{numberOfPlayersWithPosition('MIDFIELDER')}}</h6>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Defenders</p>
          <h6 class="subtitle is-6">{{numberOfPlayersWithPosition('DEFENDER')}}</h6>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Goalkeepers</p>
          <h6 class="subtitle is-6">{{numberOfPlayersWithPosition('GOALKEEPER')}}</h6>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Total</p>
          <h6 class="subtitle is-6">{{ numberOfPlayers }}</h6>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <div class="buttons" @click.prevent="editTeam">
            <a class="button is-primary is-outlined">
              Edit team
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import ClubTeamDto from '@/data/dto/ClubTeamDto';

@Component
export default class TeamComponent extends Vue {

    @Prop() private clubTeam! : ClubTeamDto | undefined;

    private editTeam() {
      this.$router.push('manage-team/edit');
    }

    get numberOfPlayers() {
      return this.clubTeam?.players?.length || 0;
    }

    private numberOfPlayersWithPosition(position: string): number {
        return this.clubTeam?.players.filter(p => p.position === position).length || 0;
    }
}

</script>
<style scoped lang="scss">

.box {
    margin-right: 20px;
    margin-left: 20px;
    background-color: #292929;
}

.title {
  font-size: 1.5rem;
}

.heading {
  color: whitesmoke;
}

#name {
  color: whitesmoke;
}

.level-item .title, .level-item .subtitle {
  margin-bottom: 0;
  color: whitesmoke;
}

.fa-star:before {
  content: "\f005";
  color: gold;
}

</style>
