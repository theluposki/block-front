<script setup>
import { ref } from 'vue'
import CryptoJS from 'crypto-js';
import JsonViewer from '@/components/JsonViewer.vue';

const genesi = () => {
  return {
    index: 1,
    hash: '0000',
    timestamp: Date.now(),
    data: {},
    lastHash: '0000',
  }
}

const block_chain = ref([genesi()])

const Block = (lastBlock, data) => {

  console.log(lastBlock)
  const newBlock = {
    index: lastBlock.index + 1,
    timestamp: Date.now(),
    data,
    lastHash: lastBlock.hash,
  }

  const newHash = CryptoJS.SHA256(JSON.stringify(newBlock)).toString()

  return { ...newBlock, hash: newHash}
}


const Mine = () => {
  const lastBlock = block_chain.value[block_chain.value.length -1]

  const newBlock = Block(lastBlock, 1000)

  block_chain.value.push(newBlock)
}
</script>

<template>
  <div class="about page">
    <div class="container">
      blockchain
      <button class="btn" @click="Mine">Mine</button>
      <JsonViewer :json-text="block_chain" />
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
