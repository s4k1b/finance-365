<template>
  <icon-button
    button-title="Delete Account"
    @click="showDeleteAccountModal = true"
  >
    <delete-icon class="w-5 h-5" />
  </icon-button>

  <delete-account-modal
    :show="showDeleteAccountModal"
    :account-index="index"
    @close-modal="showDeleteAccountModal = false"
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
      const showDeleteAccountModal = ref(false)

      return {
        showDeleteAccountModal,
      }
    },
  })
</script>
