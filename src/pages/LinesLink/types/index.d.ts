export interface Point {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface Rect extends Size {
  name: string
  translate: Point
  allowPoints: Array<'top' | 'right' | 'bottom' | 'left'>,
  point: Point
}

export type RectVertexes = [Point, Point, Point, Point]

export type Triangle = [Point, Point, Point]

export interface Triangles {
  top: Triangle | null
  right: Triangle | null
  bottom: Triangle | null
  left: Triangle | null
}
