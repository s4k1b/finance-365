<template>
  <button
    class="
      bg-gray-200
      hover:bg-gray-100
      transition-colors
      font-medium
      py-2
      px-4
      rounded
      items-center
      w-full
    "
    :class="[`text-${type}-500`]"
  >
    <span>{{ buttonTitle }}</span>
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      buttonTitle: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: 'gray',
      },
    },
  })
</script>
