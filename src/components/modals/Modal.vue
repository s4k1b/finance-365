<template>
  <teleport to="body">
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="show"
        ref="modal-backdrop"
        class="fixed z-50 inset-0 overflow-y-auto bg-black bg-opacity-30"
      >
        <div class="flex items-center justify-center min-h-screen text-center">
          <transition
            enter-active-class="transition ease-out duration-300 transform "
            enter-from-class="opacity-0 -translate-x-10 scale-95"
            enter-to-class="opacity-100 translate-x-0 scale-100"
            leave-active-class="transition ease-in duration-200 transform"
            leave-from-class="opacity-100 translate-x-0 scale-100"
            leave-to-class="opacity-0 translate-x-10 scale-95"
          >
            <div
              v-show="show"
              ref="modal"
              class="bg-white rounded-sm text-left shadow-2xl"
              :class="`modal-${size}`"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal"
            >
              <div
                class="sticky flex flex-row justify-between border-b px-4 py-2"
              >
                <h1 class="align-middle text-left text-lg font-semibold">
                  <slot name="modal-title" />
                </h1>
                <div>
                  <button class="w-6 h-6 align-middle">
                    <x-icon @click="$emit('close-modal', true)" />
                  </button>

                  <slot name="modal-buttons" />
                </div>
              </div>

              <div class="relative px-4 py-8 transition">
                <slot />
              </div>

              <div class="bottom-0 border-t px-4 py-2">
                <div class="flex flex-row justify-between align-middle">
                  <div class="flex flex-row w-1/2 pr-2">
                    <slot name="modal-footer-left-controls" />
                  </div>
                  <div class="flex flex-row w-1/2 pl-2">
                    <slot name="modal-footer-right-controls" />
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent } from 'vue'

  export default defineComponent({
    components: {
      XIcon: defineAsyncComponent(() =>
        import('@heroicons/vue/outline').then((obj) => obj.XIcon)
      ),
    },
    props: {
      show: {
        type: Boolean,
        default: false,
      },
      size: {
        type: String,
        default: 'sm',
      },
    },
    emits: ['close-modal'],
  })
</script>

<style lang="scss" scoped>
  .modal-sm {
    @apply w-80;
  }
  .modal-lg {
    @apply w-4/6;
  }
  .modal-xl {
    @apply w-4/5;
  }
</style>
