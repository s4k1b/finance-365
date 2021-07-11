<template>
  <div class="mt-2">
    <list
      header="Manage Accounts"
      @click:add-new-button="showAddNewAccountModal = true"
    >
      <template #new-item-form>
        <div class="px-3 grid grid-cols-2 grid-flow-row gap-2">
          <simple-input class="col-span-2" />
          <regular-button button-title="Cancel" type="gray" />
          <regular-button button-title="Done" type="green" />
        </div>
      </template>
    </list>
    <add-new-account-modal
      :show="showAddNewAccountModal"
      @close-modal="showAddNewAccountModal = false"
    />
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, ref } from 'vue'

  export default defineComponent({
    components: {
      List: defineAsyncComponent(() => import('../list/List.vue')),
      AddNewAccountModal: defineAsyncComponent(
        () => import('../modals/AddNewAccontModal.vue')
      ),
    },

    setup() {
      const showAddNewAccountModal = ref(false)

      return {
        showAddNewAccountModal,
      }
    },
  })
</script>
