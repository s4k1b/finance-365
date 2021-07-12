<template>
  <icon-button
    button-title="Delete Account"
    @click="showEditAccountModal = true"
  >
    <delete-icon class="w-5 h-5" />
  </icon-button>

  <delete-account-modal
    :show="showEditAccountModal"
    :account-index="index"
    @close-modal="showEditAccountModal = false"
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
      DeleteAccountModal: defineAsyncComponent(
        () => import('../modals/DeleteAccountModal.vue')
      ),
    },
    props: {
      index: {
        type: Number as number,
        default: null,
      },
    },

    setup() {
      const showEditAccountModal = ref(false)

      return {
        showEditAccountModal,
      }
    },
  })
</script>
