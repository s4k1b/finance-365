<template>
  <icon-button button-title="Edit Contact" @click="showEditContactModal = true">
    <edit-icon class="w-5 h-5" />
  </icon-button>

  <edit-contact-modal
    :show="showEditContactModal"
    :contact-index="index"
    @close-modal="showEditContactModal = false"
  />
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, ref } from 'vue'

  export default defineComponent({
    components: {
      IconButton: defineAsyncComponent(() => import('./IconButton.vue')),
      EditIcon: defineAsyncComponent(() =>
        import('@heroicons/vue/outline').then((obj) => obj.PencilAltIcon)
      ),
      EditContactModal: defineAsyncComponent(
        () => import('../modals/EditContactModal.vue')
      ),
    },
    props: {
      index: {
        type: Number as number,
        default: null,
      },
    },

    setup() {
      const showEditContactModal = ref(false)

      return {
        showEditContactModal,
      }
    },
  })
</script>
