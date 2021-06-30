<template>
  <calendar-weekdays v-if="view === 'grid'" />
  <div
    :class="view === 'grid' ? 'calendar-cells-grid' : 'calendar-cells-timeline'"
  >
    <div
      v-for="i in daysInMonth"
      :key="i"
      class="calendar-cell"
      :class="{ 'border-r': i === daysInMonth && view === 'grid' }"
    >
      <div
        v-if="(view === 'timeline') & (i !== daysInMonth)"
        class="timeline-dashes"
      />
      <div class="flex flex-row justify-center items-center">
        <span class="calendar-cell-date">
          {{ i }}
        </span>
        <div v-if="view === 'timeline'" class="custom-date">January, 2021</div>
      </div>
      <ul class="event-list">
        <li class="event-list-item bg-yellow-500">hi</li>
        <li class="event-list-item bg-blue-200">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus
          quidem quo hic? Totam praesentium, quam exercitationem, laboriosam
          voluptate ratione sequi repellat minus provident iste saepe natus.
          Accusantium molestias reprehenderit aut.
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineAsyncComponent, defineComponent } from 'vue'

  export default defineComponent({
    components: {
      CalendarWeekdays: defineAsyncComponent(
        () => import('./CalendarWeekdays.vue')
      ),
    },
    props: {
      view: {
        type: String,
        default: 'grid',
      },
      date: {
        type: Object,
        default: new Date(),
      },
    },
    setup(props) {
      const month = computed(() => props.date.getMonth())
      const year = computed(() => props.date.getFullYear())

      const daysInMonth = computed(() =>
        new Date(year.value, month.value + 1, 0).getDate()
      )

      return {
        daysInMonth,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .calendar-cells-grid {
    @apply grid grid-rows-5 grid-cols-7 grid-flow-row gap-0 overflow-hidden;
    height: calc(100% - 1.5rem);

    .calendar-cell {
      @apply flex flex-col border-b border-l;

      .calendar-cell-date {
        @apply text-center py-1 text-sm font-medium;
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
