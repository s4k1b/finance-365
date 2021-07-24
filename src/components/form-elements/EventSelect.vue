<template>
  <div class="event-select-box">
    <label
      class="
        text-gray-600
        font-medium
        pointer-events-none
        px-2
        text-justify text-base
      "
    >
      Event Type
    </label>
    <div
      class="grid grid-flow-col gap-4 grid-cols-7 justify-items-stretch mt-2"
    >
      <div
        v-for="event in eventTypes"
        :key="event.type"
        class="event-select-item"
        :class="[selectedType === event.type ? 'selected' : '', event.type]"
        @click="selectedType = event.type"
      >
        <img class="w-1/2 h-1/2" :src="event.icon" alt="" />
        <span class="text-gray-600 font-medium text-sm mt-2">{{
          event.title
        }}</span>
        <div class="event-select-item-underline"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import { useEvents } from '../../composables/events'

  export default defineComponent({
    props: {
      modelValue: {
        type: String,
        default: '',
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const { eventTypes } = useEvents()

      const selectedType = ref(props.modelValue)
      watch(selectedType, (n) => {
        emit('update:modelValue', n)
      })

      return {
        eventTypes,
        selectedType,
      }
    },
  })
</script>

<style lang="scss">
  .event-select-box {
    @apply relative cursor-pointer;
  }
  .event-select-item {
    @apply flex flex-col h-36 rounded-md bg-gray-100 items-center pt-6 relative transition-all;
  }
  .event-select-item-underline {
    @apply border-b-2;
  }
  .event-select-item-underline:after {
    @apply absolute left-0 right-0 bottom-0 pointer-events-none border-b-2 border-green-500;
    bottom: -0.05rem;
    content: '';
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    transform: scaleX(0);
  }
  .event-select-item:hover .event-select-item-underline:after {
    transform: scaleX(1);
  }

  .event-select-item.selected {
    @apply bg-gray-200 shadow-lg;
    .event-select-item-underline:after {
      transform: scaleX(1);
    }
  }

  .salary-in {
    .event-select-item-underline:after {
      border-color: #1b998b;
    }
  }
  .cash-in {
    .event-select-item-underline:after {
      border-color: #228cdb;
    }
  }
  .payment {
    .event-select-item-underline:after {
      border-color: #5e6572;
    }
  }
  .purchase {
    .event-select-item-underline:after {
      @apply border-yellow-400;
    }
  }
  .lend-in {
    .event-select-item-underline:after {
      border-color: #f46036;
    }
  }
  .lend-out {
    .event-select-item-underline:after {
      border-color: #0b7189;
    }
  }
  .shared-cost {
    .event-select-item-underline:after {
      border-color: #d7263d;
    }
  }
</style>
