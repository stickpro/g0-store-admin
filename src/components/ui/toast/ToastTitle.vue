<script setup lang="ts">
import { ToastTitle, type ToastTitleProps } from 'reka-ui'

import { type HTMLAttributes, computed } from 'vue'

import { cn } from '@/lib/utils'

const props = defineProps<ToastTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastTitle
    v-bind="delegatedProps"
    :class="cn('text-sm font-semibold [&+div]:text-xs', props.class)"
  >
    <slot />
  </ToastTitle>
</template>
