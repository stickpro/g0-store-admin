import { APP_LAYOUT } from '@/layouts'
import auth from '@/router/middlewares/auth'

export default [
  {
    path: '/collection',
    name: 'collection',
    component: () => import('@/views/collection/CollectionView.vue'),
    meta: {
      layout: APP_LAYOUT.DEFAULT,
      middleware: [auth],
      breadcrumb: "Collection"
    },
  },
  {
    path: '/collection/create',
    name: 'collection-create',
    component: () => import('@/views/collection/CreateCollectionView.vue'),
    meta: {
      layout: APP_LAYOUT.DEFAULT,
      middleware: [auth],
      breadcrumb: "Collection"
    },
  },
  {
    path: '/collection/:id/edit',
    name: 'edit-create',
    component: () => import('@/views/collection/EditCollectionView.vue'),
    meta: {
      layout: APP_LAYOUT.DEFAULT,
      middleware: [auth],
      breadcrumb: "Collection"
    },
  },
]
