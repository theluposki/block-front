import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { genesi } from "@/views/blockchain/genesis.js";
import CryptoJS from "crypto-js";

export const useBlockChain = defineStore("blockchain", () => {
  const blockchain = ref([genesi()]);
  const DIFFICULTY = ref(4);
  const hash = ref("");
  const nonce = ref(0);
  const stop = ref(false);

  const setDifficulty = (difficulty) => {
    console.log(difficulty);
    DIFFICULTY.value = difficulty;
  };

  const addBlock = (block) => {
    blockchain.value.push(block);
  };

  const blockHash = (block) => {
    const blockString = JSON.stringify(block);
    return CryptoJS.SHA256(blockString).toString();
  };

  const Block = (lastBlock, timestamp, data, nonce) => {
    console.log("lastBlock: ", lastBlock)

    const newBlock = {
      index: lastBlock.index + 1,
      timestamp,
      nonce,
      data,
      lastHash: lastBlock.hash,
    };

    return { ...newBlock };
  };

  const Mine = () => {
    stop.value = false;
    hash.value = null;
    nonce.value = 0;
    const lastBlock = blockchain.value[blockchain.value.length - 1];
    let newBlock;
    let timestamp;

    const mineBlock = () => {
      // Incrementa o nonce e tenta calcular o hash
      nonce.value++;
      timestamp = Date.now();
      newBlock = Block(lastBlock, timestamp, 1000, nonce.value);
      hash.value = blockHash(newBlock);

      console.log(hash.value);

      // Verifica se o hash encontrado tem a dificuldade desejada
      if (
        hash.value.substring(0, DIFFICULTY.value) ===
          "0".repeat(DIFFICULTY.value) &&
        !stop.value
      ) {
        addBlock({ ...newBlock, hash: hash.value }); // Adiciona o bloco à blockchain
        return;
      }

      // Caso o hash não seja válido ou o processo não tenha sido interrompido, continua a mineração
      if (!stop.value) {
        // Usando setTimeout para não bloquear a thread principal
        setTimeout(mineBlock, 0); // A próxima tentativa de mineração será feita no próximo ciclo de evento
      }
    };

    // Inicia a mineração
    mineBlock();
  };

  const isValidChain = (chain) => {
    const fistBlock = chain[0];
    const blockGenesi = genesi();

    if (JSON.stringify(fistBlock) !== JSON.stringify(blockGenesi)) return false;

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];

      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== blockHash(block)
      ) {
        return false;
      }
    }

    return true;
  };

  const replaceChain = (newChain) => {
    if (newChain.length <= blockchain.value.length) {
      console.log(
        "====> A nova corrente de blocos é menor que a corrente atual"
      );
      return;
    }

    if (!isValidChain(newChain)) {
      console.log("====> A nova corrente de blocos não é valida!");
      return;
    }
    console.log("====> A sua corrente de blocos foi atualizada!");
    blockchain.value = newChain;
  };

  return {
    blockchain,
    Mine,
    setDifficulty,
    currentHash: {
      difficulty: DIFFICULTY,
      hash,
      nonce,
    },
    stop,
  };
});
