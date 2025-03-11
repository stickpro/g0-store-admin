<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/category'
import CategoryForm from '@/components/category/CategoryForm.vue'
import MetaInformationForm from '@/components/category/CategoryMetaForm.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CornerUpLeft, PlusCircle } from 'lucide-vue-next'
import type { CreateCategoryRequest } from '@/utils/types/api/generatedApiGo'

const router = useRouter()
const { createCategory } = useCategoryStore()

// Общий объект для хранения данных категории и мета-информации
const categoryInfo = ref<CreateCategoryRequest>({
  name: '',
  slug: '',
  description: '',
  parent_id: null as string | null,
  meta_title: '',
  meta_h1: '',
  meta_keyword: '',
  meta_description: '',
  is_enabled: true,
})

// Сохранение данных
const saveAll = async () => {
  try {
    await createCategory(categoryInfo.value)
    await router.push({ name: 'category' })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <main class="grid gap-3 items-start mb-6 p-4 sm:px-6 sm:py-0 md:gap-8">
    <div class="flex items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" class="h-7 gap-1" @click="router.push({ name: 'category' })">
          <CornerUpLeft class="h-3.5 w-3.5" />
        </Button>
        <span class="text-2xl font-semibold sr-only sm:not-sr-only sm:whitespace-nowrap">
          New category
        </span>
      </div>
      <Button size="sm" class="h-7 gap-1" @click="saveAll">
        <PlusCircle class="h-3.5 w-3.5" />
        <span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Save </span>
      </Button>
    </div>
    <Card class="w-2/3">
      <CardHeader>
        <CardTitle>Category info</CardTitle>
      </CardHeader>
      <CardContent>
        <CategoryForm
          v-model="categoryInfo"
        />
      </CardContent>
    </Card>
    <Card class="w-2/3">
      <CardHeader>
        <CardTitle>Meta information</CardTitle>
      </CardHeader>
      <CardContent>
        <MetaInformationForm v-model="categoryInfo" />
      </CardContent>
    </Card>
  </main>
</template>
