<template>
  <div>
    <account-select v-model="cashInEvent.to" label="Credited to" />
    <from-input event-type="cash-in" />
  </div>
</template>

<script lang="ts">
  import { computed, defineAsyncComponent, defineComponent, toRefs } from 'vue'

  export default defineComponent({
    components: {
      // SimpleInput: defineAsyncComponent(
      //   () => import('../../form-elements/Input.vue')
      // ),
      AccountSelect: defineAsyncComponent(
        () => import('../../form-elements/AccountSelect.vue')
      ),
      FromInput: defineAsyncComponent(
        () => import('../../form-elements/FromInput.vue')
      ),
    },
    props: {
      modelValue: {
        type: Object,
        default: () => ({}),
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const { modelValue } = toRefs(props)
      const cashInEvent = computed({
        get() {
          return modelValue.value
        },
        set(n) {
          emit('update:modelValue', n)
        },
      })

      return { cashInEvent }
    },
  })
</script>
