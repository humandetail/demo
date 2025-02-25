<template>
  <div>
    <h1>虚拟摇杆</h1>

    <div class="rocker-container" ref="rockerContainerRef">
    </div>
  </div>
</template>

<script setup lang="ts">
import { createVirtualRocker } from './VirtualRocker.ts'

const rockerContainerRef = ref<HTMLDivElement>()

const { rocker, destroyRocker } = createVirtualRocker({
  width: 400,
  height: 300,
  baseRadius: 80,
  handleRadius: 40,
  baseColor: [255, 255, 255],
  handleColor: [240, 255, 196],
  edgeLightColor: [255, 255, 0],
  onDirectionChange: (direction) => {
    console.log(direction)
  }
})

onMounted(() => {
  rockerContainerRef.value!.appendChild(rocker)
})

onBeforeUnmount(() => {
  destroyRocker()
})
</script>

<style scoped>
:deep(canvas) {
  border: 1px solid black;
  display: block;
  margin: 0 auto;
  background-color: #73d4ec;
  touch-action: none;
  /* 防止触摸默认行为 */
}
</style>
