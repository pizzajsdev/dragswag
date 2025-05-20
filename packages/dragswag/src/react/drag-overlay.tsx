import type { ReactElement } from 'react'
import { createContext, useContext, useRef, useState } from 'react'

type DragOverlayContextType = {
  dragElement: ReactElement | null
  setDragElement: (element: ReactElement | null) => void
  setDragElementPosition: (position: { top: number; left: number }) => void
}

interface DragOverlayProviderProps {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
  [key: string]: any
}

function DragOverlay({ ref, style, children: dragElement, ...props }: React.ComponentPropsWithRef<'div'>) {
  const dragOverlayStyle = {
    position: 'fixed' as const,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: dragElement ? 'block' : 'none',
    ...style,
  }

  const dragWrapperStyle = {
    position: 'relative' as const,
    transform: `translateX(0px) translateY(0px)`,
    willChange: 'transform',
  }

  return (
    <div style={dragOverlayStyle} data-slot="drag-overlay-wrapper" {...props}>
      <div ref={ref} style={dragWrapperStyle} data-slot="drag-overlay-element">
        {dragElement}
      </div>
    </div>
  )
}

const DragOverlayContext = createContext<DragOverlayContextType | null>(null)

export function DragOverlayProvider({ children, ...rest }: DragOverlayProviderProps) {
  const [dragElement, setDragElement] = useState<ReactElement | null>(null)
  // const [dragElement2, setDragElement2] = [null, () => {}]
  const dragWrapperRef = useRef<HTMLDivElement>(null)

  const setDragElementPosition = (position: { top: number; left: number }) => {
    const { current } = dragWrapperRef
    if (!current) return
    current.style.transform = `translateX(${position.left}px) translateY(${position.top}px)`
  }

  return (
    <DragOverlayContext value={{ dragElement, setDragElement, setDragElementPosition }}>
      {children}
      <DragOverlay ref={dragWrapperRef} {...rest}>
        {dragElement}
      </DragOverlay>
    </DragOverlayContext>
  )
}

export function useDragOverlayElement() {
  const context = useContext(DragOverlayContext)
  if (!context) {
    throw new Error('useDragOverlayElement must be used within a DragOverlayProvider')
  }
  return context
}
