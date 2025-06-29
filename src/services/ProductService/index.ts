import { api } from '@/api/Api'
import type { IProductRequest, IProductResponse } from '@/utils/types/api/apiGo.ts'
import type {
  CreateProductRequest,
  ProductResponse,
  UpdateProductRequest,
} from '@/utils/types/api/generatedApiGo'

export default class ProductService {
  public static async getProducts(payload: IProductRequest): Promise<IProductResponse> {
    const { data }: any = await api.get('/product', payload)
    return data
  }

  public static async getProductById(uuid: string): Promise<ProductResponse> {
    const { data }: any = await api.get(`/product/${uuid}`)
    return data
  }

  public static async createApiProduct(payload: CreateProductRequest): Promise<ProductResponse> {
    const { data }: any = await api.post(`/product`, payload)
    return data
  }

  public static async updateApiProduct(
    uuid: string,
    payload: UpdateProductRequest,
  ): Promise<ProductResponse> {
    const { data }: any = await api.put(`/product/${uuid}`, payload)
    return data
  }
}
