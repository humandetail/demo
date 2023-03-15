import { Ref, computed } from 'vue'
import { Rect } from '../types'

export default (
  rect1: Ref<Rect>,
  rect2: Ref<Rect>
) => {
  const x1 = computed(() => rect1.value.translate.x + rect1.value.point.x)
  const y1 = computed(() => rect1.value.translate.y + rect1.value.point.y)

  const x2 = computed(() => rect2.value.translate.x + rect2.value.point.x)
  const y2 = computed(() => rect2.value.translate.y + rect2.value.point.y)

  const cubicBezierCruve = computed(() => {
    const cpx1 = x1.value + (x2.value - x1.value) / 2
    const cpy1 = y1.value

    const cpx2 = cpx1
    const cpy2 = y2.value

    return `
      M ${x1.value} ${y1.value}
      C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${x2.value} ${y2.value}
    `
  })

  return {
    path: cubicBezierCruve
  }
}
