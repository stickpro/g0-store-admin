<script setup lang="ts">
import { computed } from 'vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useRoute } from 'vue-router'

const route = useRoute();

const layouts: Record<LayoutNames, Component> = {
  "auth-layout": AuthLayout,
  "default-layout": DefaultLayout,
};
const resolveLayout = computed(() => {
  return layouts[route.meta.layout as keyof typeof layouts];
});
</script>

<template>
  <component :is="resolveLayout">
    <RouterView />
  </component>
</template>

