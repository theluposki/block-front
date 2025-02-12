import { ref } from "vue";
import { defineStore } from "pinia";
import { genesi } from "./genesis.js";
import MineWorker from "@/workers/mineWorker?worker"; // Importação do Worker via Vite

export const useBlockChain = defineStore("blockchain", () => {
  // Blockchain inicia com o bloco gênesis
  const blockchain = ref([genesi()]);
  // Dificuldade para o proof-of-work
  const DIFFICULTY = ref(2);
  // Flag para parar a mineração
  const stop = ref(false);
  // Armazena o status do hash e outras informações enviadas pelos workers
  const currentHash = ref({});
  // Array para armazenar os workers ativos
  const workers = ref([]);

  // Variáveis para controle do tempo de mineração
  const miningStartTime = ref(null);

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
   * Calcula o tempo decorrido da mineração (evita `setInterval`)
   */
  const getElapsedTime = () => {
    if (!miningStartTime.value) return "0s"; // Caso não tenha iniciado a mineração
  
    const elapsedTime = Date.now() - miningStartTime.value;
  
    const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const milliseconds = elapsedTime % 1000;
  
    // Montando a string de tempo formatada
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

    // Encerra quaisquer workers ativos antes de iniciar uma nova mineração
    workers.value.forEach((w) => w.terminate());
    workers.value.length = 0;

    // Inicia a contagem do tempo
    miningStartTime.value = Date.now();

    // Converte o último bloco para um objeto puro (evita problemas com reatividade)
    const lastBlock = JSON.parse(JSON.stringify(blockchain.value.at(-1)));
    let found = false;
    const NUM_WORKERS = navigator.hardwareConcurrency || 4

    console.log('hardwareConcurrency: ', navigator.hardwareConcurrency)

    // Inicia cada worker com um nonce inicial diferente
    for (let i = 0; i < NUM_WORKERS; i++) {
      const worker = new MineWorker();
      worker.postMessage({
        lastBlock,
        difficulty: DIFFICULTY.value,
        workerIndex: i,
        startNonce: i * 100000, // Cada worker começa em um nonce diferente
      });

      worker.onmessage = (event) => {
        if (event.data) {
          // Atualiza o status do hash apenas se houver mudança significativa
          if (event.data.hash !== currentHash.value.hash) {
            currentHash.value = event.data;
          }
        }

        // Se o worker encontrar um hash válido e a mineração ainda não tiver sido finalizada
        if (event.data.done && !found) {
          found = true;
          addBlock(event.data.newBlock);

          // Termina todos os workers imediatamente
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

  return {
    blockchain,
    MineMulti,
    StopMining,
    setDifficulty,
    stop,
    currentHash,
    getElapsedTime, // Agora a UI pode chamar diretamente
  };
});
