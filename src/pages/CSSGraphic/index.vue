<template>
  <div class="page-css-graphic">
    <div class="input-wrapper">
      <label class="label" for="J_input">
        选择图片
      </label>

      <div class="tips">
        请勿选择太大的图片，以免造成浏览器崩溃(建议使用 100kb 以下图片)
      </div>

      <input
        class="input"
        id="J_input"
        type="file"
        accept="image/*"
        @input="handleFileChange"
      />
    </div>

    <div
      ref="wrapperRef"
      class="wrapper"
      :class="{
        loading
      }"
    >
    </div>
  </div>
</template>

<script setup lang="ts">
type PixelData = {
  x: number
  y: number
  color: string
}

const wrapperRef = ref<HTMLDivElement>()
const imgData = ref<PixelData[][]>([])
const width = ref(0)
const height = ref(0)
const loading = ref(false)

const bg = computed(() => {
  return imgData.value.map(item => item.reduce((prev, pixelData) => {
    return prev + `${prev ? ',' : ''}linear-gradient(${pixelData.color}, ${pixelData.color}) no-repeat ${pixelData.x}px 0/1px 1px`
    // return prev + `${prev ? ',' : ''}linear-gradient(${pixelData.color}, ${pixelData.color}) no-repeat ${pixelData.x}px ${pixelData.y}px/1px 1px`
    // return prev + `${prev ? ',' : ''}${pixelData.x}px ${pixelData.y}px ${pixelData.color}`
  }, ''))
})

const oImg = new Image()

oImg.onload = () => {
  loading.value = true

  const { width: w, height: h } = oImg

  width.value = w
  height.value = h

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h

  const ctx = canvas.getContext('2d')!

  ctx.drawImage(oImg, 0, 0)

  const { data } = ctx.getImageData(0, 0, w, h)
  let x = 0
  let y = 0

  const arr: PixelData[][] = [[]]

  ctx.clearRect(0, 0, w, h)

  for (let i = 0; i < data.length; i++) {
    if ((i + 1) % 4 === 0) {
      arr[y].push({
        x: x + 1,
        y,
        color: `rgba(${data[i - 3]}, ${data[i - 2]}, ${data[i - 1]}, ${data[i] / 255})`
      })

      if (++x % w === 0) {
        x = 0
        y++
        if (y < h) {
          arr.push([])
        }
      }
    }
  }

  imgData.value = arr

  loading.value = false
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const src = URL.createObjectURL(target.files![0])
  oImg.src = src
}

watch(bg, () => {
  const html = bg.value.reduce((prev, item) => {
    return prev + `
      <div
        style="
          width: ${width.value}px;
          height: 1px;
          background: ${item};
        "
      />
      </div>
    `
  }, '')

  wrapperRef.value!.innerHTML = html
})
</script>

<style lang="scss" scoped>
.page-css-graphic {
  padding: 16px 0;

  .input-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;

    .label {
      padding: 6px 16px;
      color: #fff;
      border: 1px solid #f1f1f1;
      border-radius: 6px;
      background-color: #0088ff;
      white-space: nowrap;
      cursor: pointer;
    }

    .tips {
      flex: 1;
      font-size: 14px;
      color: #f40;
    }

    .input {
      opacity: 0;
    }
  }

  .wrapper {
    position: relative;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px dashed #f1f1f1;

    &.loading::before {
      content: 'Loading...';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 200px;
      line-height: 44px;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
