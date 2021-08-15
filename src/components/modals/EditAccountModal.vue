<template>
  <modal size="sm" @close-modal="$emit('close-modal', true)">
    <template #modal-title>Edit Account</template>
    <div class="grid grid-flow-row gap-4 grid-cols-2 w-full">
      <div class="col-span-2">
        <simple-input
          v-model="name"
          label="Account Name"
          type="text"
          :disabled="isCashAccount ? true : null"
        />
      </div>

      <div class="col-span-2">
        <simple-input
          v-model.number="balance"
          label="Account Balance"
          type="number"
        />
      </div>

      <div class="col-span-2">
        <simple-input
          v-model="logoUrl"
          label="Account Logo Url"
          type="text"
          class="col-span-2"
          :disabled="isCashAccount ? true : null"
        />
      </div>
    </div>
    <template #modal-footer-left-controls>
      <regular-button
        button-title="Cancel"
        @click="$emit('close-modal', true)"
      />
    </template>
    <template #modal-footer-right-controls>
      <regular-button
        button-title="Update"
        type="green"
        :is-loader-active="isAccountUpdating"
        @click="updateBankAccount"
      />
    </template>
  </modal>
</template>

<script lang="ts">
  import {
    computed,
    defineAsyncComponent,
    defineComponent,
    ref,
    watch,
  } from 'vue'
  import { useAccounts } from '../../composables/accounts'
  import { useUser } from '../../composables/user'
  import { useStore } from '../../store'

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
      accountIndex: {
        type: Number as number,
        default: null,
      },
    },
    emits: ['close-modal'],

    setup(props, { emit }) {
      const store = useStore()
      const { accounts, isAccountUpdating, updateAccount } = useAccounts(store)

      const account = computed(() => accounts.value[props.accountIndex])

      const isCashAccount = accounts.value[props.accountIndex].isCashAccount

      const name = ref('')
      const balance = ref('')
      const logoUrl = ref('')

      watch(
        account,
        (n) => {
          name.value = n?.name
          balance.value = n?.balance
          logoUrl.value = n?.logoUrl
        },
        { immediate: true }
      )

      const { user } = useUser()

      async function updateBankAccount() {
        await updateAccount(user.value.id, props.accountIndex, {
          name: name.value,
          balance: balance.value,
          logoUrl: logoUrl.value,
        })

        emit('close-modal', true)
      }

      return {
        isCashAccount,

        name,
        balance,
        logoUrl,

        isAccountUpdating,
        updateBankAccount,
      }
    },
  })
</script>
