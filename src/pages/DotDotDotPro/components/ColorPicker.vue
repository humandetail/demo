<template>
  <VueColorPicks
    :model-value="value"
    @update:model-value="handleChange"
  >
    <div class="color-picker" :style="`--background-color: ${value}`"></div>
  </VueColorPicks>
</template>

<script setup lang="ts">
import VueColorPicks from 'vue-color-picks'
import 'vue-color-picks/index.css'

defineProps<{
  value: string
}>()

const emit = defineEmits<{ (e: 'change', color: string): void }>()

const handleChange = (color: string) => {
  emit('change', color)
}
</script>

<style lang="scss" scoped>
.color-picker {
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  border: 1px solid #f1f1f1;
  border-radius: 2px;
  background-color: var(--background-color);
  cursor: pointer;
}
</style>
