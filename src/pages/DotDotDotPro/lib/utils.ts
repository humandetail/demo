import { GlobalState, PxItem } from '../types'

export const createPxItems = ({
  row,
  column
}: Pick<GlobalState, 'row' | 'column'>): PxItem[] => {
  const pxItems: PxItem[] = []

  for (let y = 0; y < row; y++) {
    for (let x = 0; x < column; x++) {
      pxItems.push({
        x,
        y,
        fill: 'transparent',
        stroke: 'transparent',
        rx: 0,
        ry: 0
      })
    }
  }

  return pxItems
}
