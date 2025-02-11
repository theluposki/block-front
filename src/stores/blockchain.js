import { ref } from "vue";
import { defineStore } from "pinia";
import { genesi } from "./genesis.js";
import MineWorker from "@/workers/mineWorker?worker"; // Importação correta no Vite

export const useBlockChain = defineStore("blockchain", () => {
  const blockchain = ref([genesi()]);
  const DIFFICULTY = ref(2);
  const stop = ref(false);
  const currentHash = ref({});
  const workers = ref([]); // Array para armazenar múltiplos workers

  // Variáveis para controle do tempo de mineração
  const miningStartTime = ref(null);
  const elapsedTime = ref(0);
  let timerInterval = null;

  const setDifficulty = (difficulty) => {
    DIFFICULTY.value = difficulty;
  };

  const addBlock = (block) => {
    blockchain.value.push(block);
  };

  /**
   * Inicia a mineração usando múltiplos Web Workers.
   * O primeiro worker a encontrar um hash válido "vence"
   * e os demais são terminados.
   */
  const MineMulti = () => {
    stop.value = false;
    currentHash.value = {};
    
    // Encerra quaisquer workers ativos
    workers.value.forEach((w) => w.terminate());
    workers.value = [];

    // Inicia a contagem do tempo
    miningStartTime.value = Date.now();
    elapsedTime.value = 0;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      elapsedTime.value = Date.now() - miningStartTime.value;
    }, 100);

    // Converte o último bloco para um objeto puro
    const lastBlock = JSON.parse(JSON.stringify(blockchain.value.at(-1)));
    let found = false;
    const NUM_WORKERS = 4; // Quantos workers você quer iniciar

    for (let i = 0; i < NUM_WORKERS; i++) {
      const worker = new MineWorker();
      worker.postMessage({ lastBlock, difficulty: DIFFICULTY.value, workerIndex: i });
      worker.onmessage = (event) => {
        if (event.data) {
          // Atualiza as informações na UI (ex.: hash atual, nonce e qual worker enviou)
          currentHash.value = event.data;
        }

        if (event.data.done && !found) {
          found = true;
          addBlock(event.data.newBlock);
          // Limpa o timer assim que o bloco é minerado
          clearInterval(timerInterval);
          timerInterval = null;
          // Encerra todos os workers
          workers.value.forEach((w) => w.terminate());
          workers.value = [];
        }
      };
      workers.value.push(worker);
    }
  };

  const StopMining = () => {
    stop.value = true;
    workers.value.forEach((w) => {
      w.postMessage("stop"); // Sinal para que o worker interrompa a mineração
      w.terminate();
    });
    workers.value = [];
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  };

  return {
    blockchain,
    MineMulti,
    StopMining,
    setDifficulty,
    stop,
    currentHash,
    elapsedTime, // Expondo o tempo decorrido
  };
});
