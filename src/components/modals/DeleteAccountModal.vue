<template>
  <modal size="sm" @close-modal="$emit('close-modal', true)">
    <template #modal-title>Delete Account</template>
    <div class="grid grid-flow-row gap-4 grid-cols-2 w-full">
      <span class="col-span-2 text-center"
        >Do you want to delete the account <br />
        <strong>{{ accountName }}</strong>
        ?
      </span>
      <regular-button
        button-title="Cancel"
        @click="$emit('close-modal', true)"
      />
      <regular-button
        button-title="Delete"
        type="red"
        :is-loader-active="isAccountDeleting"
        @click="deleteBankAccount"
      />
    </div>
  </modal>
</template>

<script lang="ts">
  import { computed, defineAsyncComponent, defineComponent } from 'vue'
  import { useAccounts } from '../../composables/accounts'
  import { useUser } from '../../composables/user'
  import { useStore } from '../../store'

  export default defineComponent({
    components: {
      Modal: defineAsyncComponent(() => import('./Modal.vue')),
      RegularButton: defineAsyncComponent(
        () => import('../buttons/RegularButton.vue')
      ),
    },
    props: {
      accountIndex: {
        type: Number as number,
        default: null,
      },
    },
    emits: ['close-modal'],

    setup(props, { emit }) {
      const { user } = useUser()
      const store = useStore()
      const { isAccountDeleting, deleteAccount, accounts } = useAccounts(store)

      const accountName = computed(
        () => accounts.value[props.accountIndex].name
      )

      async function deleteBankAccount() {
        await deleteAccount(user.value.id, props.accountIndex)

        emit('close-modal', true)
      }

      return {
        isAccountDeleting,
        deleteBankAccount,
        accountName,
      }
    },
  })
</script>
