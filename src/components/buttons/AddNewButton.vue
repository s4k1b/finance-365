<template>
  <button class="add-new-button w-20">
    <div class="flex flex-row items-center">
      <plus-circle-icon class="h-6 w-6 mr-1" />
      Add new
    </div>
  </button>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'

  export default defineComponent({
    components: {
      PlusCircleIcon: defineAsyncComponent(() =>
        import('@heroicons/vue/solid').then((obj) => obj.PlusCircleIcon)
      ),
    },
    // setup() {

    // },
  })
</script>
