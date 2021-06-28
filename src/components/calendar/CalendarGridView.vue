<template>
  <div class="grid grid-cols-7 grid-flow-row">
    <div class="calendar-weekdays">MON</div>
    <div class="calendar-weekdays">TUE</div>
    <div class="calendar-weekdays">WED</div>
    <div class="calendar-weekdays">THU</div>
    <div class="calendar-weekdays">FRI</div>
    <div class="calendar-weekdays">SAT</div>
    <div class="calendar-weekdays">SUN</div>
  </div>
  <div class="calendar-cells">
    <div
      v-for="i in 31"
      :key="i"
      class="border-b border-l"
      :class="{ 'border-r': i === 31 }"
    >
      <div class="flex flex-col">
        <span class="text-center py-1 text-sm font-medium">
          {{ i }}
        </span>
        <ul class="event-list">
          <li class="event-list-item bg-yellow-500">hi</li>
          <li class="event-list-item bg-blue-200">hi</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
  .calendar-weekdays {
    @apply h-6 bg-blue-500 text-white text-center p-1 text-xs;
  }
  .calendar-cells {
    @apply grid grid-rows-5 grid-cols-7 grid-flow-row gap-0;
    height: calc(100% - 1.5rem);
  }

  .event-list {
    @apply pr-3 py-5;
  }
  .event-list-item {
    @apply h-5 text-white rounded-r-full text-sm px-2 my-1;
  }
</style>
