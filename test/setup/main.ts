import { defineAppSetup } from '@slidev/types'
import BarChart from '../components/BarChart.vue'
import AnimatedBarChart from '../components/AnimatedBarChart.vue'

export default defineAppSetup(({ app }) => {
  app.component('BarChart', BarChart)
  app.component('AnimatedBarChart', AnimatedBarChart)
}) 