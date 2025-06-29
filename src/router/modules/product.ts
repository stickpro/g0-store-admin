import { APP_LAYOUT } from '@/layouts'
import auth from '@/router/middlewares/auth'

export default [
  {
    path: '/product',
    name: 'product',
    component: () => import('@/views/product/ProductView.vue'),
    meta: {
      layout: APP_LAYOUT.DEFAULT,
      middleware: [auth],
      breadcrumb: 'Product',
    },
  },
  {
    path: '/product/create',
    name: 'product-create',
    component: () => import('@/views/product/CreateProductView.vue'),
    meta: {
      layout: APP_LAYOUT.DEFAULT,
      middleware: [auth],
      breadcrumb: 'Product',
    },
  },
  {
    path: '/product/:id/edit',
    name: 'product-edit',
    component: () => import('@/views/product/EditProductView.vue'),
    meta: {
      layout: APP_LAYOUT.DEFAULT,
      middleware: [auth],
      breadcrumb: 'Product',
    },
  },
]
