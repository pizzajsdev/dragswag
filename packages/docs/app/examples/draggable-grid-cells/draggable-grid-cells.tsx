import { DragOverlayProvider, useDraggable, useDroppable } from 'dragswag'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import './styles.css'

const DraggableSquare = ({ color, className }: { color: string; className?: string }) => {
  const { draggable, isDragging } = useDraggable({
    kind: 'SQUARE',
    data: { color },
    move: true,
  })

  const opacity = isDragging ? 0.5 : 1

  return draggable(
    <div className={cn('square', className)} style={{ backgroundColor: color, opacity }}>
      {isDragging ? 'Dragging' : 'Drag me'}
    </div>,
  )
}

const DroppableSquare = ({ color, className }: { color: string; className?: string }) => {
  const [droppedColor, setDroppedColor] = useState(null)

  const { droppable, hovered } = useDroppable({
    accepts: 'SQUARE',
    onDrop({ data }) {
      setDroppedColor(data.color)
    },
  })

  const borderColor = hovered
    ? `dashed ${hovered.data.color}`
    : droppedColor
      ? `solid ${droppedColor}`
      : 'solid transparent'
  const border = `3px ${borderColor}`

  return droppable(
    <div className={cn('square', className)} style={{ backgroundColor: color, border }}>
      {droppedColor ? `Dropped ${droppedColor}` : 'Drop here'}
    </div>,
  )
}

export default function SimpleSquares() {
  return (
    <div className="flex flex-col gap-4 relative">
      <DragOverlayProvider>
        <div className="grid gap-4 justify-start [grid-template-columns:100px_100px]">
          <div>
            <DraggableSquare color="red" />
          </div>
          <div>
            <DraggableSquare color="green" />
          </div>
          <div>
            <DraggableSquare color="blue" />
          </div>
          <div>
            <DroppableSquare color="gray" />
          </div>
        </div>
      </DragOverlayProvider>
    </div>
  )
}
