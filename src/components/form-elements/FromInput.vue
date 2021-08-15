<template>
  <label-element label="From" />
  <div
    class="
      account-select-box
      grid grid-flow-row
      auto-rows-max
      gap-4
      grid-cols-10
      justify-items-stretch
      mt-2
    "
  >
    <div
      v-for="(fromType, id) in fromTypes"
      :key="id"
      class="account-select-item"
      :class="[selectedFromType.value === fromType.value ? 'selected' : '']"
      :title="fromType.value"
      @click="selectedFromType = fromType"
    >
      <accounts-icon
        v-if="fromType.value === 'pa'"
        class="w-1/2 h-1/3 object-contain"
      />
      <contacts-icon
        v-else-if="fromType.value === 'fc'"
        class="w-1/2 h-1/3 object-contain"
      />
      <others-icon
        v-else-if="fromType.value === ''"
        class="w-1/2 h-1/3 object-contain"
      />
      <img
        v-else
        class="w-1/2 h-1/3 object-contain"
        :src="fromType.logoUrl"
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
        >{{ fromType.title }}</span
      >
      <div class="account-select-item-underline"></div>
    </div>
  </div>
  <div v-if="selectedFromType.value === ''" class="w-1/3 mb-6 mt-4">
    <simple-input
      v-model="fromValue"
      label="Where from?
    "
    />
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineAsyncComponent,
    defineComponent,
    ref,
    toRefs,
  } from 'vue'

  export default defineComponent({
    components: {
      LabelElement: defineAsyncComponent(() => import('./LabelElement.vue')),
      AccountsIcon: defineAsyncComponent(() =>
        import('@heroicons/vue/outline').then((obj) => obj.ColorSwatchIcon)
      ),
      ContactsIcon: defineAsyncComponent(() =>
        import('@heroicons/vue/outline').then((obj) => obj.UserGroupIcon)
      ),
      OthersIcon: defineAsyncComponent(() =>
        import('@heroicons/vue/outline').then(
          (obj) => obj.DotsCircleHorizontalIcon
        )
      ),
      SimpleInput: defineAsyncComponent(() => import('./Input.vue')),
    },
    props: {
      eventType: {
        type: String,
        default: '',
      },
      modelValue: {
        type: null,
        default: '',
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const { eventType, modelValue } = toRefs(props)

      const selectedFromType = ref({
        value: '',
      })
      const fromTypes = [
        {
          title: 'Personal Account',
          value: 'pa',
        },
        {
          title: 'Friends & Contacts',
          value: 'fc',
        },
        {
          title: 'Other',
          value: '',
        },
      ]

      const fromValue = computed({
        get() {
          return modelValue.value
        },
        set(n) {
          emit('update:modelValue', n)
        },
      })

      return { selectedFromType, fromValue, fromTypes }
    },
  })
</script>
