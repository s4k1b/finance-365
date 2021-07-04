<template>
  <div class="flex flex-row justify-between px-6 py-4">
    <h1
      :key="title"
      class="
        w-1/3
        text-left text-2xl
        antialiased
        font-medium
        animate__animated animate__fadeIn
      "
    >
      {{ title }}
    </h1>

    <span>
      <button
        class="
          py-2
          px-4
          border border-r-0
          rounded-l-lg
          text-xs
          antialiased
          font-medium
        "
        @click.prevent="$emit('change:calendar-view', 'grid')"
      >
        Grid View
      </button>
      <button
        class="py-2 px-4 border rounded-r-lg text-xs antialiased font-medium"
        @click.prevent="$emit('change:calendar-view', 'timeline')"
      >
        Timeline View
      </button>
    </span>

    <span class="w-1/3 flex flex-row-reverse">
      <button
        class="py-2 px-4 border rounded-r-lg"
        @click.prevent="$emit('change:month-next')"
      >
        <chevron-right-icon class="h-4 w-4" />
      </button>
      <button
        class="py-2 px-4 border border-r-0 rounded-l-lg"
        @click.prevent="$emit('change:month-previous')"
      >
        <chevron-left-icon class="h-4 w-4" />
      </button>
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent, defineAsyncComponent } from 'vue'

  export default defineComponent({
    components: {
      ChevronLeftIcon: defineAsyncComponent(() =>
        import('@heroicons/vue/outline').then((obj) => obj.ChevronLeftIcon)
      ),
      ChevronRightIcon: defineAsyncComponent(() =>
        import('@heroicons/vue/outline').then((obj) => obj.ChevronRightIcon)
      ),
    },
    props: {
      title: {
        type: String,
        default: 'Timeline',
      },
    },
    emits: [
      'change:calendar-view',
      'change:month-previous',
      'change:month-next',
    ],
  })
</script>
