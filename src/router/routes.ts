import type { RouteRecordRaw } from 'vue-router'

import auth from '@/router/modules/auth'
import category from '@/router/modules/category.ts'
import collection from '@/router/modules/collection.ts'
import dashboard from '@/router/modules/dashboard'

import product from './modules/product'

export const routes: Array<RouteRecordRaw> = [
  ...auth,
  ...dashboard,
  ...category,
  ...collection,
  ...product,
]
