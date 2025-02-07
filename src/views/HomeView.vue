<script setup>
import { ref } from 'vue'
import blockchain from '@/components/cripto/blockchain/blockchain.vue';
import encrypted from '@/components/cripto/encrypted/encrypted.vue';
import hashing from '@/components/hashing.vue';

const viewBlockChain = ref(false);
const viewEncrypted = ref(false)
const viewHashing = ref(true);

const setViewBlockfalsechain = () => {
  viewBlockChain.value = true
  viewEncrypted.value = false
  viewHashing.value = false
}

const setViewEncrypted = () => {
  viewBlockChain.value = false
  viewEncrypted.value = true
  viewHashing.value = false
}

const setViewHashing = () => {
  viewBlockChain.value = false
  viewEncrypted.value = false
  viewHashing.value = true
}
</script>
<template>
  <div class="page">
    Home
    <div class="wrapper_btns">
      <button class="btn" @click="setViewBlockfalsechain">BlockChain</button>
      <button class="btn" @click="setViewEncrypted">Encrypted</button>
      <button class="btn" @click="setViewHashing">Hashing</button>
    </div>
    <div class="container">
      <blockchain v-if="viewBlockChain" />
      <encrypted v-if="viewEncrypted" />
      <hashing v-if="viewHashing" />
    </div>
  </div>
</template>

<style scoped>

.wrapper_btns {
  display: flex;
  gap: var(--g);
  padding: var(--p);
}
</style>