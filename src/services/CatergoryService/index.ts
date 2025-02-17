import { api } from '@/api/api.ts'
import type { ICategoriesResponse, ICategoryRequest } from '@/utils/types/api/apiGo.ts'
import type { CategoryResponse, CreateCategoryRequest } from '@/utils/types/api/generatedApiGo'

export default class CategoryService {
  public static async getApiCategories(payload: ICategoryRequest): Promise<ICategoriesResponse> {
    const { data } = await api.get('/category', payload)
    return data
  }

  public static async createCategory(payload: CreateCategoryRequest): Promise<CategoryResponse> {
    const { data } = await api.post('/category', payload)
    return data
  }
}
