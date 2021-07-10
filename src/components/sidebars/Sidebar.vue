<template>
  <div class="flex flex-col justify-between h-full">
    <span
      class="
        h-16
        p-3
        text-center text-3xl
        antialiased
        font-bold
        cursor-pointer
        text-gray-400
      "
    >
      Finance 365
    </span>
    <div class="flex flex-col justify-center h-full">
      <user />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'

  export default defineComponent({
    components: {
      User: defineAsyncComponent(() => import('../User.vue')),
    },
  })
</script>
