export interface GlobalState {
  row: number
  column: number
  gap: number
  size: number
  scale: number
  fill: string
  stroke: string
  background: string
  gridVisible: boolean
}

export interface ItemState {
  rx: number | string
  ry: number | string
  fill: string
  stroke: string
}

export interface PxItem extends ItemState {
  x: number
  y: number
}
