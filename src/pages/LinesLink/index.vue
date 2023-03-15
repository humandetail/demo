<template>
  <div>
    <svg
      width="1000"
      height="800"
      viewBox="0 0 1000 800"
    >
      <g
        name="outline"
        transform="translate(200, 200)"
      >
        <rect
          v-bind="wrapperSize"
          stroke="#bbb"
          fill="none"
        />

        <g
          name="rect"
          :transform="`translate(${rect.translate.x}, ${rect.translate.y})`"
        >
          <rect
            :width="rect.width"
            :height="rect.height"
            stroke="#ddd"
            fill="#ddd"
          />
        </g>

        <g
          name="other-rect"
          :transform="`translate(${otherRect.translate.x}, ${otherRect.translate.y})`"
          @mousedown="handleMouseDown"
        >
          <rect
            :width="otherRect.width"
            :height="otherRect.height"
            stroke="#ddd"
            fill="#ddd"
          />
        </g>

        <g name="curve-path">
          <path
            :d="path"
            stroke="red"
            fill="none"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Point, Rect, Size } from './types'
import useTriangle from './composables/useTriangle'
import useCurve from './composables/useCurve'
import { isPointInTriangle } from './utils/tools'

const wrapperSize: Size = {
  width: 600,
  height: 400
}

const rect = ref<Rect>({
  name: 'rect',
  translate: {
    x: 50,
    y: 100
  },
  width: 100,
  height: 50,
  allowPoints: ['top', 'right', 'bottom', 'left'],
  point: {
    x: 50,
    y: 50
  }
})

const otherRect = ref<Rect>({
  name: 'rect',
  translate: {
    x: 50,
    y: 300
  },
  width: 100,
  height: 50,
  allowPoints: ['top', 'right', 'bottom', 'left'],
  point: {
    x: 50,
    y: 0
  }
})

const {
  triangles
} = useTriangle(rect, wrapperSize)

const {
  triangles: otherRectTriangles
} = useTriangle(otherRect, wrapperSize)

const {
  path
} = useCurve(rect, otherRect)

// const effectiveTriangles = computed<Triangle[]>(() => {
//   return Object.values(triangles.value).filter(Boolean)
// })

// const otherRectEffectiveTriangles = computed<Triangle[]>(() => {
//   return Object.values(otherRectTriangles.value).filter(Boolean)
// })

watch(() => otherRect.value.translate, () => {
  const p = {
    x: otherRect.value.translate.x + otherRect.value.point.x,
    y: otherRect.value.translate.y + otherRect.value.point.y
  }
  if (triangles.value.top && isPointInTriangle(triangles.value.top, p)) {
    rect.value.point = {
      x: rect.value.width / 2,
      y: 0
    }
  } else if (triangles.value.right && isPointInTriangle(triangles.value.right, p)) {
    rect.value.point = {
      x: rect.value.width,
      y: rect.value.height / 2
    }
  } else if (triangles.value.bottom && isPointInTriangle(triangles.value.bottom, p)) {
    rect.value.point = {
      x: rect.value.width / 2,
      y: rect.value.height
    }
  } else if (triangles.value.left && isPointInTriangle(triangles.value.left, p)) {
    rect.value.point = {
      x: 0,
      y: rect.value.height / 2
    }
  }
}, {
  immediate: true,
  deep: true
})

watch(() => rect.value.point, () => {
  const p = {
    x: rect.value.translate.x + rect.value.point.x,
    y: rect.value.translate.y + rect.value.point.y
  }
  if (otherRectTriangles.value.top && isPointInTriangle(otherRectTriangles.value.top, p)) {
    otherRect.value.point = {
      x: otherRect.value.width / 2,
      y: 0
    }
  } else if (otherRectTriangles.value.right && isPointInTriangle(otherRectTriangles.value.right, p)) {
    otherRect.value.point = {
      x: otherRect.value.width,
      y: otherRect.value.height / 2
    }
  } else if (otherRectTriangles.value.bottom && isPointInTriangle(otherRectTriangles.value.bottom, p)) {
    otherRect.value.point = {
      x: otherRect.value.width / 2,
      y: otherRect.value.height
    }
  } else if (otherRectTriangles.value.left && isPointInTriangle(otherRectTriangles.value.left, p)) {
    otherRect.value.point = {
      x: 0,
      y: otherRect.value.height / 2
    }
  }
})

const coordinate = ref<Point>({ x: 0, y: 0 })
const handleMouseDown = (e: MouseEvent) => {
  e.preventDefault()

  coordinate.value.x = e.clientX
  coordinate.value.y = e.clientY

  document.addEventListener('mousemove', handleMouseMove, false)
  document.addEventListener('mouseup', handleMouseUp, false)
}

const handleMouseMove = (e: MouseEvent) => {
  const { clientX, clientY } = e

  otherRect.value.translate.x += (clientX - coordinate.value.x)
  otherRect.value.translate.y += (clientY - coordinate.value.y)

  coordinate.value.x = clientX
  coordinate.value.y = clientY
}

const handleMouseUp = (e: MouseEvent) => {
  e.preventDefault()

  document.removeEventListener('mousemove', handleMouseMove, false)
  document.removeEventListener('mousedown', handleMouseUp, false)

  coordinate.value = { x: 0, y: 0 }
}
</script>
