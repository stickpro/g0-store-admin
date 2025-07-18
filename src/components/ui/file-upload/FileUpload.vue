<template>
  <div
    :class="cn('w-full', $props.class)"
    @dragover.prevent="handleEnter"
    @dragleave="handleLeave"
    @drop.prevent="handleDrop"
    @mouseover="handleEnter"
    @mouseleave="handleLeave"
  >
    <div
      class="group/file relative block w-full cursor-pointer overflow-hidden rounded-lg p-10"
      @click="handleClick"
    >
      <input ref="fileInputRef" type="file" class="hidden" @change="onFileChange" multiple />

      <!-- Grid pattern -->
      <div
        class="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
      >
        <slot />
      </div>

      <!-- Content -->
      <div class="flex flex-col items-center justify-center">
        <p
          class="relative z-20 font-sans text-base font-bold text-neutral-700 dark:text-neutral-300"
        >
          Upload file
        </p>
        <p
          class="relative z-20 mt-2 font-sans text-base font-normal text-neutral-400 dark:text-neutral-400"
        >
          Drag or drop your files here or click to upload
        </p>

        <div class="relative mx-auto mt-10 w-full max-w-xl space-y-4">
          <Motion
            v-for="(file, idx) in files"
            :key="file.name + file.lastModified"
            draggable="true"
            @dragstart="() => (dragIndex = idx)"
            @dragover.prevent="onDragOver(idx)"
            @drop.prevent="onDrop"
            :initial="{ opacity: 0, scaleX: 0 }"
            :animate="{ opacity: 1, scaleX: 1 }"
            class="relative z-40 mx-auto gap-1 flex w-full flex-row items-start justify-start overflow-hidden rounded-md bg-white p-4 shadow-sm dark:bg-neutral-900"
          >
            <div v-if="file.type.startsWith('image/')" class="mb-2">
              <img
                :src="getFilePreview(file)"
                class="h-32 w-32 rounded-md object-cover"
                alt="image"
              />
            </div>
            <div>
              <div class="flex w-full items-center justify-between gap-4">
                <Motion
                  as="p"
                  :initial="{ opacity: 0 }"
                  :animate="{ opacity: 1 }"
                  class="max-w-xs truncate text-base text-neutral-700 dark:text-neutral-300"
                >
                  {{ file.name }}
                </Motion>
                <Motion
                  as="p"
                  :initial="{ opacity: 0 }"
                  :animate="{ opacity: 1 }"
                  class="w-fit shrink-0 rounded-lg px-2 py-1 text-sm text-neutral-600 shadow-input dark:bg-neutral-800 dark:text-white"
                >
                  {{ (file.size / (1024 * 1024)).toFixed(2) }} MB
                </Motion>
                <button
                  @click.stop="removeFile(idx)"
                  class="mt-2 text-sm text-red-500 hover:text-red-700"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>

              <div
                class="mt-2 flex w-full flex-col items-start justify-between text-sm text-neutral-600 md:flex-row md:items-center dark:text-neutral-400"
              >
                <Motion
                  as="p"
                  :initial="{ opacity: 0 }"
                  :animate="{ opacity: 1 }"
                  class="rounded-md bg-gray-100 px-1.5 py-1 text-sm dark:bg-neutral-800"
                >
                  {{ file.type || 'unknown type' }}
                </Motion>
                <Motion as="p" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }">
                  modified {{ new Date(file.lastModified).toLocaleDateString() }}
                </Motion>
              </div>
            </div>
          </Motion>

          <template v-if="!files.length">
            <Motion
              as="div"
              class="relative z-40 mx-auto mt-4 flex h-32 w-full max-w-32 items-center justify-center rounded-md bg-white shadow-[0px_10px_50px_rgba(0,0,0,0.1)] group-hover/file:shadow-2xl dark:bg-neutral-900"
              :initial="{
                x: 0,
                y: 0,
                opacity: 1,
              }"
              :transition="{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }"
              :animate="
                isActive
                  ? {
                      x: 20,
                      y: -20,
                      opacity: 0.9,
                    }
                  : {}
              "
            >
              <svg
                class="text-neutral-600 dark:text-neutral-400"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 16.004V17a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-8-.5v-11M15.5 8 12 4.5 8.5 8"
                />
              </svg>
            </Motion>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Trash2 } from 'lucide-vue-next'
import { Motion } from 'motion-v'

import type { HTMLAttributes } from 'vue'
import { ref } from 'vue'

import { cn } from '@/lib/utils'

interface FileUploadProps {
  class?: HTMLAttributes['class']
}

defineProps<FileUploadProps>()

const emit = defineEmits<{ (e: 'onChange', files: File[]): void }>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const files = ref<File[]>([])
const isActive = ref<boolean>(false)
const dragIndex = ref<number | null>(null)

function getFilePreview(file: File) {
  return URL.createObjectURL(file)
}

function handleFileChange(newFiles: File[]) {
  files.value = [...files.value, ...newFiles]
  emit('onChange', files.value)
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files) return
  handleFileChange(Array.from(input.files))
}

function handleClick() {
  fileInputRef.value?.click()
}

function handleEnter() {
  isActive.value = true
}

function handleLeave() {
  isActive.value = false
}

function handleDrop(e: DragEvent) {
  isActive.value = false
  const droppedFiles = e.dataTransfer?.files ? Array.from(e.dataTransfer.files) : []
  if (droppedFiles.length) handleFileChange(droppedFiles)
}

function removeFile(index: number) {
  files.value.splice(index, 1)
  emit('onChange', files.value)
}

function onDragOver(overIndex: number) {
  if (dragIndex.value === null || dragIndex.value === overIndex) return
  const tempFiles = [...files.value]
  const draggedItem = tempFiles.splice(dragIndex.value, 1)[0]
  tempFiles.splice(overIndex, 0, draggedItem)
  files.value = tempFiles
  dragIndex.value = overIndex
  emit('onChange', files.value)
}

function onDrop() {
  dragIndex.value = null
}
</script>
