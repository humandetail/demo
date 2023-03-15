import { Point, Triangle } from '../types'

// 向量
const vec = (a: Point, b: Point): Point => {
  return {
    x: b.x - a.x,
    y: b.y - a.y
  }
}

// 叉乘函数
const vecProduct = (v1: Point, v2: Point) => v1.x * v2.y - v2.x * v1.y

const sameSymbols = (a: number, b: number) => (a ^ b) >= 0

/**
 * 判断某个点是否在三角形内部
 * 点位于三角形三条边的同一侧
 * @param triangle
 * @param point
 */
export const isPointInTriangle = (triangle: Triangle, point: Point) => {
  const PA = vec(point, triangle[0])
  const PB = vec(point, triangle[1])
  const PC = vec(point, triangle[2])
  const R1 = vecProduct(PA, PB)
  const R2 = vecProduct(PB, PC)
  const R3 = vecProduct(PC, PA)

  return sameSymbols(R1, R2) && sameSymbols(R2, R3)
}
