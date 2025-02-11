import { ref } from "vue";
import { defineStore } from "pinia";
import { genesi } from "./genesis.js";

// Importa o Worker corretamente no Vite
const WorkerUrl = new URL("@/workers/mineWorker.js", import.meta.url);

export const useBlockChain = defineStore("blockchain", () => {
  const blockchain = ref([genesi()]);
  const DIFFICULTY = ref(2);
  const miningWorker = ref(null);
  const stop = ref(false);
  const currentHash = ref({
    hash: "", 
    nonce: 0,
    difficulty: DIFFICULTY.value
  }); // Armazena os hashes em tempo real

  const setDifficulty = (difficulty) => {
    DIFFICULTY.value = difficulty;
  };

  const addBlock = (block) => {
    blockchain.value.push(block);
  };

  const Mine = () => {
    stop.value = false;
    currentHash.value = {}; // Limpa os hashes antes de começar

    if (miningWorker.value) {
      miningWorker.value.terminate();
    }

    miningWorker.value = new Worker(WorkerUrl, { type: "module" });

    const lastBlock = JSON.parse(JSON.stringify(blockchain.value.at(-1))); // Clona para um objeto puro
    miningWorker.value.postMessage({ lastBlock, difficulty: DIFFICULTY.value });

    miningWorker.value.onmessage = (event) => {
      if (event.data) {
        // Atualiza a lista de hashes com o mais recente
        currentHash.value = event.data;
      }

      if (event.data.done) {
        addBlock(event.data.newBlock);
        miningWorker.value.terminate();
        miningWorker.value = null;
      }
    };
  };

  return {
    blockchain,
    Mine,
    setDifficulty,
    stop,
    currentHash, // Expor para a UI
  };
});
