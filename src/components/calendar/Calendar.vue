<template>
  <div class="calendar-wrapper">
    <div class="calendar-header-wrapper">
      <calendar-header
        :title="calendarTitle"
        @change:calendar-view="activeCalendarView = $event"
        @change:month-previous="showPreviousMonth"
        @change:month-next="showNextMonth"
      />
    </div>
    <div class="calendar-dates-wrapper">
      <calendar-dates :date="computedDate" />
    </div>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineAsyncComponent,
    defineComponent,
    provide,
    ref,
  } from 'vue'

  export default defineComponent({
    components: {
      CalendarHeader: defineAsyncComponent(
        () => import('./CalendarHeader.vue')
      ),
      CalendarDates: defineAsyncComponent(() => import('./CalendarDates.vue')),
    },
    setup() {
      const activeCalendarView = ref('grid')
      provide('view', activeCalendarView)

      const date = ref(new Date())

      const month = ref(date.value.getMonth())
      const year = ref(date.value.getFullYear())

      const computedDate = computed(() => new Date(year.value, month.value))

      function showPreviousMonth() {
        const newMonth = month.value - 1
        if (newMonth < 0) {
          month.value = 11
          year.value = year.value - 1
        } else {
          month.value = newMonth
        }
      }
      function showNextMonth() {
        const newMonth = month.value + 1
        if (newMonth > 11) {
          month.value = 0
          year.value = year.value + 1
        } else {
          month.value = newMonth
        }
      }

      const calendarTitle = computed(() =>
        new Intl.DateTimeFormat('en-US', {
          month: 'long',
          year: 'numeric',
        }).format(computedDate.value)
      )

      return {
        activeCalendarView,
        calendarTitle,
        computedDate,
        showPreviousMonth,
        showNextMonth,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .calendar-wrapper {
    @apply flex flex-col h-full;

    .calendar-header-wrapper {
      @apply flex-auto h-16 fixed top-0 z-50 bg-white border-b;
      width: calc(100% - 2 * 100vw / 12);
    }
    .calendar-dates-wrapper {
      @apply flex-auto mt-16 h-full;
    }
  }
</style>
