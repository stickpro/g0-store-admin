import { api } from '@/api/api.ts'
import type { MediumResponse } from '@/utils/types/api/generatedApiGo'

export default class MediaService {
  public static async uploadFile(file: File): Promise<MediumResponse> {
    const formData = new FormData()
    formData.append('file', file)

    const { data } = await api.uploadFile('/media/upload', formData)
    return data
  }
}
