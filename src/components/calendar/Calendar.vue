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
    <div
      ref="calendarDatesWrapper"
      class="calendar-dates-wrapper"
      @wheel="debounce(debouncedHandler($event), 500)"
    >
      <calendar-dates :date="computedDate" />
    </div>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineAsyncComponent,
    defineComponent,
    nextTick,
    provide,
    ref,
  } from 'vue'
  import { useDebounce } from '../../composables/debounce'

  export default defineComponent({
    components: {
      CalendarHeader: defineAsyncComponent(
        () => import('./CalendarHeader.vue')
      ),
      CalendarDates: defineAsyncComponent(() => import('./CalendarDates.vue')),
    },
    setup() {
      const calendarDatesWrapper = ref(null)
      const activeCalendarView = ref('grid')

      provide('view', activeCalendarView)

      const date = ref(new Date())

      const month = ref(date.value.getMonth())
      const year = ref(date.value.getFullYear())

      const computedDate = computed(() => new Date(year.value, month.value))

      function scrollIntoView(month, year, date) {
        nextTick(() => {
          const dateId = `${date}-${month}-${year}`
          console.log({ dateId })
          const firstDateElement = document.getElementById(dateId)
          firstDateElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        })
      }

      async function showPreviousMonth() {
        const newMonth = month.value - 1
        if (newMonth < 0) {
          month.value = 11
          year.value = year.value - 1
        } else {
          month.value = newMonth
        }

        // scroll to date if timeline view
        if (activeCalendarView.value === 'timeline') {
          await nextTick(() => {
            scrollIntoView(
              month.value,
              year.value,
              new Date(year.value, month.value + 1, 0).getDate()
            )
          })

          topReachedOnce = false
          endReachedOnce = true
        }
      }
      async function showNextMonth() {
        const newMonth = month.value + 1
        if (newMonth > 11) {
          month.value = 0
          year.value = year.value + 1
        } else {
          month.value = newMonth
        }

        // scroll to date if timeline view
        if (activeCalendarView.value === 'timeline') {
          await nextTick(() => {
            scrollIntoView(month.value, year.value, 1)
          })

          endReachedOnce = false
          topReachedOnce = true
        }
      }

      const calendarTitle = computed(() =>
        new Intl.DateTimeFormat('en-US', {
          month: 'long',
          year: 'numeric',
        }).format(computedDate.value)
      )

      // let scrollEndReached = false

      function isScrollerAtTop() {
        const { scrollTop } = calendarDatesWrapper.value
        if (scrollTop === 0) return true
        return false
      }
      function isScrollerAtEnd() {
        const { scrollHeight, scrollTop, clientHeight } =
          calendarDatesWrapper.value
        if (scrollHeight === scrollTop + clientHeight) return true
        return false
      }

      let endReachedOnce = false
      let topReachedOnce = false

      function handleWheelEvent(e: WheelEvent) {
        if (e.wheelDeltaY > 0) {
          if (activeCalendarView.value === 'grid') {
            showPreviousMonth()
          } else {
            endReachedOnce = false

            const topReached = isScrollerAtTop()
            if (topReached) {
              if (topReachedOnce) showPreviousMonth()
              else topReachedOnce = true
            } else topReachedOnce = false
          }
        } else {
          if (activeCalendarView.value === 'grid') {
            showNextMonth()
          } else {
            topReachedOnce = false

            const endReached = isScrollerAtEnd()
            if (endReached) {
              if (endReachedOnce) showNextMonth()
              else endReachedOnce = true
            } else endReachedOnce = false
          }
        }
      }

      function debouncedHandler(e: WheelEvent) {
        return () => {
          handleWheelEvent(e)
        }
      }

      return {
        calendarDatesWrapper,
        activeCalendarView,
        calendarTitle,
        computedDate,
        showPreviousMonth,
        showNextMonth,
        debouncedHandler,
        debounce: useDebounce(),
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
      @apply flex-auto mt-16 overflow-y-auto;
      height: calc(100vh - 16px);
    }
  }
</style>
