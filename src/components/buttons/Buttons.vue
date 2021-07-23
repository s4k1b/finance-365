<template>
  <div
    class="grid grid-flow-col w-full"
    :class="`grid-cols-${count} gap-${gap}`"
  >
    <slot />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      count: {
        type: Number,
        default: 1,
      },
      gap: {
        type: Number,
        default: 4,
      },
    },
  })
</script>
