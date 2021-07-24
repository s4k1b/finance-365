<template>
  <div class="account-select-box">
    <label
      class="
        text-gray-600
        font-medium
        pointer-events-none
        px-2
        text-justify text-base
      "
    >
      {{ label }}
    </label>
    <div
      class="grid grid-flow-col gap-4 grid-cols-10 justify-items-stretch mt-2"
    >
      <div
        v-for="(account, id) in accounts"
        :key="id"
        class="account-select-item"
        :class="[selectedAccount === id ? 'selected' : '']"
        :title="account.name"
        @click="selectedAccount = id"
      >
        <img
          class="w-1/2 h-1/3"
          :src="account.logoUrl"
          onerror="this.src='http:///i.imgur.com/hfM1J8s.png'"
          alt=""
        />
        <span
          class="
            text-gray-600
            w-full
            font-medium
            text-xs
            mt-4
            px-1
            text-center
            truncate
            ...
          "
          >{{ account.name }}</span
        >
        <div class="account-select-item-underline"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import { useStore } from '../../store'
  import { useAccounts } from '../../composables/accounts'

  export default defineComponent({
    props: {
      modelValue: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: 'Account Select',
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const store = useStore()
      const { accounts } = useAccounts(store)

      const selectedAccount = ref(props.modelValue)
      watch(selectedAccount, (n) => {
        emit('update:modelValue', n)
      })

      return {
        accounts,
        selectedAccount,
      }
    },
  })
</script>

<style lang="scss">
  .account-select-box {
    @apply relative cursor-pointer;
  }
  .account-select-item {
    @apply flex flex-col h-24 rounded-md bg-gray-100 items-center pt-6 relative transition-all;
  }
  .account-select-item-underline {
    @apply border-b-2;
  }
  .account-select-item-underline:after {
    @apply absolute left-0 right-0 bottom-0 pointer-events-none border-b-2 border-green-500;
    bottom: -0.05rem;
    content: '';
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    transform: scaleX(0);
  }
  .account-select-item:hover .account-select-item-underline:after {
    transform: scaleX(1);
  }

  .account-select-item.selected {
    @apply bg-gray-200 shadow-lg;
    .account-select-item-underline:after {
      transform: scaleX(1);
    }
  }
</style>
