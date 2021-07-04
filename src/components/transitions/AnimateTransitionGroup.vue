<template>
  <transition-group
    :enter-active-class="`animate__animated animate__${animationEnter}`"
    :leave-active-class="`animate__animated animate__${animationLeave}`"
  >
    <slot />
  </transition-group>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      animationEnter: {
        type: String,
        default: '',
      },
      animationLeave: {
        type: String,
        default: '',
      },
    },
  })
</script>
