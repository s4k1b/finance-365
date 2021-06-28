<template>
  <div class="grid grid-cols-12 grid-flow-col gap-0">
    <div class="col-span-2 bg-blue-500 h-screen">
      <sidebar />
    </div>
    <div class="col-span-10 h-screen">
      <calendar />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'

  export default defineComponent({
    name: 'App',

    components: {
      Sidebar: defineAsyncComponent(
        () => import('@/components/sidebars/Sidebar.vue')
      ),
      Calendar: defineAsyncComponent(
        () => import('@/components/calendar/Calendar.vue')
      ),
    },
  })
</script>
