<template>
  <section v-if="currentItem" class="item-state">
    <header class="header">
      <h2 class="title">Item State</h2>
    </header>

    <div class="form-wrapper">
      <div
        v-for="item of formItems"
        :key="item.name"
        class="form-item"
      >
        <div class="form-item-label">
          {{ item.label }}：
        </div>
        <div class="form-item-value">
          <template v-if="item.type === 'number'">
            <input
              type="number"
              :value="currentItem[item.name]"
              @input="(e) => handleInput(item.name, e)"
            >
          </template>

          <template v-else-if="item.type === 'color'">
            <input
              type="color"
              :value="currentItem[item.name]"
              @input="(e) => handleInput(item.name, e)"
            >
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PxItem } from '../../../types'

const currentItem = inject('currentItem', ref<PxItem | null>(null))

const formItems: {
  label: string
  name: keyof PxItem
  type: string
  [key: string]: any
}[] = [
  { label: 'rx', name: 'rx', type: 'number' },
  { label: 'ry', name: 'ry', type: 'number' },
  { label: '填充', name: 'fill', type: 'color' },
  { label: '描边', name: 'stroke', type: 'color' }
]

const handleInput = (name: keyof PxItem, e: any) => {
  if (!currentItem.value) return
  switch (name) {
    case 'rx':
    case 'ry':
      currentItem.value[name] = Number(e.target.value)
      break
    case 'fill':
    case 'stroke':
      currentItem.value[name] = e.target.value
      break
  }
}
</script>
