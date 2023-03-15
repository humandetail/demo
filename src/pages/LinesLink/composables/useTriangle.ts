
import { Ref, computed } from 'vue'
import { Point, Rect, RectVertexes, Size, Triangle, Triangles } from '../types'

function getCentralPoint (
  pos: Rect['allowPoints'][number],
  vertexes: RectVertexes
): Point {
  const [tl, tr, bl, br] = vertexes

  let x = 0
  let y = 0
  switch (pos) {
    case 'top':
      x = tl.x + (tr.x - tl.x) / 2
      y = tr.y
      break
    case 'right':
      x = tr.x
      y = tr.y + (br.y - tr.y) / 2
      break
    case 'bottom':
      x = bl.x + (br.x - bl.x) / 2
      y = br.y
      break
    case 'left':
      x = tl.x
      y = tl.y + (bl.y - tl.y) / 2
      break
    default:
      break
  }

  return {
    x,
    y
  }
}

function getTriangle (
  pos: Rect['allowPoints'][number],
  vertexes: RectVertexes,
  cp: Point,
  wrapperSize: Size
): Triangle {
  const sideCentralPoint = getCentralPoint(pos, vertexes)

  // 计算底边长度
  if (['top', 'bottom'].includes(pos)) {
    const rate = pos === 'top'
      ? Math.abs(cp.y - sideCentralPoint.y) / cp.y
      : Math.abs(cp.y - sideCentralPoint.y) / (wrapperSize.height - cp.y)

    const lSideLength = Math.abs(cp.x - vertexes[0].x) / rate
    const rSideLength = Math.abs(cp.x - vertexes[1].x) / rate

    // 左侧点 x y
    const lx = cp.x - lSideLength
    const ly = pos === 'top' ? 0 : wrapperSize.height
    // 右侧点 x y
    const rx = rSideLength + cp.x
    const ry = ly

    return [
      { x: lx, y: ly },
      { x: rx, y: ry },
      { ...cp }
    ]
  } else {
    const rate = pos === 'right'
      ? Math.abs(cp.x - sideCentralPoint.x) / (wrapperSize.width - cp.x)
      : Math.abs(cp.x - sideCentralPoint.x) / cp.x

    const tSideLength = Math.abs(cp.y - vertexes[0].y) / rate
    const bSideLength = Math.abs(cp.y - vertexes[2].y) / rate

    // 上侧点 x y
    const tx = pos === 'left' ? 0 : wrapperSize.width
    const ty = cp.y - tSideLength
    // 下侧点 x y
    const bx = tx
    const by = bSideLength + cp.y
    return [
      { x: tx, y: ty },
      { x: bx, y: by },
      { ...cp }
    ]
  }
}

export default (
  rect: Ref<Rect>,
  wrapperSize: Size
) => {
  // 获取四个三角形
  const triangles = computed(() => {
    const {
      translate: {
        x,
        y
      },
      width,
      height,
      allowPoints
    } = rect.value

    // 矩形四个顶点
    // top-left top-right
    // bottom-left bottom-right
    const vertexes: RectVertexes = [
      { x, y },
      { x: x + width, y },
      { x, y: y + height },
      { x: x + width, y: y + height }
    ]
    // 矩形中点
    const cp: Point = {
      x: x + width / 2,
      y: y + height / 2
    }

    const triangles: Triangles = {
      top: null,
      right: null,
      bottom: null,
      left: null
    }

    allowPoints.forEach(pos => {
      triangles[pos] = getTriangle(
        pos,
        vertexes,
        cp,
        wrapperSize
      )
    })

    return triangles
  })

  return {
    triangles
  }
}
