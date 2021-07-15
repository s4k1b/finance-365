<template>
  <div class="mt-2">
    <list
      header="Manage Contacts"
      @click:add-new-button="showAddNewContactModal = true"
    >
      <list-item v-for="(contact, id) in contacts" :key="id">
        <div class="flex flex-row bg-gray-200 rounded-md p-2 items-center">
          <img
            class="inline object-contain w-8 h-8 mr-2"
            :src="contact.profilePicUrl || ''"
            onerror="this.src='http://i.imgur.com/hfM1J8s.png'"
            alt="Profile image"
          />
          <div class="flex flex-col justify-between w-full">
            <h2 class="text-sm font-medium text-gray-500">
              {{ contact.name }}
            </h2>
            <span class="flex flex-row justify-start">
              <span class="text-xs font-semibold">
                {{ contact.email || '-' }}
              </span>
            </span>
          </div>
          <div class="flex flex-row px-2">
            <contact-edit-button :index="id" />
            <contact-delete-button :index="id" />
          </div>
        </div>
      </list-item>
    </list>
    <add-new-contact-modal
      :show="showAddNewContactModal"
      @close-modal="showAddNewContactModal = false"
    />
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, ref } from 'vue'
  import { useStore } from '../../store'
  import { useContacts } from '../../composables/contacts'

  export default defineComponent({
    components: {
      List: defineAsyncComponent(() => import('../list/List.vue')),
      ListItem: defineAsyncComponent(() => import('../list/ListItem.vue')),
      ContactDeleteButton: defineAsyncComponent(
        () => import('../buttons/ContactDeleteButton.vue')
      ),
      ContactEditButton: defineAsyncComponent(
        () => import('../buttons/ContactEditButton.vue')
      ),
      AddNewContactModal: defineAsyncComponent(
        () => import('../modals/AddNewContactModal.vue')
      ),
    },

    setup() {
      const showAddNewContactModal = ref(false)

      const store = useStore()
      const { contacts } = useContacts(store)

      return {
        contacts,
        showAddNewContactModal,
      }
    },
  })
</script>
