import type { CategoryResponse } from '@/utils/types/api/generatedApiGo'


export interface ICategoryRequest {
  page: number
  page_size: number
}


export interface ICategoryPagination {
  last_page: number;
  page: number;
  page_size: number;
  total: number;
}
export interface ICategoriesResponse {
  items: CategoryResponse[];
  pagination: ICategoryPagination;
}
