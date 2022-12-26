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

export const downloadPlainText = (textContent: string, filename: string) => {
  const blob = new Blob([textContent], {
    type: 'text/plain;charset=utf-8'
  })

  const reader = new FileReader()
  reader.readAsDataURL(blob)

  reader.onload = (e: any) => {
    const a = document.createElement('a')
    a.download = filename
    a.href = e.target.result
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}
