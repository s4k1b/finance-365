<template>
  <div>
    <div class="w-1/3 mb-6">
      <date-input v-model="eventDate" label="Event date" />
    </div>
    <event-select v-model="eventType" />
  </div>
</template>

<script lang="ts">
  import { defineAsyncComponent, defineComponent, ref, watch } from 'vue'

  export default defineComponent({
    components: {
      DateInput: defineAsyncComponent(
        () => import('../../form-elements/DateInput.vue')
      ),
      EventSelect: defineAsyncComponent(
        () => import('../../form-elements/EventSelect.vue')
      ),
    },
    props: {
      type: {
        type: String,
        default: '',
      },
      occuringDate: {
        type: String,
        default: '',
      },
    },
    emits: ['update:occuringDate', 'update:type'],
    setup(props, { emit }) {
      const eventDate = ref(new Date(props.occuringDate || undefined))
      watch(eventDate, (n) => {
        emit('update:occuringDate', n.toLocaleDateString('fr-CA'))
      })
      const eventType = ref(props.type)
      watch(eventType, (n) => {
        emit('update:type', n)
      })
      return {
        eventDate,
        eventType,
      }
    },
  })
</script>
