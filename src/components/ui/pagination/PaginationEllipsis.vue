<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import { PaginationEllipsis, type PaginationEllipsisProps } from 'reka-ui'

import { type HTMLAttributes, computed } from 'vue'

import { cn } from '@/lib/utils'

const props = defineProps<PaginationEllipsisProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <PaginationEllipsis
    v-bind="delegatedProps"
    :class="cn('w-9 h-9 flex items-center justify-center', props.class)"
  >
    <slot>
      <MoreHorizontal />
    </slot>
  </PaginationEllipsis>
</template>
