<template>
  <div class="animated-bar-chart" @click="handleClick">
    <BarChart
      :sections="currentSections"
      :display-sections="displaySections"
      :orientation="orientation"
      :width="width"
      :height="height"
      :bar-size="barSize"
      :is-animating="isAnimating"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { AnimatedBarChartService } from '../src/services/AnimatedBarChartService'
import { BarChartCalculationService } from '../src/services/BarChartCalculationService'
import BarChart from './BarChart.vue'
import type { AnimationState } from '../src/entities/AnimationListEntity'
import type { BarSection } from '../src/entities/BarChartEntity'

const props = defineProps<{
  animationStates: AnimationState<BarSection[]>[]
  orientation?: string
  width?: number | string
  height?: number | string
  barSize?: number
}>()

// Initialize with the first state's data
const currentSections = ref<BarSection[]>(props.animationStates[0].state)
const displaySections = ref<BarSection[]>(props.animationStates[0].state)
const animatedService = ref<AnimatedBarChartService | null>(null)
const isAnimating = ref(false)
const currentStateIndex = ref(0)

const calculationService = new BarChartCalculationService()

onMounted(() => {
  animatedService.value = new AnimatedBarChartService(props.animationStates)
})

watch(() => props.animationStates, (newStates) => {
  if (animatedService.value) {
    animatedService.value = new AnimatedBarChartService(newStates)
    currentSections.value = newStates[0].state
    displaySections.value = newStates[0].state
    currentStateIndex.value = 0
  }
}, { deep: true })

const handleClick = () => {
  if (!animatedService.value || isAnimating.value) {
    return
  }

  // Calculate next state index
  const nextIndex = (currentStateIndex.value + 1) % props.animationStates.length
  const nextState = props.animationStates[nextIndex]
  
  isAnimating.value = true
  displaySections.value = currentSections.value
  animateToNewState(nextState)
  currentStateIndex.value = nextIndex
}

const animateToNewState = (targetState: AnimationState<BarSection[]>) => {
  const startSections = [...currentSections.value]
  const endSections = targetState.state
  const duration = targetState.duration
  const startTime = performance.now()

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Use calculation service to handle interpolation
    currentSections.value = calculationService.calculateInterpolatedSections(
      startSections,
      endSections,
      progress
    )

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      // Animation complete - show the final state
      displaySections.value = endSections
      currentSections.value = endSections
      isAnimating.value = false
    }
  }

  requestAnimationFrame(animate)
}
</script>

<style scoped>
.animated-bar-chart {
  cursor: pointer;
  width: 100%;
  height: 100%;
}
</style> 