<template>
  <modal size="sm" @close-modal="$emit('close-modal', true)">
    <template #modal-title>Edit Contact</template>
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
        button-title="Update"
        type="green"
        :is-loader-active="isContactUpdating"
        @click="updateUserContact"
      />
    </div>
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
  import { useContacts } from '../../composables/contacts'
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
      contactIndex: {
        type: Number as number,
        default: null,
      },
    },
    emits: ['close-modal'],

    setup(props, { emit }) {
      const store = useStore()
      const { contacts, isContactUpdating, updateContact } = useContacts(store)

      const contact = computed(() => contacts.value[props.contactIndex])

      const name = ref('')
      const email = ref('')

      watch(
        contact,
        (n) => {
          name.value = n?.name
          email.value = n?.email
        },
        { immediate: true }
      )

      const { user } = useUser()

      async function updateUserContact() {
        await updateContact(user.value.id, props.contactIndex, {
          name: name.value,
          email: email.value,
        })

        emit('close-modal', true)
      }

      return {
        name,
        email,

        isContactUpdating,
        updateUserContact,
      }
    },
  })
</script>
