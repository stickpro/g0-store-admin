import type {RouteRecordRaw} from 'vue-router'
import auth from '@/router/modules/auth'
import dashboard from '@/router/modules/dashboard'
import category from '@/router/modules/category.ts'
import collection from '@/router/modules/collection.ts'


export const routes: Array<RouteRecordRaw> = [
  ...auth,
  ...dashboard,
  ...category,
  ...collection
]
