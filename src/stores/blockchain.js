import { ref } from "vue";
import { defineStore } from "pinia";
import { genesi } from "./genesis.js";
import MineWorker from "@/workers/mineWorker?worker"; // Importação do Worker via Vite

export const useBlockChain = defineStore("blockchain", () => {
  // Blockchain inicia com o bloco gênesis
  const blockchain = ref([genesi()]);
  // Dificuldade para o proof-of-work
  const DIFFICULTY = ref(2);
  // Flag para parar a mineração (caso necessário)
  const stop = ref(false);
  // Armazena o status do hash e outras informações enviadas pelos workers
  const currentHash = ref({});
  // Array para armazenar os workers ativos (mineração paralela)
  const workers = ref([]);

  // Variáveis para controle do tempo de mineração
  const miningStartTime = ref(null);
  const elapsedTime = ref(0);
  let timerInterval = null;

  /**
   * Altera o nível de dificuldade
   * @param {number} difficulty
   */
  const setDifficulty = (difficulty) => {
    DIFFICULTY.value = difficulty;
  };

  /**
   * Adiciona um novo bloco à blockchain
   * @param {Object} block
   */
  const addBlock = (block) => {
    blockchain.value.push(block);
  };

  /**
   * Inicia a mineração utilizando múltiplos Web Workers.
   * O primeiro worker a encontrar um hash válido encerra a mineração
   * e os demais são terminados.
   */
  const MineMulti = () => {
    stop.value = false;
    currentHash.value = {};

    // Encerra quaisquer workers ativos antes de iniciar uma nova mineração
    workers.value.forEach((w) => w.terminate());
    workers.value = [];

    // Inicia a contagem do tempo
    miningStartTime.value = Date.now();
    elapsedTime.value = 0;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      elapsedTime.value = Date.now() - miningStartTime.value;
    }, 100);

    // Converte o último bloco para um objeto puro (evita problemas com reatividade)
    const lastBlock = JSON.parse(JSON.stringify(blockchain.value.at(-1)));
    let found = false;
    const NUM_WORKERS = 4; // Número de workers paralelos

    // Inicia cada worker com os parâmetros necessários
    for (let i = 0; i < NUM_WORKERS; i++) {
      const worker = new MineWorker();
      worker.postMessage({
        lastBlock,
        difficulty: DIFFICULTY.value,
        workerIndex: i,
      });
      worker.onmessage = (event) => {
        if (event.data) {
          // Atualiza o status (hash, nonce, etc.) para exibição em tempo real
          currentHash.value = event.data;
        }
        // Se o worker encontrar um hash válido e a mineração ainda não tiver sido finalizada
        if (event.data.done && !found) {
          found = true;
          addBlock(event.data.newBlock);
          // Encerra o timer
          clearInterval(timerInterval);
          timerInterval = null;
          // Termina todos os workers
          workers.value.forEach((w) => w.terminate());
          workers.value = [];
        }
      };
      workers.value.push(worker);
    }
  };

  /**
   * Interrompe a mineração:
   * - Envia sinal de parada para os workers (caso implementado)
   * - Termina os workers ativos
   * - Limpa o timer de tempo decorrido
   */
  const StopMining = () => {
    stop.value = true;
    workers.value.forEach((w) => {
      w.postMessage("stop");
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
    elapsedTime, // Tempo decorrido em milissegundos (para uso na UI)
  };
});
