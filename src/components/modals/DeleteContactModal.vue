<template>
  <modal size="sm" @close-modal="$emit('close-modal', true)">
    <template #modal-title>Delete Contact</template>
    <div class="grid grid-flow-row gap-4 grid-cols-2 w-full">
      <span class="col-span-2 text-center"
        >Do you want to delete the contact <br />
        <strong>{{ contactName }}</strong>
        ?
      </span>
    </div>
    <template #modal-footer-left-controls>
      <regular-button
        button-title="Cancel"
        @click="$emit('close-modal', true)"
      />
    </template>
    <template #modal-footer-right-controls>
      <regular-button
        button-title="Delete"
        type="red"
        :is-loader-active="isContactDeleting"
        @click="deleteUserContact"
      />
    </template>
  </modal>
</template>

<script lang="ts">
  import { computed, defineAsyncComponent, defineComponent } from 'vue'
  import { useContacts } from '../../composables/contacts'
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
      contactIndex: {
        type: Number as number,
        default: null,
      },
    },
    emits: ['close-modal'],

    setup(props, { emit }) {
      const { user } = useUser()
      const store = useStore()
      const { isContactDeleting, deleteContact, contacts } = useContacts(store)

      const contactName = computed(
        () => contacts.value[props.contactIndex].name
      )

      async function deleteUserContact() {
        await deleteContact(user.value.id, props.contactIndex)

        emit('close-modal', true)
      }

      return {
        isContactDeleting,
        deleteUserContact,
        contactName,
      }
    },
  })
</script>
