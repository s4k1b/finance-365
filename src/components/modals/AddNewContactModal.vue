<template>
  <modal size="sm" @close-modal="$emit('close-modal', true)">
    <template #modal-title>New Contact</template>
    <div class="grid grid-flow-row gap-4 grid-cols-2 w-full">
      <div class="col-span-2">
        <simple-input v-model="name" label="Contact Name" type="text" />
      </div>

      <div class="col-span-2">
        <simple-input v-model="email" label="Email Address" type="email" />
      </div>

      <regular-button
        button-title="Cancel"
        @click="$emit('close-modal', true)"
      />
      <regular-button
        button-title="Done"
        type="green"
        :is-loader-active="isContactAdding"
        @click="addContact"
      />
    </div>
  </modal>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, ref } from 'vue'
  import { useContacts } from '../../composables/contacts'
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
      const email = ref('')

      const { user } = useUser()
      const { isContactAdding, addNewContact } = useContacts()

      async function addContact() {
        await addNewContact(user.value.id, {
          name: name.value,
          email: email.value,
        })

        emit('close-modal', true)
      }

      return {
        name,
        email,

        isContactAdding,
        addContact,
      }
    },
  })
</script>
