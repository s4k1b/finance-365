<template>
  <div>
    <div class="w-1/3 mb-6">
      <simple-input
        v-model="salaryInEvent.forMonth"
        label="Salary for Month"
        type="month"
      />
    </div>
    <account-select v-model="salaryInEvent.to" label="Credited to" />
    <div class="w-1/3 mb-6">
      <simple-input
        v-model.number="salaryInEvent.amount"
        label="Credited Amount"
        type="number"
      />
    </div>
    <div class="w-1/3 mb-6">
      <simple-input v-model="salaryInEvent.from" label="From" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch, ref, defineAsyncComponent } from 'vue'

  export default defineComponent({
    components: {
      SimpleInput: defineAsyncComponent(
        () => import('../../form-elements/Input.vue')
      ),
      AccountSelect: defineAsyncComponent(
        () => import('../../form-elements/AccountSelect.vue')
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
      const salaryInEvent = ref(props.modelValue)
      watch(
        salaryInEvent,
        (n) => {
          emit('update:modelValue', n)
        },
        { deep: true }
      )

      return {
        salaryInEvent,
      }
    },
  })
</script>
