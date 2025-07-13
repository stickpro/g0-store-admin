import { APP_LAYOUT } from '@/layouts'
import auth from '@/router/middlewares/auth'

export default [
  {
    path: '/category',
    name: 'category',
    component: () => import('@/views/category/CategoryView.vue'),
    meta: {
      layout: APP_LAYOUT.DEFAULT,
      middleware: [auth],
      breadcrumb: 'Category',
    },
  },
  {
    path: '/category/create',
    name: 'category-create',
    component: () => import('@/views/category/CreateCategoryView.vue'),
    meta: {
      layout: APP_LAYOUT.DEFAULT,
      middleware: [auth],
      breadcrumb: 'Category',
    },
  },
  {
    path: '/category/:id/edit',
    name: 'category-edit',
    component: () => import('@/views/category/EditCategoryView.vue'),
    meta: {
      layout: APP_LAYOUT.DEFAULT,
      middleware: [auth],
      breadcrumb: 'Category',
    },
  },
]
