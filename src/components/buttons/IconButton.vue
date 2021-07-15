<template>
  <button
    class="
      text-center
      p-1
      rounded-md
      text-gray-500
      bg-gray-200
      transition-all
      hover:bg-blue-100 hover:border-blue-200
    "
    :title="buttonTitle"
  >
    <slot />
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
    },
  })
</script>
