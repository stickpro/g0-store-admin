<script setup lang="ts" generic="TData">
import type { Column } from '@tanstack/vue-table'
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
  column: Column<TData, unknown>
  title: string
}

const props = defineProps<Props>()

function getSortIcon(isSorted: false | 'asc' | 'desc') {
  if (isSorted === 'asc') {
    return ArrowUpIcon
  } else if (isSorted === 'desc') {
    return ArrowDownIcon
  } else {
    return ArrowUpDownIcon
  }
}

function handleSort() {
  props.column.toggleSorting(props.column.getIsSorted() === 'asc')
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div v-if="column.getCanSort()" :class="cn('flex items-center space-x-2', $attrs.class ?? '')">
    <Button class="h-8 -ml-3" size="sm" variant="ghost" @click="handleSort">
      {{ props.title }}
      <component :is="getSortIcon(column.getIsSorted())" class="w-4 h-4" />
    </Button>
  </div>

  <div v-else :class="cn('flex items-center text-xs', $attrs.class ?? '')">
    {{ title }}
  </div>
</template>
