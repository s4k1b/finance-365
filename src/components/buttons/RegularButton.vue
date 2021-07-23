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
      disabled:opacity-50 disabled:cursor-not-allowed
    "
    :class="[`text-${type}-500`]"
    :disabled="isDisabled || isLoaderActive ? true : null"
  >
    <spinner v-if="isLoaderActive" class="h-5" />
    <span v-else>{{ buttonTitle }}</span>
  </button>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'

  export default defineComponent({
    components: {
      Spinner: defineAsyncComponent(() => import('../loaders/Spinner.vue')),
    },
    props: {
      buttonTitle: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: 'gray',
      },
      isLoaderActive: {
        type: Boolean,
        default: false,
      },
      isDisabled: {
        type: Boolean,
        default: false,
      },
    },
  })
</script>
