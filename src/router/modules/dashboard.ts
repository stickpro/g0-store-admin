import { APP_LAYOUT } from '@/layouts'
import auth from '@/router/middlewares/auth'

export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/DashboardView.vue'),
    meta: {
      layout: APP_LAYOUT.DEFAULT,
      middleware: [auth],
      breadcrumb: 'Dashboard',
    },
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/HomeView.vue'),
    meta: { layout: APP_LAYOUT.DEFAULT, middleware: [auth] },
  },
]
