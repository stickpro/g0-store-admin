<script setup lang="ts">
import { ref, watch } from 'vue'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'

enum StockStatus {
  InStock = 'IN_STOCK',
  PreOrder = 'PRE_ORDER',
  OutOfStock = 'OUT_OF_STOCK',
}
const props = defineProps<{
  modelValue: any
}>()

const emit = defineEmits(['update:modelValue'])

const productQuantity = ref<number>(props.modelValue.quantity || 0)
const productStockStatus = ref<StockStatus>(props.modelValue.stock_status ?? StockStatus.InStock)
const productLocation = ref<string>(props.modelValue.location || '')
const productSubtract = ref<boolean>(props.modelValue.subtract || false)
const productMinimum = ref<number>(props.modelValue.minimum || 1)

watch(
  [productQuantity, productStockStatus, productLocation, productSubtract, productMinimum],
  () => {
    emit('update:modelValue', {
      ...props.modelValue,
      quantity: productQuantity.value,
      stock_status: productStockStatus.value,
      location: productLocation.value,
      subtract: productSubtract.value,
      minimum: productMinimum.value,
    })
  },
)
</script>

<template>
  <form>
    <div class="grid items-center w-full gap-4">
      <div class="flex flex-col space-y-1.5">
        <NumberField>
          <Label>Quantity</Label>
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput v-model="productQuantity" />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
      </div>
      <div class="flex flex-col space-y-1.5">
        <Label for="location">Location</Label>
        <Input id="location" v-model="productLocation" placeholder="location of your product" />
      </div>
    </div>
  </form>
</template>
