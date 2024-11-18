<template>
  <div class="class-diagram" @click="handleClick" :style="mainStyle">
    <div class="class-title visibility">{{ title }}</div>
    <div class="class-members" :style="membersStyle">
      <!-- Fields -->
      <div class="fields-section" :style="sectionStyle">
        <div class="private-members-container" ref="privateFieldsContainer" :style="containerStyle">
          <div v-for="(field, index) in privateFields" 
               :key="'priv-field-' + index" 
               class="member private"
               :class="{ 'private-hidden': !isPrivateVisible }"
               :style="privateFieldStyle">
            <span class="visibility">-</span> {{ field }}
          </div>
        </div>
        <div v-for="(field, index) in publicFields" :key="'pub-field-' + index" class="member public">
          <span class="visibility">+</span> {{ field }}
        </div>
      </div>
      <!-- Methods -->
      <div class="methods-section" :style="sectionStyle">
        <div class="private-members-container" ref="privateMethodsContainer" :style="containerStyle">
          <div v-for="(method, index) in privateMethods" 
               :key="'priv-method-' + index" 
               class="member private"
               :class="{ 'private-hidden': !isPrivateVisible }"
               :style="privateFieldStyle">
            <span class="visibility">-</span> {{ method }}()
          </div>
        </div>
        <div v-for="(method, index) in publicMethods" :key="'pub-method-' + index" class="member public">
          <span class="visibility">+</span> {{ method }}()
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ClassDiagramService } from '../src/services/ClassDiagramService';

export default {
  name: 'ClassDiagram',
  props: {
    title: {
      type: String,
      required: true
    },
    privateFields: {
      type: Array,
      default: () => []
    },
    publicFields: {
      type: Array,
      default: () => []
    },
    privateMethods: {
      type: Array,
      default: () => []
    },
    publicMethods: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isPrivateVisible: false,
      diagramService: new ClassDiagramService(),
      privateFieldsHeight: '0',
      privateMethodsHeight: '0'
    }
  },
  computed: {
    transitionStyle() {
      return `all ${this.diagramService.getAnimationDuration()}ms ${this.diagramService.getTimingFunction()}`
    },
    mainStyle() {
      return {
        transition: this.transitionStyle
      }
    },
    membersStyle() {
      return {
        transition: this.transitionStyle
      }
    },
    sectionStyle() {
      return {
        transition: this.transitionStyle
      }
    },
    privateFieldStyle() {
      return {
        transition: this.transitionStyle,
        opacity: this.isPrivateVisible ? 1 : 0
      }
    },
    containerStyle() {
      return {
        transition: `max-height ${this.diagramService.getAnimationDuration()}ms ${this.diagramService.getTimingFunction()}`,
        maxHeight: this.isPrivateVisible ? this.diagramService.getMaxExpandedHeight() : this.diagramService.getMaxCollapsedHeight(),
        overflow: 'hidden'
      }
    }
  },
  methods: {
    handleClick() {
      this.isPrivateVisible = this.diagramService.handleDiagramClick();
    }
  }
}
</script>

<style scoped>
.class-diagram {
  border: 2px solid #333;
  border-radius: 4px;
  display: inline-block;
  min-width: 200px;
  background: white;
}

.class-title {
  padding: 8px;
  text-align: center;
  font-weight: bold;
  border-bottom: 2px solid #333;
  background: #f5f5f5;
}

.class-members {
  padding: 8px;
}

.fields-section {
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
  margin-bottom: 8px;
}

.member {
  padding: 4px 8px;
  font-family: monospace;
}

.visibility {
  display: inline-block;
  width: 15px;
  color: #666;
}

.private {
  color: #d63031;
}

.public {
  color: #00b894;
}

.private-hidden {
  pointer-events: none;
}

.private-members-container {
  max-height: 0;
  overflow: hidden;
}
</style>