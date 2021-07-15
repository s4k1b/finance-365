<template>
  <img
    class="
      inline
      object-cover
      w-14
      h-14
      mr-2
      rounded-full
      animate__animated animate__zoomIn
    "
    :src="user.profilePicUrl"
    alt="Profile image"
  />
  <div class="flex flex-col justify-between w-full">
    <h2
      class="
        text-md
        font-medium
        text-gray-500
        animate__animated animate__fadeIn
      "
    >
      {{ user.name }}
    </h2>
    <div class="flex flex-row justify-start">
      <accounts-button
        :class="{ 'bg-blue-200': activeMode === 'accounts' }"
        @click="$emit('update:settingsMode', 'accounts')"
      />
      <contacts-button
        class="ml-1"
        :class="{ 'bg-blue-200': activeMode === 'contacts' }"
        @click="$emit('update:settingsMode', 'contacts')"
      />
      <logout-button class="ml-1" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'
  import { useUser } from '../../composables/user'

  export default defineComponent({
    components: {
      AccountsButton: defineAsyncComponent(
        () => import('../buttons/AccountsButton.vue')
      ),
      ContactsButton: defineAsyncComponent(
        () => import('../buttons/ContactsButton.vue')
      ),
      LogoutButton: defineAsyncComponent(
        () => import('../buttons/LogoutButton.vue')
      ),
    },
    props: {
      activeMode: {
        type: String,
        default: '',
      },
    },
    emits: ['update:settingsMode'],
    setup() {
      const { user } = useUser()

      return {
        user,
      }
    },
  })
</script>
