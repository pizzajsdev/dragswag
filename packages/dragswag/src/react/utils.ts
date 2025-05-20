import type { DropTargetsMap } from '../core'
import type { DropTargetData } from './types'

export function getDropTargets(dropTargets: DropTargetsMap) {
  const result = [] as Array<DropTargetData>

  dropTargets.forEach((target, element) => {
    result.push({
      data: target.data,
      element,
    })
  })

  return result
}
