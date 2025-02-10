<script setup>
import { ref, computed } from 'vue'
import JsonViewer from '@/components/JsonViewer.vue';
import { useBlockChain } from '@/stores/blockchain';

const uBlockchain = useBlockChain();
// -

const blockchain = computed(() => uBlockchain.blockchain)

</script>

<template>
  <div class="page-int">
    <div class="container">
      <h3>blockchain</h3>
      <button class="btn" @click="uBlockchain.Mine">Mine</button>
      <JsonViewer :json-text="blockchain" />
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: var(--g);
  padding: 0 var(--p);
}
</style>
