<template>
  <div class="grid grid-cols-7 grid-flow-row">
    <div class="calendar-weekdays">SUN</div>
    <div class="calendar-weekdays">MON</div>
    <div class="calendar-weekdays">TUE</div>
    <div class="calendar-weekdays">WED</div>
    <div class="calendar-weekdays">THU</div>
    <div class="calendar-weekdays">FRI</div>
    <div class="calendar-weekdays">SAT</div>
  </div>
</template>

<style lang="scss" scoped>
  .calendar-weekdays {
    @apply h-6 bg-gray-200 text-gray-400 text-center p-1 text-xs border-r;
  }
</style>
