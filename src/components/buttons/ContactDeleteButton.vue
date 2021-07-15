<template>
  <icon-button
    button-title="Delete Contact"
    @click="showDeleteContactModal = true"
  >
    <delete-icon class="w-5 h-5" />
  </icon-button>

  <delete-contact-modal
    :show="showDeleteContactModal"
    :contact-index="index"
    @close-modal="showDeleteContactModal = false"
  />
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, ref } from 'vue'

  export default defineComponent({
    components: {
      IconButton: defineAsyncComponent(() => import('./IconButton.vue')),
      DeleteIcon: defineAsyncComponent(() =>
        import('@heroicons/vue/outline').then((obj) => obj.TrashIcon)
      ),
      DeleteContactModal: defineAsyncComponent(
        () => import('../modals/DeleteContactModal.vue')
      ),
    },
    props: {
      index: {
        type: Number as number,
        default: null,
      },
    },

    setup() {
      const showDeleteContactModal = ref(false)

      return {
        showDeleteContactModal,
      }
    },
  })
</script>
