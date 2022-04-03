<template>
  <div class="column">
    <div class="box">
      <line-chart class="line-chart" v-if="this.chartData" :options="options" :data="chartDataObject" />
    </div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import {Prop, Vue} from "vue-property-decorator";
import LineChart from "@/components/dashboard/main/components/LineChart.vue";
import DashboardBackend from "@/backend/DashboardBackend";
import {namespace} from "vuex-class";
import TeamSummaryDataDto from "@/data/dto/TeamSummaryDataDto";

@Component({
  components: {
    LineChart
  }
})
export default class LineChartPanel extends Vue {

  @Prop()
  chartData!: any;
  options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 1
        }
      }]
    }
  }

  get chartDataObject() {
    return this.chartData;
  }

}
</script>

<style scoped lang="scss">

.box {
  margin-top: 20px;
  margin-right: 20px;
  margin-left: 20px;
  max-width: 1200px;
  max-height: 500px;
}
.chartjs-render-monitor {
  animation: chartjs-render-animation 0.05s;
  display: inline-block;
}


@media (max-width: 500px) {
  .box {
    margin-right: 0px;
    margin-left: 0px;
  }

  .line-chart {
    width: 310px;
  }
}

.box {
  background-color: #292929;
}
</style>
