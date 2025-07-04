import { defineStore } from 'pinia'

import { ref } from 'vue'

import { useToast } from '@/components/ui/toast'
import ProductService from '@/services/ProductService'
import type { IProductRequest, IProductResponse } from '@/utils/types/api/apiGo.ts'
import type {
  CreateProductRequest,
  ProductResponse,
  UpdateProductRequest,
} from '@/utils/types/api/generatedApiGo'

const defaultDataProducts: IProductResponse = {
  items: [],
  pagination: {
    page: 1,
    page_size: 10,
    total: 100,
    last_page: 1,
  },
}

export const useProductStore = defineStore('product', () => {
  const isLoading = ref<boolean>(true)
  const products = ref<IProductResponse>(defaultDataProducts)
  const currentProduct = ref<ProductResponse | null>(null)
  const { toast } = useToast()

  const getProducts = async (payload: IProductRequest): Promise<void> => {
    try {
      isLoading.value = true
      products.value = await ProductService.getProducts(payload)
    } catch (error: any) {
      toast({
        title: 'Error fetching products.',
        description: error.message || 'An error occurred while fetching products.',
        variant: 'destructive',
      })
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const getProductById = async (uuid: string): Promise<void> => {
    try {
      isLoading.value = true
      currentProduct.value = await ProductService.getProductById(uuid)
    } catch (error: any) {
      toast({
        title: 'Error fetching products.',
        description: error.message || 'An error occurred while fetching products.',
        variant: 'destructive',
      })
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const createProduct = async (request: CreateProductRequest): Promise<void> => {
    try {
      isLoading.value = true
      await ProductService.createApiProduct(request)
      toast({
        title: '✅ Success create',
        variant: 'success',
      })
    } catch (error: any) {
      toast({
        title: 'Error creating product',
        description: error.message || 'An error occurred while creating product.',
        variant: 'destructive',
      })
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const updateProduct = async (uuid: string, request: UpdateProductRequest): Promise<void> => {
    if (!currentProduct.value) {
      throw new Error('No current product')
    }

    try {
      isLoading.value = true
      await ProductService.updateApiProduct(uuid, request)
      toast({
        title: '✅ Success update',
        variant: 'success',
      })
    } catch (error: any) {
      toast({
        title: 'Error updating product',
        description: error.message || 'An error occurred while updating product.',
        variant: 'destructive',
      })
      throw error
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    products,
    currentProduct,
    createProduct,
    updateProduct,
    getProducts,
    getProductById,
  }
})
