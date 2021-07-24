<template>
  <div class="simple-dateinput-box">
    <datepicker
      v-model="picked"
      class="simple-dateinput"
      placeholder=" "
      @focusin="isFocused = true"
      @focusout="onFocusout"
    />
    <label
      class="simple-dateinput-label"
      :class="{ 'simple-dateinput-label-focused': isFocused }"
    >
      {{ label }}
    </label>
    <div
      class="simple-dateinput-underline"
      :class="{ 'simple-dateinput-underline-focused': isFocused }"
    />
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, ref, watch } from 'vue'

  export default defineComponent({
    components: {
      Datepicker: defineAsyncComponent(() => import('vue3-datepicker')),
    },
    props: {
      modelValue: {
        type: Object,
        default: new Date(),
      },
      label: {
        type: String,
        default: '',
      },
    },
    emits: ['update:modelValue'],

    setup(props, { emit }) {
      const picked = ref(props.modelValue)
      watch(picked, (n) => {
        emit('update:modelValue', n)
      })

      const isFocused = ref(picked.value ? true : false)

      function onFocusout() {
        if (!picked.value) isFocused.value = false
      }

      return {
        picked,
        isFocused,
        onFocusout,
      }
    },
  })
</script>

<style lang="scss">
  .simple-dateinput-box {
    @apply relative;
  }
  .simple-dateinput {
    @apply w-full px-2 bg-transparent text-base text-gray-500;
    outline: none;
    height: 40px;
  }
  .simple-dateinput-label {
    @apply absolute pointer-events-none block px-2 text-justify text-base text-gray-400;
    transform-origin: top left;
    transform: translate(0, -33px) scale(1);
    transition: color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  }
  .simple-dateinput-label-focus {
    @apply text-gray-600 font-medium;
    transform: translate(0, -45px) scale(0.9);
    transform-origin: top left;
  }
  .simple-dateinput-label-focused {
    @apply simple-dateinput-label-focus;
    transform: translate(0, -50px) scale(0.9);
    transform-origin: top left;
  }

  .simple-dateinput-underline {
    @apply border-b-2;
  }
  .simple-dateinput-underline:after {
    @apply absolute left-0 right-0 pointer-events-none border-b-2 border-green-500;
    bottom: -0.05rem;
    content: '';
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    transform: scaleX(0);
  }
  .simple-dateinput-underline-focused:after {
    transform: scaleX(1);
  }
</style>
