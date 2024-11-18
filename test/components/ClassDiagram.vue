<template>
  <div class="class-diagram" @click="handleClick">
    <div class="class-title visibility">{{ title }}</div>
    <div class="class-members">
      <!-- Fields -->
      <div class="fields-section">
        <div v-for="(field, index) in privateFields" 
             :key="'priv-field-' + index" 
             class="member private"
             :class="{ 'private-hidden': !isPrivateVisible }"
             :style="privateFieldStyle">
          <span class="visibility">-</span> {{ field }}
        </div>
        <div v-for="(field, index) in publicFields" :key="'pub-field-' + index" class="member public">
          <span class="visibility">+</span> {{ field }}
        </div>
      </div>
      <!-- Methods -->
      <div class="methods-section">
        <div v-for="(method, index) in privateMethods" 
             :key="'priv-method-' + index" 
             class="member private"
             :class="{ 'private-hidden': !isPrivateVisible }"
             :style="privateFieldStyle">
          <span class="visibility">-</span> {{ method }}()
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
      diagramService: new ClassDiagramService()
    }
  },
  computed: {
    privateFieldStyle() {
      return {
        transition: `opacity ${this.diagramService.getAnimationDuration()}ms ease-in-out`,
        opacity: this.isPrivateVisible ? 1 : 0
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
</style>