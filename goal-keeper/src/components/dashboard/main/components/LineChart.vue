<script>
import { Line } from 'vue-chartjs'

Chart.defaults.global.defaultFontColor = "#fff";

export default {
  extends: Line,
  props: {
    data: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  },

}
</script>

<style scoped>

</style>
