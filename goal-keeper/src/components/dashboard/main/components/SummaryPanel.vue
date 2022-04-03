<template>
  <div class="column">
  <div class="box">
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Team name</p>
            <span class="icon-text has-text-black">
            <span class="icon">
              <i class="fas fa-star"></i>
            </span>
              <span id="name" class="clubname">{{ teamName }}</span>
            </span>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Total sessions</p>
            <h6 class="subtitle is-6">{{ totalSessions }}</h6>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Sessions planned</p>
            <h6 class="subtitle is-6">{{sessionsPlanned}}</h6>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Sessions finished</p>
            <h6 class="subtitle is-6">{{sessionFinished}}</h6>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Avg sessions per week</p>
            <h6 class="subtitle is-6">{{avgSessions}}</h6>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import {Prop, Vue} from "vue-property-decorator";
import {namespace} from "vuex-class";
import PlayerDataDto from "@/data/dto/PlayerDataDto";
import TeamSummaryDataDto from "@/data/dto/TeamSummaryDataDto";

@Component
export default class SummaryPanel extends Vue {

  @Prop()
  teamSummaryData!: TeamSummaryDataDto | undefined;

  get teamName() {
    return this.teamSummaryData?.clubTeamName;
  }

  get sessionFinished() {
    if (this.sessionsPlanned && this.totalSessions) {
      return this.totalSessions - this.sessionsPlanned;
    } else {
      return 0
    }
  }

  get avgSessions() {
    return this.teamSummaryData?.summaryData?.find(s => s.label === 'avgSessions')?.value;
  }

  get totalSessions() {
    return this.teamSummaryData?.summaryData?.find(s => s.label === 'totalSessions')?.value;
  }

  get sessionsPlanned() {
    return this.teamSummaryData?.summaryData?.find(s => s.label === 'sessionsPlanned')?.value || 0;
  }

}
</script>

<style scoped lang="scss">

.box {
  margin-top: 40px;
  margin-right: 20px;
  margin-left: 20px;
  max-width: 1200px;
  background-color: #292929;
}

.fa-star:before {
  content: "\f005";
  color: gold;
}

.level-item .title, .level-item .subtitle {
  margin-bottom: 0;
  color: whitesmoke;
}

.heading {
  color: whitesmoke;
}

@media (max-width: 500px) {
  .box {
    margin-right: 5px;
    margin-left: 5px;
  }
}

#name {
  color: whitesmoke;
}

</style>
