import type { ReactElement } from 'react'
import { createContext, useContext, useRef, useState } from 'react'

type DragOverlayContextType = {
  dragElement: ReactElement | null
  setDragElement: (element: ReactElement | null) => void
  setDragElementPosition: (position: { top: number; left: number }) => void
}

// Create context with safe default values
const defaultContextValue: DragOverlayContextType = {
  dragElement: null,
  setDragElement: () => {},
  setDragElementPosition: () => {},
}

const DragOverlayContext = createContext<DragOverlayContextType>(defaultContextValue)

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
    pointerEvents: 'none' as const,
    zIndex: 9999,
    display: dragElement ? 'block' : 'none',
    ...style,
  }

  const dragWrapperStyle = {
    position: 'absolute' as const,
    transform: `translateX(0px) translateY(0px)`,
    willChange: 'transform',
    pointerEvents: 'none' as const,
  }

  return (
    <div style={dragOverlayStyle} data-slot="drag-overlay-wrapper" {...props}>
      <div ref={ref} style={dragWrapperStyle} data-slot="drag-overlay-element">
        {dragElement}
      </div>
    </div>
  )
}

export function DragOverlayProvider({ children, ...rest }: DragOverlayProviderProps) {
  const [dragElement, setDragElement] = useState<ReactElement | null>(null)
  const dragWrapperRef = useRef<HTMLDivElement>(null)

  const setDragElementPosition = (position: { top: number; left: number }) => {
    const { current } = dragWrapperRef
    if (!current) return
    current.style.transform = `translateX(${position.left}px) translateY(${position.top}px)`
  }

  return (
    <DragOverlayContext.Provider value={{ dragElement, setDragElement, setDragElementPosition }}>
      {children}
      <DragOverlay ref={dragWrapperRef} {...rest}>
        {dragElement}
      </DragOverlay>
    </DragOverlayContext.Provider>
  )
}

export function useDragOverlayElement(): DragOverlayContextType {
  const context = useContext(DragOverlayContext)
  if (!context) {
    console.warn('useDragOverlayElement must be used within a DragOverlayProvider')
    return defaultContextValue
  }
  return context
}
