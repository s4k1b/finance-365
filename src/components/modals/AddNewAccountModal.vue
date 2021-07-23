<template>
  <modal size="sm" @close-modal="$emit('close-modal', true)">
    <template #modal-title>New Account</template>
    <div class="grid grid-flow-row gap-4 grid-cols-2 w-full">
      <div class="col-span-2">
        <simple-input v-model="name" label="Account Name" type="text" />
      </div>

      <div class="col-span-2">
        <simple-input v-model="balance" label="Account Balance" type="number" />
      </div>

      <div class="col-span-2">
        <simple-input
          v-model="logoUrl"
          label="Account Logo Url"
          type="text"
          class="col-span-2"
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
        button-title="Done"
        type="green"
        :is-loader-active="isAccountAdding"
        @click="addAccount"
      />
    </template>
  </modal>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, ref } from 'vue'
  import { useAccounts } from '../../composables/accounts'
  import { useUser } from '../../composables/user'

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
      userDefinedName: {
        type: String,
        default: '',
      },
    },
    emits: ['close-modal'],

    setup(props, { emit }) {
      const name = ref('')
      const balance = ref(null)
      const logoUrl = ref('')

      const { user } = useUser()
      const { isAccountAdding, addNewAccount } = useAccounts()

      async function addAccount() {
        await addNewAccount(user.value.id, {
          name: name.value,
          balance: balance.value,
          logoUrl: logoUrl.value,
        })

        emit('close-modal', true)
      }

      return {
        name,
        balance,
        logoUrl,

        isAccountAdding,
        addAccount,
      }
    },
  })
</script>
