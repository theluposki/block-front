import { ref } from "vue";
import { defineStore } from "pinia";
import { genesi } from "./genesis.js";
import MineWorker from "@/workers/mineWorker?worker";

export const useBlockChain = defineStore("blockchain", () => {
  const blockchain = ref([genesi()]);
  const DIFFICULTY = ref(2);
  const miningWorker = ref(null);
  const stop = ref(false);
  const currentHash = ref({
    hash: "", 
    nonce: 0,
    difficulty: DIFFICULTY.value,
  });

  const setDifficulty = (difficulty) => {
    DIFFICULTY.value = difficulty;
  };

  const addBlock = (block) => {
    blockchain.value.push(block);
  };

  const Mine = () => {
    stop.value = false;
    currentHash.value = {}; 

    if (miningWorker.value) {
      miningWorker.value.terminate();
    }

    miningWorker.value = new MineWorker();

    const lastBlock = JSON.parse(JSON.stringify(blockchain.value.at(-1)));
    miningWorker.value.postMessage({ lastBlock, difficulty: DIFFICULTY.value });

    miningWorker.value.onmessage = (event) => {
      if (event.data) {
        currentHash.value = event.data;
      }

      if (event.data.done) {
        addBlock(event.data.newBlock);
        miningWorker.value.terminate();
        miningWorker.value = null;
      }
    };
  };

  const StopMining = () => {
    stop.value = true;
    if (miningWorker.value) {
      miningWorker.value.postMessage("stop"); // Envia o sinal de parada para o Worker
      miningWorker.value.terminate();
      miningWorker.value = null;
    }
  };

  return {
    blockchain,
    Mine,
    StopMining, // Adicionando a função de parar a mineração
    setDifficulty,
    stop,
    currentHash,
  };
});
