<template>
  <div class="mt-2">
    <list
      header="Manage Accounts"
      @click:add-new-button="showAddNewAccountModal = true"
    >
      <list-item v-for="(account, id) in accounts" :key="id">
        <div class="flex flex-row bg-gray-200 rounded-md p-2 items-center">
          <img
            class="inline object-contain w-8 h-8 mr-2"
            :src="account.logoUrl"
            alt="Profile image"
          />
          <div class="flex flex-col justify-between w-full">
            <h2 class="text-sm font-medium text-gray-500">
              {{ account.name }}
            </h2>
            <span class="flex flex-row justify-start">
              <h2 class="text-xs font-medium text-gray-400 mr-3">Balance:</h2>
              <span class="text-xs font-semibold">
                {{ account.balance }} &#2547;
              </span>
            </span>
          </div>
          <div class="flex flex-row px-2">
            <account-edit-button :index="id" />
            <account-delete-button :index="id" />
          </div>
        </div>
      </list-item>
    </list>
    <add-new-account-modal
      :show="showAddNewAccountModal"
      @close-modal="showAddNewAccountModal = false"
    />
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, ref } from 'vue'
  import { useStore } from '../../store'
  import { useAccounts } from '../../composables/accounts'

  export default defineComponent({
    components: {
      List: defineAsyncComponent(() => import('../list/List.vue')),
      ListItem: defineAsyncComponent(() => import('../list/ListItem.vue')),
      AccountDeleteButton: defineAsyncComponent(
        () => import('../buttons/AccountDeleteButton.vue')
      ),
      AccountEditButton: defineAsyncComponent(
        () => import('../buttons/AccountEditButton.vue')
      ),
      AddNewAccountModal: defineAsyncComponent(
        () => import('../modals/AddNewAccontModal.vue')
      ),
    },

    setup() {
      const showAddNewAccountModal = ref(false)

      const store = useStore()
      const { accounts } = useAccounts(store)

      return {
        accounts,
        showAddNewAccountModal,
      }
    },
  })
</script>
