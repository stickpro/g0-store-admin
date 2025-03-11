import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CategoryResponse, CreateCategoryRequest, UpdateCategoryRequest } from '@/utils/types/api/generatedApiGo'
import CategoryService from '@/services/CatergoryService'
import type { ICategoriesResponse, ICategoryRequest } from '@/utils/types/api/apiGo.ts'
import { useToast } from '@/components/ui/toast/use-toast'

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
  const currentCategory = ref<CategoryResponse | null>(null);
  const { toast } = useToast()

  const getCategories = async (payload: ICategoryRequest) => {
    try {
      isLoading.value = false
      categories.value = await CategoryService.getApiCategories(payload)
    } catch (error: any) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const getCategoryById = async (uuid: string) => {
    try {
      isLoading.value = true
      currentCategory.value = await CategoryService.getApiCategoryById(uuid)
    } catch (error: any) {
      throw error
    } finally {
      isLoading.value = false
    }
  }


  const createCategory = async (request: CreateCategoryRequest) => {
    try {
      isLoading.value = true
      await CategoryService.createApiCategory(request)
      toast({
        title: '✅ Success create',
      })
    } catch (error: any) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const updateCategory = async () => {
    try {
      isLoading.value = true
      await CategoryService.updateApiCategoryById(currentCategory.value.id, currentCategory.value)
      toast({
        title: '✅ Success update',
        variant: 'success',

      })
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
    getCategoryById,
    createCategory,
    updateCategory,
    currentCategory
  }
})
