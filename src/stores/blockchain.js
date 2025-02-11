import { ref } from "vue";
import { defineStore } from "pinia";
import { genesi } from "./genesis.js";
import MineWorker from "@/workers/mineWorker?worker"; // Importação correta no Vite

export const useBlockChain = defineStore("blockchain", () => {
  const blockchain = ref([genesi()]);
  const DIFFICULTY = ref(2);
  const stop = ref(false);
  const currentHash = ref({}); // Exibe o hash e informações em tempo real
  const workers = ref([]); // Array para armazenar múltiplos workers

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

    // Termina qualquer worker ativo antes de iniciar uma nova mineração
    workers.value.forEach((w) => w.terminate());
    workers.value = [];

    // Converte o último bloco para um objeto puro
    const lastBlock = JSON.parse(JSON.stringify(blockchain.value.at(-1)));
    let found = false;
    const NUM_WORKERS = 4; // Quantos workers você quer iniciar

    for (let i = 0; i < NUM_WORKERS; i++) {
      const worker = new MineWorker();
      worker.postMessage({ lastBlock, difficulty: DIFFICULTY.value, workerIndex: i });
      worker.onmessage = (event) => {
        if (event.data) {
          // Atualiza a UI com o último hash gerado (pode incluir workerIndex para depuração)
          currentHash.value = event.data;
        }

        if (event.data.done && !found) {
          found = true;
          addBlock(event.data.newBlock);
          // Termina todos os workers
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
  };

  return {
    blockchain,
    MineMulti,
    StopMining,
    setDifficulty,
    stop,
    currentHash,
  };
});
