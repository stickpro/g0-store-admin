import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CreateCategoryRequest } from '@/utils/types/api/generatedApiGo'
import CategoryService from '@/services/CatergoryService'
import type { ICategoriesResponse } from '@/utils/types/api/apiGo.ts'

const defaultDataCategories: ICategoriesResponse = {
  items: [],
  pagination: {
    page: 1,
    page_size: 10,
    total: 100,
  }
}

export const useCategoryStore = defineStore('category', () => {
  const isLoading = ref<boolean>(true)
  const categories = ref<ICategoriesResponse>(defaultDataCategories)

  const getCategories = async (payload: ICate) => {
    try {
      isLoading.value = false
      categories.value = await CategoryService.getApiCategories(payload)
    } catch (error: any) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const createCategory = async (request: CreateCategoryRequest) => {
    try {
      isLoading.value = true
      await CategoryService.createCategory(request)
    } catch (error: any) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    categories,
    getCategories,
    createCategory,
  }
})
