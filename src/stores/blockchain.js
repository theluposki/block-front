// blockchain.js
import { ref } from "vue";
import { defineStore } from "pinia";
import { genesi } from "./genesis.js";
import MineWorker from "@/workers/mineWorker?worker";
import db from "@/database/db.js"; // Importa o Dexie configurado

export const useBlockChain = defineStore("blockchain", () => {
  // Estado inicial reativo
  const blockchain = ref([]);
  const DIFFICULTY = ref(2);
  const stop = ref(false);
  const currentHash = ref({});
  const workers = ref([]);
  const miningStartTime = ref(null);

  /**
   * Define a dificuldade do proof-of-work
   */
  const setDifficulty = (difficulty) => {
    DIFFICULTY.value = difficulty;
  };

  /**
   * Adiciona um novo bloco à blockchain e o persiste no IndexedDB via Dexie
   * @param {Object} block
   */
  const addBlock = async (block) => {
    blockchain.value.push(block);
    // Persiste o bloco na tabela 'blocks'
    await db.blocks.add(block);
  };

  /**
   * Carrega a blockchain do IndexedDB.
   * Se não houver blocos persistidos, inicializa com o bloco gênesis.
   */
  const loadBlockchainFromDb = async () => {
    const storedBlocks = await db.blocks.orderBy("index").toArray();
    if (storedBlocks && storedBlocks.length > 0) {
      blockchain.value = storedBlocks;
    } else {
      // Se não houver blocos, cria o bloco gênesis e o persiste
      const genesisBlock = genesi();
      blockchain.value = [genesisBlock];
      await db.blocks.add(genesisBlock);
    }
  };

  /**
   * Calcula o tempo decorrido da mineração (evita `setInterval`)
   */
  const getElapsedTime = () => {
    if (!miningStartTime.value) return "0s";
    const elapsedTime = Date.now() - miningStartTime.value;
    const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const milliseconds = elapsedTime % 1000;
    const timeParts = [];
    if (days > 0) timeParts.push(`${days}d`);
    if (hours > 0) timeParts.push(`${hours}h`);
    if (minutes > 0) timeParts.push(`${minutes}m`);
    if (seconds > 0) timeParts.push(`${seconds}s`);
    if (milliseconds > 0) timeParts.push(`${milliseconds}ms`);
    return timeParts.join(" ");
  };

  /**
   * Inicia a mineração utilizando múltiplos Web Workers.
   * O primeiro worker a encontrar um hash válido encerra a mineração
   * e os demais são terminados.
   */
  const MineMulti = () => {
    stop.value = false;
    currentHash.value = {};
    workers.value.forEach((w) => w.terminate());
    workers.value.length = 0;
    miningStartTime.value = Date.now();

    // Clona o último bloco (evita problemas de reatividade)
    const lastBlock = JSON.parse(JSON.stringify(blockchain.value.at(-1)));
    let found = false;
    const NUM_WORKERS = navigator.hardwareConcurrency || 4;
    console.log("hardwareConcurrency: ", navigator.hardwareConcurrency);

    for (let i = 0; i < NUM_WORKERS; i++) {
      const worker = new MineWorker();
      worker.postMessage({
        lastBlock,
        difficulty: DIFFICULTY.value,
        workerIndex: i,
        startNonce: i * 100000,
      });

      worker.onmessage = (event) => {
        if (event.data) {
          if (event.data.hash !== currentHash.value.hash) {
            currentHash.value = event.data;
          }
        }
        if (event.data.done && !found) {
          found = true;
          addBlock(event.data.newBlock);
          workers.value.forEach((w) => w.terminate());
          workers.value.length = 0;
        }
      };
      workers.value.push(worker);
    }
  };

  /**
   * Interrompe a mineração:
   * - Envia sinal de parada para os workers
   * - Termina os workers ativos
   */
  const StopMining = () => {
    stop.value = true;
    workers.value.forEach((w) => {
      w.postMessage("stop");
      w.terminate();
    });
    workers.value.length = 0;
  };

  // Carrega a blockchain persistida ao iniciar a store
  loadBlockchainFromDb();

  return {
    blockchain,
    MineMulti,
    StopMining,
    setDifficulty,
    stop,
    currentHash,
    getElapsedTime,
  };
});
