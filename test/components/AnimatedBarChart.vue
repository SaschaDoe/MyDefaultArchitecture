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

onMounted(() => {
  animatedService.value = new AnimatedBarChartService(props.animationStates)
})

watch(() => props.animationStates, (newStates) => {
  if (animatedService.value) {
    animatedService.value = new AnimatedBarChartService(newStates)
    currentSections.value = newStates[0].state
    displaySections.value = newStates[0].state
  }
}, { deep: true })

const handleClick = () => {
  if (!animatedService.value || animatedService.value.isCurrentlyAnimating()) {
    return
  }

  const nextState = animatedService.value.advance()
  animatedService.value.setAnimating(true)
  isAnimating.value = true
  
  // Keep showing the start text
  displaySections.value = currentSections.value
  animateToNewState(nextState)
}

const animateToNewState = (targetState: AnimationState<BarSection[]>) => {
  const startSections = [...currentSections.value]
  const endSections = targetState.state
  const duration = targetState.duration
  const startTime = performance.now()

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Update the bars but keep the original text until animation completes
    currentSections.value = startSections.map((startSection, index) => {
      const endSection = endSections[index]
      return {
        label: startSection.label,
        color: endSection.color,
        percentage: startSection.percentage + (endSection.percentage - startSection.percentage) * progress
      }
    })

    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      // Animation complete - show the final text
      displaySections.value = endSections
      animatedService.value?.setAnimating(false)
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