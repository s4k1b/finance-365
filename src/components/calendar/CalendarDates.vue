<template>
  <div v-if="view === 'grid'" class="grid grid-cols-7 grid-flow-row">
    <div class="calendar-weekdays">MON</div>
    <div class="calendar-weekdays">TUE</div>
    <div class="calendar-weekdays">WED</div>
    <div class="calendar-weekdays">THU</div>
    <div class="calendar-weekdays">FRI</div>
    <div class="calendar-weekdays">SAT</div>
    <div class="calendar-weekdays">SUN</div>
  </div>
  <div
    :class="view === 'grid' ? 'calendar-cells-grid' : 'calendar-cells-timeline'"
  >
    <div
      v-if="view === 'timeline'"
      class="border-2-2 absolute border-dashed border-blue-500 border"
      style="
        margin-left: 7px;
        z-index: -1;
        margin-top: 20px;
        height: calc(100% - 150px);
      "
    ></div>
    <div
      v-for="i in 31"
      :key="i"
      class="calendar-cell"
      :class="{ 'border-r': i === 31 && view === 'grid' }"
    >
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
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      view: {
        type: String,
        default: 'grid',
      },
    },
    // setup() {

    // },
  })
</script>

<style lang="scss">
  .calendar-weekdays {
    @apply h-6 bg-blue-500 text-white text-center p-1 text-xs;
  }
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
    @apply relative px-10 h-full w-full;

    .calendar-cell {
      @apply mb-8 flex flex-col items-start w-full;

      .calendar-cell-date {
        @apply text-sm font-medium my-4 rounded-full h-4 w-4 flex justify-center items-center bg-indigo-300 ring-4 ring-indigo-400 ring-opacity-30;
      }
      .custom-date {
        @apply block ml-2.5 text-xs font-medium min-w-max;
      }

      .event-list {
        @apply pr-3 w-full;
        margin-left: 26px;
      }
      .event-list-item {
        @apply h-5 text-white rounded-r-full text-sm px-2 my-1 overflow-hidden;
      }
    }
  }
</style>
