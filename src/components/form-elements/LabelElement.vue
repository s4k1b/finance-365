<template>
  <label
    class="
      text-gray-600
      font-medium
      pointer-events-none
      px-2
      text-justify text-base
    "
  >
    {{ label }}
  </label>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      label: {
        type: String,
        default: '',
      },
    },
  })
</script>
