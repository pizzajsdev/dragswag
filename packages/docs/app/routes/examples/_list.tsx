import { lazy, type LazyExoticComponent } from 'react'

export const examples: Record<
  string,
  { title: string; description: string; component: LazyExoticComponent<() => React.ReactElement> }
> = {
  'draggable-list': {
    title: 'Simple Draggable List',
    description: 'A simple example of a draggable list',
    component: lazy(() => import('@/examples/draggable-list/draggable-list')),
  },
  'draggable-grid-cells': {
    title: 'Draggable Grid Cells',
    description: 'A simple example of draggable grid cells',
    component: lazy(() => import('@/examples/draggable-grid-cells/draggable-grid-cells')),
  },
  'kanban-board': {
    title: 'Kanban Board',
    description: 'A drag and drop Kanban Board example',
    component: lazy(() => import('@/examples/kanban-board/dashboard')),
  },
}
