<template>
  <div
    class="calendar-cell"
    :class="{ 'border-r': tarik === daysInMonth && view === 'grid' }"
  >
    <div
      v-if="(view === 'timeline') & (tarik !== daysInMonth)"
      class="timeline-dashes"
    />
    <div
      :id="`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`"
      class="flex flex-row justify-center items-center"
    >
      <span
        class="calendar-cell-date"
        :class="{
          'text-gray-300': view === 'grid' && !isCurrentMonthCell,
          'current-date': isCurrentDate,
        }"
      >
        {{ tarik }}
      </span>
      <div v-if="view === 'timeline'" class="custom-date">{{ monthYear }}</div>
    </div>
    <ul class="event-list">
      <!-- <li class="event-list-item bg-yellow-500">hi</li>
      <li class="event-list-item bg-blue-200">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus
        quidem quo hic? Totam praesentium, quam exercitationem, laboriosam
        voluptate ratione sequi repellat minus provident iste saepe natus.
        Accusantium molestias reprehenderit aut.
      </li> -->
    </ul>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, inject } from 'vue'

  export default defineComponent({
    props: {
      date: {
        type: Object,
        default: new Date(),
      },
      isCurrentMonthCell: {
        type: Boolean,
        default: true,
      },
    },
    setup(props) {
      const tarik = computed(() => props.date.getDate())
      const month = computed(() => props.date.getMonth())
      const year = computed(() => props.date.getFullYear())

      const daysInMonth = computed(() =>
        new Date(year.value, month.value + 1, 0).getDate()
      )

      const monthYear = computed(() =>
        Intl.DateTimeFormat('en-US', {
          month: 'long',
          year: 'numeric',
        }).format(props.date)
      )

      const isCurrentDate = computed(() => {
        const currentDate = new Date()
        const currentTarik = currentDate.getDate()
        const currentMonth = currentDate.getMonth()
        const currentYear = currentDate.getFullYear()

        return (
          currentTarik === tarik.value &&
          currentMonth === month.value &&
          currentYear === year.value
        )
      })

      return {
        view: inject('view'),
        tarik,
        daysInMonth,
        monthYear,
        isCurrentDate,
      }
    },
  })
</script>
