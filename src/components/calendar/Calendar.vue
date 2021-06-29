<template>
  <div class="calendar-wrapper">
    <div class="calendar-header-wrapper">
      <calendar-header @change:calendar-view="activeCalendarView = $event" />
    </div>
    <div class="calendar-dates-wrapper">
      <calendar-dates :view="activeCalendarView" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, ref } from 'vue'

  export default defineComponent({
    components: {
      CalendarHeader: defineAsyncComponent(
        () => import('./CalendarHeader.vue')
      ),
      CalendarDates: defineAsyncComponent(() => import('./CalendarDates.vue')),
    },
    setup() {
      const activeCalendarView = ref('grid')

      return {
        activeCalendarView,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .calendar-wrapper {
    @apply flex flex-col h-full;

    .calendar-header-wrapper {
      @apply flex-auto h-16 fixed top-0 z-50 bg-white;
      width: calc(100% - 2 * 100vw / 12);
    }
    .calendar-dates-wrapper {
      @apply flex-auto mt-16 h-full;
    }
  }
</style>
