<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { CornerUpLeft, PlusCircle } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { useCategoryStore } from '@/stores/category'
import CategoryForm from '@/components/category/CategoryForm.vue'
import MetaInformationForm from '@/components/category/CategoryMetaForm.vue'

const { getCategoryById, updateCategory } = useCategoryStore()
const { currentCategory } = storeToRefs(useCategoryStore())

const route = useRoute()
const uuid = route.params.id
onMounted(async () => {
  await getCategoryById(uuid)
})
</script>

<template>
  <main class="grid gap-3 items-start mb-6 p-4 sm:px-6 sm:py-0 md:gap-8">
    <div class="flex items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          class="h-7 gap-1"
          @click="router.push({ name: 'category' })"
        >
          <CornerUpLeft class="h-3.5 w-3.5" />
        </Button>
        <span class="text-2xl font-semibold sr-only sm:not-sr-only sm:whitespace-nowrap">
          Edit category
        </span>
      </div>
      <Button size="sm" class="h-7 gap-1" @click="updateCategory">
        <PlusCircle class="h-3.5 w-3.5" />
        <span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Save </span>
      </Button>
    </div>
    <Card class="w-2/3">
      <CardHeader>
        <CardTitle>Category Info</CardTitle>
      </CardHeader>
      <CardContent>
        <CategoryForm v-if="currentCategory" v-model="currentCategory" />
      </CardContent>
    </Card>
    <Card class="w-2/3">
      <CardHeader>
        <CardTitle>Meta information</CardTitle>
      </CardHeader>
      <CardContent>
        <MetaInformationForm v-model="currentCategory" v-if="currentCategory" />
      </CardContent>
    </Card>
  </main>
</template>
