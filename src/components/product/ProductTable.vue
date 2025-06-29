<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table'

import { h } from 'vue'

import DataTable from '@/components/data-table/DataTable.vue'
import DataTableColumnHeader from '@/components/data-table/DataTableColumnHeader.vue'
import DataTableRowActions from '@/components/data-table/DataTableRowActions.vue'
import { Checkbox } from '@/components/ui/checkbox'
import type { IProductResponse } from '@/utils/types/api/apiGo'

defineProps<{
  params: {
    page: number
    pageSize: number
  }
  products: IProductResponse
  isLoading: boolean
}>()

const columns: ColumnDef<any>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        checked:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate'),
        'onUpdate:checked': (value) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all',
        class: 'translate-y-0.5',
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        'onUpdate:checked': (value) => row.toggleSelected(!!value),
        ariaLabel: 'Select row',
        class: 'translate-y-0.5',
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Name' }),
    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('name')),
  },
  {
    accessorKey: 'slug',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Slug' }),

    cell: ({ row }) => h('div', { class: 'w-20' }, row.getValue('slug')),
  },
  {
    id: 'actions',
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: 'Actions', class: 'text-right' }),
    cell: ({ row }) =>
      h(DataTableRowActions, { row, class: 'justify-end', editUrlName: 'edit-create' }),
  },
]
</script>
<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<template>
  <DataTable
    v-model:page="params.page"
    v-model:page-size="params.pageSize"
    :columns="columns"
    :is-loading="isLoading"
    :data="products.items ?? []"
    :total-items="products.pagination.total ?? 0"
  />
</template>
