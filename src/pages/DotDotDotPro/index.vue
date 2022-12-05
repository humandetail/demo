<template>
  <div class="dot-dot-dot-pro">
    <MainCanvas />
    <AsideVue />
  </div>
</template>

<script setup lang="ts">
import { GlobalState, ItemState, PxItem } from './types'
import MainCanvas from './components/MainCanvas.vue'
import AsideVue from './components/aside/index.vue'
import { createPxItems } from './lib/utils'

const globalState = reactive<GlobalState>({
  row: 10,
  column: 10,
  gap: 0,
  size: 32,
  scale: 1,
  fill: 'transparent',
  stroke: 'transparent',
  background: 'transparent',
  gridVisible: true
})

const itemState = reactive<ItemState>({
  rx: 0,
  ry: 0,
  fill: 'transparent',
  stroke: 'transparent'
})

const pxItems = ref<PxItem[]>([])
const currentItem = ref<PxItem | null>(null)

watch(() => [globalState.row, globalState.column], () => {
  pxItems.value = createPxItems({
    row: globalState.row,
    column: globalState.column
  })
}, {
  immediate: true
})

provide('globalState', globalState)
provide('itemState', itemState)
provide('pxItems', pxItems)
provide('currentItem', currentItem)
</script>

<style lang="scss" scoped>
.dot-dot-dot-pro * {
  box-sizing: border-box;
}
</style>
