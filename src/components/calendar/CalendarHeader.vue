<template>
  <div class="flex flex-row justify-between px-6 py-4">
    <h1 class="text-left text-2xl antialiased font-medium">January, 2021</h1>

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

    <span>
      <button class="py-2 px-4 border border-r-0 rounded-l-lg">
        <chevron-left-icon class="h-4 w-4" />
      </button>
      <button class="py-2 px-4 border rounded-r-lg">
        <chevron-right-icon class="h-4 w-4" />
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
    emits: ['change:calendar-view'],
  })
</script>
