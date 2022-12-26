<template>
  <section class="global-state">
    <header class="header">
      <h2 class="title">Global State</h2>
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
              :value="globalState[item.name]"
              @input="(e) => handleInput(item.name, e)"
            >
          </template>

          <template v-else-if="item.type === 'color'">
            <ColorPicker
              :value="(globalState[item.name] as string)"
              @change="(e: string) => handleInput(item.name, e)"
            />
          </template>

          <template v-else-if="item.type === 'range'">
            <input
              type="range"
              :value="globalState[item.name]"
              :min="(item.min || 0)"
              :max="(item.max || 100)"
              :step="(item.step || 1)"
              @input="(e) => handleInput(item.name, e)"
            >
          </template>

          <template v-else-if="item.type === 'radio'">
            <label
              v-for="radioItem of item.options"
              :key="radioItem.value + ''"
            >
              <input
                type="radio"
                :checked="globalState[item.name] === radioItem.value"
                :name="item.name"
                :value="radioItem.value"
                @input="(e) => handleInput(item.name, e)"
              />
              <span class="radio-label">{{ radioItem.label }}</span>
            </label>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ColorPicker from '../../ColorPicker.vue'
import { GlobalState } from '../../../types'

const globalState = inject<GlobalState>('globalState')!

const formItems: {
  label: string
  name: keyof GlobalState
  type: string
  [key: string]: any
}[] = [
  { label: '行数', name: 'row', type: 'number' },
  { label: '列数', name: 'column', type: 'number' },
  { label: '间隙', name: 'gap', type: 'number' },
  { label: '元素尺寸', name: 'size', type: 'number' },
  { label: '缩放', name: 'scale', type: 'range', min: 0.1, max: 1, step: 0.1 },
  { label: '显示网格', name: 'gridVisible', type: 'radio', options: [{ label: '是', value: true }, { label: '否', value: false }] },
  { label: '背景颜色', name: 'background', type: 'color' },
  { label: '填充', name: 'fill', type: 'color' },
  { label: '描边', name: 'stroke', type: 'color' }
]

const handleInput = (name: keyof GlobalState, e: any) => {
  console.log(e)
  switch (name) {
    case 'row':
    case 'column':
    case 'gap':
    case 'size':
    case 'scale':
      globalState[name] = Number(e.target.value)
      break
    case 'gridVisible':
      globalState[name] = JSON.parse(e.target.value)
      break
    case 'background':
    case 'fill':
    case 'stroke':
      globalState[name] = e
      break
  }
}
</script>
