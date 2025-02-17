<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useVueTable,
} from '@tanstack/vue-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { utils } from '@/utils/utils'
import { computed, ref } from 'vue'
import DataTablePagination from './DataTablePagination.vue'

interface DataTableProps {
  columns: ColumnDef<Task, any>[]
  data: []
  page: number
  pageSize: number
  total: number
}

const props = defineProps<DataTableProps>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const getPageCount = () => Math.ceil(props.total / props.pageSize)

const emit = defineEmits(['update:page', 'update:pageSize'])

const handlePageChange = (newPage: number) => {
  emit('update:page', newPage)
}

const handlePageSize = (newPageSize: number) => {
  emit('update:pageSize', newPageSize)
}

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    },
    get pagination() {
      return { pageIndex: props.page, pageSize: props.pageSize }
    },
  },
  enableRowSelection: true,
  manualPagination: true,
  pageCount: getPageCount(),
  getCoreRowModel: getCoreRowModel(),
  onSortingChange: (updaterOrValue) => utils(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) => utils(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) => utils(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) => utils(updaterOrValue, rowSelection),
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),

})
</script>

<template>
  <div class="space-y-4">
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center"> No results.</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <DataTablePagination
      :table="table"
      @update:page="handlePageChange"
      @update:pageSize="handlePageSize"
    />
  </div>
</template>
