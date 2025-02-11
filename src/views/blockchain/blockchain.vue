<script setup>
import { ref, computed } from 'vue'
import JsonViewer from '@/components/JsonViewer.vue';
import { useBlockChain } from '@/stores/blockchain';

const uBlockchain = useBlockChain();
const difficulty = ref(2)

const blockchain = computed(() => uBlockchain.blockchain)
const currentHash = computed(() => uBlockchain.currentHash)

const setDiff = () => {
  uBlockchain.setDifficulty(difficulty.value)
}

</script>

<template>
  <div class="page-int">
    <div class="container">
      <h3 class="title green">Blockchain</h3> 

      <p class="red">proof of work</p>
      <JsonViewer :json-text="currentHash" />
      <p class="green">Nível de dificuldade</p>
      <input type="number" v-model="difficulty" class="input" @keyup="setDiff" placeholder="dificuldade" min="0"
        max="10">
      <div class="group-btns">
        <button class="btn" @click="uBlockchain.Mine">Mine</button>
        <button class="btn" @click="uBlockchain.stop = true">Stop</button>
      </div>
      <JsonViewer :json-text="blockchain[blockchain.length - 1]" />
    </div>
  </div>
</template>

<style>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--p) 0;
}

.container {
  display: flex;
  flex-direction: column;
  gap: var(--g);
  padding: 0 var(--p);
}

.group-btns {
  display: flex;
  align-items: center;
  gap: var(--g);

  & button {
    flex: 1;
  }
}

.red {
  color: var(--p-4);
}

.green {
  color: var(--p-3);
}
</style>
