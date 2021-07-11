<template>
  <modal size="sm" @close-modal="$emit('close-modal', true)">
    <template #modal-title>New Account</template>
    <div class="grid grid-flow-row gap-4 grid-cols-2 w-full">
      <simple-input class="col-span-2" />

      <regular-button
        button-title="Cancel"
        @click="$emit('close-modal', true)"
      />
      <regular-button button-title="Done" type="green" />
    </div>
  </modal>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'

  export default defineComponent({
    components: {
      Modal: defineAsyncComponent(() => import('./Modal.vue')),
      SimpleInput: defineAsyncComponent(
        () => import('../form-elements/Input.vue')
      ),
      RegularButton: defineAsyncComponent(
        () => import('../buttons/RegularButton.vue')
      ),
    },
    props: {
      name: {
        type: String,
        default: '',
      },
    },
    emits: ['close-modal'],
  })
</script>
