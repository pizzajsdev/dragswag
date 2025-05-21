import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { type DragSourceType, type DropTargetConfig, createDropTarget } from '../core'
import type { DroppableConfig, Kind } from './types'
import { getDropTargets } from './utils'

type HoveredData = {
  kind: Kind
  data: any
  element: HTMLElement
  dropElement: HTMLElement
}

export function useDroppable(config: DroppableConfig) {
  const [hovered, setHovered] = useState<HoveredData | null>(null)
  const cleanupRef = useRef<(() => void) | null>(null)
  const previousAcceptsRef = useRef(config.accepts)

  let { accepts } = config

  const trueAccepts = Array.isArray(accepts) || typeof accepts === 'function' ? accepts : [accepts]

  // Detect if accepts has changed
  const acceptsChanged = useMemo(() => {
    const hasChanged = previousAcceptsRef.current !== accepts
    previousAcceptsRef.current = accepts
    return hasChanged
  }, [accepts])

  const trueConfig: DropTargetConfig<any> = {
    disabled: config.disabled,
    accepts: trueAccepts as unknown as DragSourceType<any>[],
    data: config.data,
    onDragIn(props) {
      setHovered({
        kind: props.sourceType,
        data: props.sourceData,
        element: props.dragElement,
        dropElement: props.dropElement,
      })

      config.onDragIn?.({
        kind: props.sourceType,
        data: props.sourceData,
        event: props.event,
        element: props.dragElement,
        dropElement: props.dropElement,
        dropTargets: getDropTargets(props.dropTargets),
      })
    },
    onDragOut(props) {
      setHovered(null)

      config.onDragOut?.({
        kind: props.sourceType,
        data: props.sourceData,
        event: props.event,
        element: props.dragElement,
        dropElement: props.dropElement,
        dropTargets: getDropTargets(props.dropTargets),
      })
    },
    onDragMove(props) {
      config.onDragMove?.({
        kind: props.sourceType,
        data: props.sourceData,
        event: props.event,
        element: props.dragElement,
        dropElement: props.dropElement,
        dropTargets: getDropTargets(props.dropTargets),
      })
    },
    onDrop(props) {
      setHovered(null)

      config.onDrop?.({
        kind: props.sourceType,
        data: props.sourceData,
        event: props.event,
        element: props.dragElement,
        dropElement: props.dropElement,
        dropTargets: getDropTargets(props.dropTargets),
      })
    },
  }

  // Create dropTarget only once
  const dropTarget = useMemo(() => createDropTarget(trueConfig), [])

  // Update config when it changes
  useEffect(() => {
    dropTarget.setConfig(trueConfig)
  }, [
    dropTarget,
    config.disabled,
    config.data,
    config.onDragIn,
    config.onDragOut,
    config.onDragMove,
    config.onDrop,
    acceptsChanged, // Use the memoized value that indicates if accepts changed
  ])

  const originalRef = useRef(null as any)

  const dropComponentRef = useCallback(
    (element: HTMLElement | null) => {
      if (element) {
        // Store the cleanup function
        cleanupRef.current = dropTarget.listen(element)
      }

      const ref = originalRef.current

      if (typeof ref === 'function') {
        ref(element)
      } else if (ref && ref.hasOwnProperty('current')) {
        ref.current = element
      }
    },
    [dropTarget],
  )

  const droppable = useCallback(
    (child: React.ReactElement<React.ComponentPropsWithRef<any>> | null) => {
      if (!child) {
        return null
      }

      // @ts-ignore React 16-19+ refs compatibility.
      originalRef.current = child.props?.ref ?? child.ref

      return React.cloneElement(child, { ref: dropComponentRef })
    },
    [dropComponentRef],
  )

  // Clean up all listeners when component unmounts
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }
    }
  }, [])

  return {
    droppable,
    hovered,
  }
}
