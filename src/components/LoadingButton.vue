<template>
  <button @click="onClick" :disabled="loading || disabled" class="button">
    <span v-if="loading" class="spinner"></span>
    <slot v-if="!loading"></slot>
    <span v-else>Carregando...</span>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

function onClick(event) {
  emit('click', event);
}
</script>

<style>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em 1em;
  border: 1px solid #ccc;
  background-color: var(--p-3);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
}

.button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 12px;
  height: 12px;
  border: 2px solid transparent;
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>