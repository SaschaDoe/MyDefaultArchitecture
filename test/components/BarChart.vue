<template>
  <div class="bar-chart" :class="{ 'vertical': isVertical }" :style="chartStyle">
    <div class="chart-area" :style="chartAreaStyle">
      <div class="bar-container" :class="{ 'vertical': isVertical }" :style="containerStyle">
        <div class="bar" :class="{ 'vertical': isVertical }">
          <div
            v-for="(section, index) in sections"
            :key="index"
            class="bar-section"
            :class="{ 'vertical': isVertical }"
            :style="getSectionStyle(section)"
          >
            <div 
              class="bar-label" 
              :class="{ 
                'vertical': isVertical, 
                'hidden': !isLabelFitting(displaySections[index])
              }"
            >
              {{ displaySections[index].label }}: {{ Math.round(displaySections[index].percentage) }}%
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="legend">
      <div 
        v-for="(section, index) in displaySections" 
        :key="'legend-' + index"
        class="legend-item"
      >
        <div class="legend-color" :style="{ backgroundColor: section.color }"></div>
        <span>
          {{ section.label }}: {{ Math.round(section.percentage) }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { BarChartService } from '../src/services/BarChartService';

export default {
  name: 'BarChart',
  props: {
    sections: {
      type: Array,
      required: true,
      validator: (sections) => {
        const totalPercentage = sections.reduce((sum, section) => sum + section.percentage, 0);
        return Math.abs(totalPercentage - 100) < 1;
      }
    },
    displaySections: {
      type: Array,
      required: true
    },
    orientation: {
      type: String,
      default: 'horizontal',
      validator: (value) => ['horizontal', 'vertical'].includes(value)
    },
    width: {
      type: [Number, String],
      default: 600
    },
    height: {
      type: [Number, String],
      default: 400
    },
    barSize: {
      type: Number,
      default: 40
    },
    isAnimating: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      barChartService: new BarChartService()
    }
  },

  computed: {
    isVertical() {
      return this.orientation === 'vertical';
    },
    chartStyle() {
      const widthVal = typeof this.width === 'number' ? `${this.width}px` : this.width;
      const heightVal = typeof this.height === 'number' ? `${this.height}px` : this.height;
      return {
        width: widthVal,
        height: heightVal,
        display: 'flex',
        flexDirection: 'column'
      }
    },
    chartAreaStyle() {
      return {
        flex: 1,
        display: 'flex',
        justifyContent: this.isVertical ? 'center' : 'flex-start',
        alignItems: this.isVertical ? 'flex-end' : 'flex-start',
        width: '100%',
        height: '100%'
      }
    },
    containerStyle() {
      if (this.isVertical) {
        return {
          height: '100%',
          width: `${this.width}px`,
          display: 'flex',
          alignItems: 'flex-end',
          transform: 'rotate(180deg)'
        }
      }
      return {
        width: '100%',
        height: `${this.barSize}px`
      }
    }
  },

  methods: {
    getSectionStyle(section) {
      const dimension = this.isVertical ? 'height' : 'width';
      const transitionProp = this.isVertical ? 'height' : 'width';
      
      return {
        [dimension]: `${section.percentage}%`,
        backgroundColor: section.color,
        transition: `${transitionProp} ${this.barChartService.getAnimationDuration()}ms ${this.barChartService.getTimingFunction()}`
      }
    },
    isLabelFitting(section) {
      // Hide label if section is less than 15% to prevent overflow
      return section.percentage >= 15;
    }
  },

  created() {
    this.barChartService.setSections(this.sections);
    this.barChartService.setOrientation(this.orientation);
  },

  watch: {
    orientation(newOrientation) {
      this.barChartService.setOrientation(newOrientation);
    }
  }
}
</script>

<style scoped>
.bar-chart {
  margin: 20px 0;
  min-height: 40px;
  width: 100%;
}

.chart-area {
  position: relative;
  min-height: 40px;
  width: 100%;
  height: 100%;
}

.bar-container {
  position: relative;
}

.bar {
  height: 100%;
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
}

.bar.vertical {
  flex-direction: column;
}

.bar-section {
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.bar-section.vertical {
  width: 100%;
  justify-content: center;
}

.bar-label {
  white-space: nowrap;
  padding: 0 8px;
  text-align: center;
  font-size: 0.9em;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}

.bar-label.animating {
  opacity: 0;
}

.bar-label.vertical {
  transform: rotate(180deg);
  position: relative;
  width: max-content;
  transform-origin: center;
}

.bar-label.hidden {
  display: none;
}

.legend {
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.legend-item span {
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}

.legend-item span.animating {
  opacity: 0;
}
</style> 