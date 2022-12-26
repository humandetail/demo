<template>
  <main class="main-canvas">
    <svg
      ref="svgRef"
      :width="width"
      :height="height"
      :view-box="`0 0 ${width} ${height}`"
      :style="(`background-color: ${globalState.background}`)"
      v-click-outside="handleClickOutside"
    >
      <g v-show="globalState.gridVisible" name="grid">
        <g
          v-for="x in globalState.column"
          :key="`col-line-${x}`"
          :transform="getLineTransform(x, 'column')"
        >
          <line
            :x1="0"
            :y1="0"
            :x2="0"
            :y2="height"
            stroke="#f1f1f1"
          />
          <line
            :x1="globalState.size"
            :y1="0"
            :x2="globalState.size"
            :y2="height"
            stroke="#f1f1f1"
          />
        </g>
        <g
          v-for="y in globalState.row"
          :key="`row-line-${y}`"
          :transform="getLineTransform(y, 'row')"
        >
          <line
            :x1="0"
            :y1="0"
            :x2="width"
            :y2="0"
            stroke="#f1f1f1"
          />
          <line
            :x1="0"
            :y1="globalState.size"
            :x2="width"
            :y2="globalState.size"
            stroke="#f1f1f1"
          />
        </g>
      </g>

      <g
        name="items"
        :transform="`translate(${globalState.gap}, ${globalState.gap})`"
      >
        <g
          v-for="item of pxItems"
          :key="`${item.x},${item.y}`"
          name="item"
          :transform="getPxItemTransform(item)"
          @click="handleItemClick(item)"
        >
          <rect
            :width="globalState.size"
            :height="globalState.size"
            :rx="item.rx"
            :ry="item.ry"
            :fill="item.fill"
            :stroke="item.stroke"
          />
        </g>
      </g>

      <g
        v-if="currentItem"
        name="current"
        :transform="getPxItemTransform(currentItem)"
      >
        <rect
          :width="globalState.size"
          :height="globalState.size"
          fill="transparent"
          stroke="#0088ff"
        />
      </g>
    </svg>
  </main>
</template>

<script setup lang="ts">
import { GlobalState, PxItem } from '../types'

const svgRef = ref()

const pxItems = inject('pxItems', ref<PxItem[]>([]))
const currentItem = inject('currentItem', ref<PxItem | null>(null))

const globalState = inject<GlobalState>('globalState')!

const width = computed(() => globalState.column * globalState.size + (globalState.column + 1) * globalState.gap)
const height = computed(() => globalState.row * globalState.size + (globalState.row + 1) * globalState.gap)

const getLineTransform = (val: number, type: 'column' | 'row'): string => {
  const translate = (val - 1) * globalState.size + val * globalState.gap
  if (type === 'column') {
    return `translate(${translate}, 0)`
  }

  return `translate(0, ${translate})`
}

const getPxItemTransform = ({ x, y }: PxItem): string => `translate(${x * globalState.size + x * globalState.gap}, ${y * globalState.size + y * globalState.gap})`

const handleItemClick = (item: PxItem): void => {
  if (item.fill === 'transparent') {
    item.fill = globalState.fill
  }

  if (item.stroke === 'transparent') {
    item.stroke = globalState.stroke
  }

  currentItem.value = item
}

const handleClickOutside = (e: Event) => {
  if (document.querySelector('.dot-pro-aside')!.contains((e.target as HTMLElement))) {
    return
  }
  currentItem.value = null
}

defineExpose({
  svgRef
})
</script>
