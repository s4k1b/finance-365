<template>
  <div class="flex flex-col justify-start w-full">
    <div class="flex flex-row justify-between px-3 w-full border-b-2 pb-1">
      <h2 class="text-md font-medium text-gray-600">{{ header }}</h2>
      <div class="flex flex-row">
        <list-add-new-button @click="$emit('click:add-new-button')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'

  export default defineComponent({
    components: {
      ListAddNewButton: defineAsyncComponent(
        () => import('../buttons/ListAddNewButton.vue')
      ),
    },
    props: {
      header: {
        type: String,
        default: '',
      },
    },
    emits: ['click:add-new-button'],
  })
</script>
