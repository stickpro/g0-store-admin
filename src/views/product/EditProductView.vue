<script setup lang="ts">
import { CornerUpLeft, PlusCircle, Trash2 } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'

import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ProductForm from '@/components/product/ProductForm.vue'
import ProductIdentifierForm from '@/components/product/ProductIdentifierForm.vue'
import ProductMetaForm from '@/components/product/ProductMetaForm.vue'
import ProductPhysicalAttribute from '@/components/product/ProductPhysicalAttribute.vue'
import ProductStockForm from '@/components/product/ProductStockForm.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileUpload, FileUploadGrid, FileUploaded } from '@/components/ui/file-upload'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import { useToast } from '@/components/ui/toast/use-toast'
import { useProductStore } from '@/stores/product'

const router = useRouter()
const route = useRoute()
const { toast } = useToast()

const productStore = useProductStore()
const { getProductsWithMedium } = productStore
const { currentProduct, currentProductMedium } = storeToRefs(productStore)

const uuid = typeof route.params.id === 'string' ? route.params.id : ''

onMounted(async () => {
  if (uuid) {
    try {
      await getProductsWithMedium(uuid)
    } catch (error: any) {
      toast({
        title: 'Ошибка загрузки Товара',
        description: error.message || 'Не удалось загрузить данные товара',
        variant: 'destructive',
      })
    }
  } else {
    toast({
      title: 'Ошибка',
      description: 'Идентификатор товара не указан',
      variant: 'destructive',
    })
    router.push({ name: 'product' })
  }
})
</script>
<template>
  <div class="p-4 sm:px-6 md:gap-8">
    <div class="flex items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          class="h-7 gap-1"
          @click="router.push({ name: 'product' })"
        >
          <CornerUpLeft class="h-3.5 w-3.5" />
        </Button>
        <span class="text-2xl font-semibold sr-only sm:not-sr-only sm:whitespace-nowrap">
          Редактирование Товара
        </span>
      </div>
      <Button size="sm" class="h-7 gap-1">
        <PlusCircle class="h-3.5 w-3.5" />
        <span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Обновить </span>
      </Button>
    </div>
  </div>
  <main class="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:px-6 sm:py-0 md:gap-8">
    <div class="col-span-2 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product info</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm v-if="currentProduct" v-model="currentProduct" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Meta information</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductMetaForm v-if="currentProduct" v-model="currentProduct" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Identifier</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductIdentifierForm v-if="currentProduct" v-model="currentProduct" />
        </CardContent>
      </Card>
    </div>
    <div class="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Addition Info</CardTitle>
        </CardHeader>
        <CardContent>
          <NumberField v-if="currentProduct" v-model="currentProduct.sort_order">
            <Label>Sort order</Label>
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
        </CardContent>
      </Card>
      <div class="flex flex-row items-center justify-between rounded-lg border p-4">
        <div class="space-y-0.5">
          <div
            class="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base"
          >
            Product status
          </div>
          <p class="text-sm text-muted-foreground">Product status show product on catalog</p>
        </div>
        <div>
          <Switch v-if="currentProduct" v-model="currentProduct.is_enable" />
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Image Category</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUploaded v-model="currentProductMedium" />
          <FileUpload
            class="rounded-lg border border-dashed border-neutral-200 dark:border-neutral-800"
          >
          </FileUpload>
        </CardContent>
      </Card>
    </div>
  </main>
</template>
<style scoped></style>
