<script setup lang="ts">
import { ref, watch } from 'vue'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const props = defineProps<{
  modelValue: any
}>()

const emit = defineEmits(['update:modelValue'])

const productSku = ref<string>(props.modelValue.sku || '')
const productUpc = ref<string>(props.modelValue.upc || '')
const productEan = ref<string>(props.modelValue.ean || '')
const productJan = ref<string>(props.modelValue.jan || '')
const productIsbn = ref<string>(props.modelValue.isbn || '')
const productMpn = ref<string>(props.modelValue.mpn || '')

watch([productSku, productUpc, productEan, productJan, productIsbn, productMpn], () => {
  emit('update:modelValue', {
    ...props.modelValue,
    sku: productSku.value,
    ean: productEan.value,
    jan: productJan.value,
    isbn: productIsbn.value,
    mpn: productMpn.value,
  })
})
</script>

<template>
  <form>
    <div class="grid items-center w-full gap-4">
      <div class="flex flex-col space-y-1.5">
        <Label for="sku">Sku</Label>
        <Input id="sku" v-model="productSku" placeholder="Sku of your product" />
      </div>
      <div class="flex flex-col space-y-1.5">
        <Label for="ean">Ean</Label>
        <Input id="ean" v-model="productEan" placeholder="Ean of your product" />
      </div>
      <div class="flex flex-col space-y-1.5">
        <Label for="jan">Jan</Label>
        <Input id="jan" v-model="productJan" placeholder="Jan of your product" />
      </div>
      <div class="flex flex-col space-y-1.5">
        <Label for="isbn">Isbn</Label>
        <Input id="isbn" v-model="productJan" placeholder="Isbn of your product" />
      </div>
      <div class="flex flex-col space-y-1.5">
        <Label for="mpn">Mpn</Label>
        <Input id="mpn" v-model="productJan" placeholder="Mpn of your product" />
      </div>
    </div>
  </form>
</template>
