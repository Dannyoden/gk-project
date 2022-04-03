<template>
  <div class="page-wrapper">
    <nav-bar/>
    <HeroBanner label="Dashboard"/>
    <div class="columns">
      <SideMenu/>
      <div class="column">
        <SummaryPanel v-if="teamSummaryData.summaryData" :team-summary-data="teamSummaryData"/>
        <LineChartPanel v-if="chartData.datasets" :chart-data="chartData"/>
        <Table/>
      </div>
    </div>
    <Footer/>
  </div>
<!--  </div>-->
</template>
<script lang="ts">

import {Vue} from "vue-property-decorator";
import Component from "vue-class-component";
import NavBar from "@/components/navigation/NavBar.vue";
import HeroBanner from "@/components/common/HeroBanner.vue";
import SideMenu from "@/components/navigation/DropdownMenu.vue";
import Table from "@/components/dashboard/main/components/Table.vue";
import DashboardBackend from "@/backend/DashboardBackend";
import PlayerDataDto from "@/data/dto/PlayerDataDto";
import Footer from "@/components/navigation/Footer.vue";
import SummaryPanel from "@/components/dashboard/main/components/SummaryPanel.vue"
import LineChartPanel from "@/components/dashboard/main/components/LineChartPanel.vue";
import TeamSummaryDataDto from "@/data/dto/TeamSummaryDataDto";



const NOT_VALUES = ['totalSessions', 'avgSessions', 'sessionsPlanned'];

@Component({
  components: {
    HeroBanner,
    NavBar,
    SideMenu,
    Table,
    Footer,
    SummaryPanel,
    LineChartPanel
  }
})
export default class DashboardMain extends Vue {

  teamSummaryData: TeamSummaryDataDto = new TeamSummaryDataDto();
  fullPage = true;
  chartData = {};

  created() {
   this.retrieveTeamOverview();
   this.retrieveSummary()
  }

  get isActive(): boolean {
    return true;
  }

  retrieveTeamOverview(){
    let loader = this.initLoader();
    let playerDataDtos: PlayerDataDto[] = [];
    DashboardBackend.retrieveTeamOverviewData()
        .subscribe(
            (playerDataCollection: PlayerDataDto[]) => {
              playerDataCollection.forEach(playerData => {
                playerDataDtos.push(playerData);
              });
            }, (error: any) => {
              console.error(error);
              loader.hide();
              return;
            }, () => {
              this.$store.commit('DashboardModule/setClubTeamOverview', playerDataDtos);
              loader.hide();
            }
        );
  }

  retrieveSummary() {
    DashboardBackend.retrieveSummaryData()
        .subscribe(teamSummaryData => {
          this.teamSummaryData = teamSummaryData;
          if(teamSummaryData) {
            this.chartData = this.getChartData(teamSummaryData);
          }
        });
  }

  getChartData(teamSummaryData: TeamSummaryDataDto) {
    return {
      labels: ['3 weeks ago', '3 weeks ago', '2 weeks ago', 'Last 7 days'],
      datasets: [ {
        label: 'Sessions per week',
        borderColor: '#50ffe5',
        fill: false,
        data: teamSummaryData.summaryData!.filter(s => !NOT_VALUES.includes(s.label!)).map(s => s.value)
        }
      ]
    }
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

.page-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

@media screen and (min-width: 768px) {
  .columns {
    margin-left: -2rem;
    margin-right: -2rem;
  }
}


</style>
