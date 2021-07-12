<template>
  <icon-button button-title="Edit Account" @click="showEditAccountModal = true">
    <edit-icon class="w-5 h-5" />
  </icon-button>

  <edit-account-modal
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
      EditIcon: defineAsyncComponent(() =>
        import('@heroicons/vue/outline').then((obj) => obj.PencilAltIcon)
      ),
      EditAccountModal: defineAsyncComponent(
        () => import('../modals/EditAccountModal.vue')
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
