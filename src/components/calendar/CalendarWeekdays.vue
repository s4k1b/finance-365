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
</template>

<style lang="scss" scoped>
  .calendar-weekdays {
    @apply h-6 bg-blue-500 text-white text-center p-1 text-xs;
  }
</style>
