<template>
  <div class="flex flex-col justify-start w-full border-b-1">
    <div class="flex flex-row justify-between px-3 w-full border-b-2 pb-1">
      <h2 class="text-md font-medium text-gray-600">{{ header }}</h2>
      <div class="flex flex-row">
        <list-add-new-button @click="$emit('click:add-new-button')" />
      </div>
    </div>
    <animate-transition-group
      tag="ul"
      animation-enter="slideInDown"
      animation-leave="slideOutDown"
      class="grid grid-flow-row grid-cols-1 gap-2 w-full px-3 py-2"
      appear
    >
      <slot />
    </animate-transition-group>
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'

  export default defineComponent({
    components: {
      AnimateTransitionGroup: defineAsyncComponent(
        () => import('../transitions/AnimateTransitionGroup.vue')
      ),
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
