<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { onMounted, ref } from 'vue'
import { CornerUpLeft, PlusCircle } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { useCategoryStore } from '@/stores/category'

const frontendCategoryUrl = '/category/'
const { getCategoryById, currentCategory } = useCategoryStore()

const route = useRoute()
const uuid = route.params.id;
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
          @click="$router.push({ name: 'category' })"
        >
          <CornerUpLeft class="h-3.5 w-3.5" />
        </Button>
        <span class="text-2xl font-semibold sr-only sm:not-sr-only sm:whitespace-nowrap">
          Edit category
        </span>
      </div>
      <Button size="sm" class="h-7 gap-1" @click="storeCategory()">
        <PlusCircle class="h-3.5 w-3.5" />
        <span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Save </span>
      </Button>
    </div>
    <Card class="w-2/3">
      <CardHeader>
        <CardTitle>Create category</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div class="grid items-center w-full gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="name">Name</Label>
              <Input id="name" v-model="currentCategory.name" placeholder="Name of your category" />
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="Slug">Slug</Label>
              <div class="relative w-full items-center">
                <Input
                  id="slug"
                  v-model="currentCategory.slug"
                  type="text"
                  placeholder="slug"
                  class="pl-60"
                />
                <span
                  class="absolute bg-accent rounded-l-md start-0 inset-y-0 flex items-center justify-center px-2"
                >
                  {{ $appFrontend }}{{ frontendCategoryUrl }}
                </span>
              </div>
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="description">Description</Label>
              <Textarea
                id="description"
                v-model="currentCategory.description"
                placeholder="Type your description"
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
    <Card class="w-2/3">
      <CardHeader>
        <CardTitle>Meta information</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div class="grid items-center w-full gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="m-title">Meta title</Label>
              <Input
                id="m-title"
                v-model="currentCategory.meta_title"
                placeholder="Meta title of your category"
              />
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="m-h1">Meta H1</Label>
              <Input id="m-h1" v-model="currentCategory.meta_h1" placeholder="Meta H1 of your category" />
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="m-h1">Meta keyword</Label>
              <Input
                id="m-h1"
                v-model="currentCategory.meta_keywords"
                placeholder="Meta keyword of your category"
              />
            </div>

            <div class="flex flex-col space-y-1.5">
              <Label for="meta-description">Meta Description</Label>
              <Textarea
                id="meta-description"
                v-model="currentCategory.meta_description"
                placeholder="Type meta your description"
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  </main>
</template>
<style scoped></style>
