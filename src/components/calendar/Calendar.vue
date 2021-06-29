<template>
  <div class="flex flex-col h-full">
    <div class="flex-auto h-16">
      <div class="flex flex-row justify-between px-6 py-4">
        <h1 class="text-left text-2xl antialiased font-medium">
          January, 2021
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
            @click.prevent="activeCalendarView = 'grid'"
          >
            Grid View
          </button>
          <button
            class="
              py-2
              px-4
              border
              rounded-r-lg
              text-xs
              antialiased
              font-medium
            "
            @click.prevent="activeCalendarView = 'timeline'"
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
    </div>
    <div class="flex-auto h-full">
      <calendar-dates :view="activeCalendarView" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, ref } from 'vue'

  export default defineComponent({
    components: {
      ChevronLeftIcon: defineAsyncComponent(() =>
        import('@heroicons/vue/outline').then((obj) => obj.ChevronLeftIcon)
      ),
      ChevronRightIcon: defineAsyncComponent(() =>
        import('@heroicons/vue/outline').then((obj) => obj.ChevronRightIcon)
      ),
      CalendarDates: defineAsyncComponent(
        () => import('@/components/calendar/CalendarDates.vue')
      ),
    },
    setup() {
      const activeCalendarView = ref('grid')

      return {
        activeCalendarView,
      }
    },
  })
</script>
