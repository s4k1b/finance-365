<template>
  <calendar-weekdays v-if="view === 'grid'" />
  <div
    :class="
      view === 'grid'
        ? `calendar-cells-grid grid-rows-${calendarCells.length / 7}`
        : 'calendar-cells-timeline'
    "
  >
    <calendar-cell
      v-for="calendarCell in calendarCells"
      :key="calendarCell"
      :date="calendarCell"
      :is-current-month-cell="!notCurrentMonthCell(calendarCell)"
    />
  </div>
</template>

<script lang="ts">
  import {
    computed,
    ComputedRef,
    defineAsyncComponent,
    defineComponent,
    inject,
  } from 'vue'

  export default defineComponent({
    components: {
      CalendarWeekdays: defineAsyncComponent(
        () => import('./CalendarWeekdays.vue')
      ),
      CalendarCell: defineAsyncComponent(() => import('./CalendarCell.vue')),
    },
    props: {
      date: {
        type: Object,
        default: new Date(),
      },
    },
    setup(props) {
      const month: ComputedRef<number> = computed(() => props.date.getMonth())
      const year: ComputedRef<number> = computed(() => props.date.getFullYear())

      const daysInMonth = computed(() =>
        new Date(year.value, month.value + 1, 0).getDate()
      )

      const calendarCells = computed(() => {
        const startingWeek = new Date(year.value, month.value, 1).getDay()

        const numberOfCalendarCells = computed(
          () => Math.ceil((startingWeek + daysInMonth.value) / 7) * 7
        )
        const ans = Array(numberOfCalendarCells)

        // prefill the calendar cells upto starting week with previous month dates
        let previousMonth = month.value - 1
        let previousYear = year.value
        console.log({ previousYear, previousMonth })
        if (previousMonth < 0) {
          previousMonth = 11
          previousYear -= 1
        }
        console.log({ previousYear, previousMonth })
        const daysInPreviousMonth = new Date(
          previousYear,
          previousMonth + 1,
          0
        ).getDate()
        for (let i = 0; i < startingWeek; i++) {
          ans[i] = new Date(
            previousYear,
            previousMonth,
            daysInPreviousMonth - startingWeek + i + 1
          )
        }

        // fillup with current month dates
        for (let i = startingWeek; i < daysInMonth.value + startingWeek; i++) {
          ans[i] = new Date(year.value, month.value, i - startingWeek + 1)
        }

        // fillup with next month dates
        let nextMonth = month.value + 1
        let nextYear = year.value
        if (nextMonth > 11) {
          nextMonth = 0
          nextYear += 1
        }
        for (
          let i = daysInMonth.value + startingWeek;
          i < numberOfCalendarCells.value;
          i++
        ) {
          ans[i] = new Date(
            nextYear,
            nextMonth,
            i - daysInMonth.value - startingWeek + 1
          )
        }

        return ans
      })

      function notCurrentMonthCell(date) {
        const cellMonth = date.getMonth()
        return cellMonth !== month.value
      }
      return {
        view: inject('view'),
        calendarCells,
        notCurrentMonthCell,
      }
    },
  })
</script>

<style lang="scss">
  .calendar-cells-grid {
    @apply grid grid-cols-7 grid-flow-row gap-0 overflow-hidden;
    height: calc(100% - 1.5rem);

    .calendar-cell {
      @apply flex flex-col border-b border-l;

      .calendar-cell-date {
        @apply text-center my-1 text-sm font-medium;
        &.current-date {
          @apply h-5 w-5 rounded-full justify-center items-center bg-green-600 text-white;
        }
      }

      .event-list {
        @apply pr-3 w-full;
      }
      .event-list-item {
        @apply h-5 text-white rounded-r-full text-sm px-2 my-1 overflow-hidden;
      }
    }
  }
  .calendar-cells-timeline {
    @apply px-10 h-full w-full;

    .calendar-cell {
      @apply relative mb-4 flex flex-col items-start w-full;

      .timeline-dashes {
        @apply absolute border-dashed border-blue-500 border top-8;
        left: 7px;
        height: 100%;
      }

      .calendar-cell-date {
        @apply text-sm font-medium my-4 rounded-full h-4 w-4 flex justify-center items-center bg-indigo-300 ring-4 ring-indigo-400 ring-opacity-30;
        &.current-date {
          @apply bg-green-600 ring-green-500 text-white;
        }
      }

      .custom-date {
        @apply block ml-2.5 text-xs font-medium min-w-max;
      }

      .event-list {
        @apply pr-3 w-8/12;
        margin-left: 26px;
      }
      .event-list-item {
        @apply w-max max-w-full text-white rounded-r-full text-sm px-2 my-1;
      }
    }
  }
</style>
