<template>
  <div ref="containerRef" class="container">
    <canvas
      ref="canvasRef"
      class="canvas"
    />

    <button @click="playAgain">再来！</button>
  </div>
</template>

<script setup lang="ts">
import CATransition from './libs/CATransition'

const containerRef = ref<HTMLDivElement>()
const canvasRef = ref<HTMLCanvasElement>()

const cat = ref<CATransition>()

onMounted(() => {
  if (canvasRef.value) {
    const { width, height } = containerRef.value!.getBoundingClientRect()

    cat.value = new CATransition(canvasRef.value, {
      width,
      height
    })

    cat.value.draw({
      circle: {
        duration: 2,
        fill: 'rgba(0, 163, 255, .2)'
      },
      bg: {
        duration: 1,
        fill: 'rgb(43, 45, 51)'
      }
    })
  }
})

const playAgain = () => {
  if (cat.value) {
    cat.value.draw({
      circle: {
        duration: 2,
        fill: 'rgba(0, 163, 255, .2)'
      },
      bg: {
        duration: 1,
        fill: 'rgb(43, 45, 51)'
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 800px;
  height: 600px;

  button {
    padding: 0 32px;
    height: 36px;
    font-size: 16px;
    cursor: pointer;
  }
}
</style>
