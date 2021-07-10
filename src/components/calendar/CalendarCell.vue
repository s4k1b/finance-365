<template>
  <!-- Add new event modal -->
  <div
    class="calendar-cell cursor-pointer"
    :class="[
      tarik === daysInMonth && view === 'grid' ? 'border-r' : '',
      animationClasses,
    ]"
    @click.prevent="showAddNewEventModal = true"
  >
    <add-new-event-modal
      :show="showAddNewEventModal"
      :date="date"
      @close-modal="showAddNewEventModal = false"
    />

    <div
      v-if="view === 'timeline' && tarik !== daysInMonth"
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
  import {
    computed,
    defineAsyncComponent,
    defineComponent,
    inject,
    ref,
  } from 'vue'

  export default defineComponent({
    components: {
      AddNewEventModal: defineAsyncComponent(
        () => import('../modals/AddNewEventModal.vue')
      ),
    },
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
      const view = inject('view')
      const comingFrom = inject('comingFrom')
      const showAddNewEventModal = ref(false)

      const animationClasses = computed(() => {
        let ans = 'animate__animated animate__'

        if (view.value === 'grid') {
          if (comingFrom.value === 'next') {
            ans += 'slideInLeft'
          } else if (comingFrom.value === 'previous') ans += 'slideInRight'
          else ans += 'zoomIn'
        } else {
          if (comingFrom.value === 'next') {
            ans += 'slideInDown'
          } else if (comingFrom.value === 'previous') ans += 'slideInUp'
          else ans += 'zoomIn'
        }
        return ans
      })

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
        view,
        animationClasses,
        showAddNewEventModal,
        tarik,
        daysInMonth,
        monthYear,
        isCurrentDate,
      }
    },
  })
</script>
