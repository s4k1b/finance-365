<template>
  <div class="flex flex-col justify-between h-full">
    <span
      class="
        h-16
        p-3
        text-center text-3xl
        antialiased
        font-bold
        cursor-pointer
        text-gray-400
      "
    >
      Finance 365
    </span>
    <div
      class="flex flex-col h-full mt-0.5"
      :class="{ 'justify-center': !isLoggedIn }"
    >
      <user />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'
  import { useUser } from '../../composables/user'

  export default defineComponent({
    components: {
      User: defineAsyncComponent(() => import('../user/User.vue')),
    },
    setup() {
      const { isLoggedIn } = useUser()
      return {
        isLoggedIn,
      }
    },
  })
</script>
