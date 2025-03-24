<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { CornerUpLeft, PlusCircle, Trash2 } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { useCategoryStore } from '@/stores/category'
import CategoryForm from '@/components/category/CategoryForm.vue'
import MetaInformationForm from '@/components/category/CategoryMetaForm.vue'
import { FileUpload, FileUploadGrid } from '@/components/ui/file-upload'
import MediaService from '@/services/MediaService'

const { getCategoryById, updateCategory } = useCategoryStore()
const { currentCategory } = storeToRefs(useCategoryStore())
const files = ref([])

const route = useRoute()
const uuid = route.params.id

onMounted(async () => {
  await getCategoryById(uuid)
})

const handleFilesChange = (newFiles) => {
  files.value = newFiles
}
const removeImage = () => {
  currentCategory.value.image_path = null
}

const loadFile = async () => {
  return await MediaService.uploadFile(files.value[0])
}

const updateWithUpload = async () => {
  try {
    const file = await loadFile()
    currentCategory.value.image_path = file.path
    await updateCategory()
    await router.push({ name: 'category' })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="p-4 sm:px-6 md:gap-8">
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
          New category
        </span>
      </div>
      <Button size="sm" class="h-7 gap-1" @click="updateWithUpload">
        <PlusCircle class="h-3.5 w-3.5" />
        <span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Update </span>
      </Button>
    </div>
  </div>
  <main class="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:px-6 sm:py-0 md:gap-8">
    <div class="col-span-2 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Category Info</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryForm v-if="currentCategory" v-model="currentCategory" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Meta information</CardTitle>
        </CardHeader>
        <CardContent>
          <MetaInformationForm v-model="currentCategory" v-if="currentCategory" />
        </CardContent>
      </Card>
    </div>
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Image Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div v-if="currentCategory?.image_path" class="relative w-full flex justify-center">
            <div class="relative">
              <img
                :src="$fileStorageUrl + currentCategory.image_path"
                alt="Category Image"
                class="h-52 w-52 rounded-md object-cover border"
              />
              <Button
                @click="removeImage"
                size="icon"
                class="absolute top-1 right-1 bg-red-500 text-white p-1 shadow-md hover:bg-red-600 transition"
              >
                <Trash2 class="w-4 h-4" />
              </Button>
            </div>
          </div>
          <FileUpload
            v-else
            @onChange="handleFilesChange"
            class="rounded-lg border border-dashed border-neutral-200 dark:border-neutral-800"
          >
            <FileUploadGrid />
          </FileUpload>
        </CardContent>
      </Card>
    </div>
  </main>
</template>
