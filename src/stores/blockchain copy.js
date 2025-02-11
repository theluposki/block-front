import { ref } from "vue";
import { defineStore } from "pinia";
import { genesi } from "./genesis.js";
import CryptoJS from "crypto-js";

export const useBlockChain = defineStore("blockchain", () => {
  const blockchain = ref([genesi()]);
  const DIFFICULTY = ref(4);
  const hash = ref("");
  const nonce = ref(0);
  const stop = ref(false);

  const setDifficulty = (difficulty) => {
    DIFFICULTY.value = difficulty;
  };

  const addBlock = (block) => {
    blockchain.value.push(block);
  };

  const blockHash = (block) => {
    return CryptoJS.SHA256(JSON.stringify(block)).toString();
  };

  const createBlock = (lastBlock, data, nonce) => {
    return {
      index: lastBlock.index + 1,
      timestamp: Date.now(),
      nonce,
      data,
      lastHash: lastBlock.hash,
    };
  };

  const Mine = () => {
    stop.value = false;
    hash.value = "";
    nonce.value = 0;

    const lastBlock = blockchain.value.at(-1);

    const mineBlock = () => {
      if (stop.value) return;

      nonce.value++;
      const newBlock = createBlock(lastBlock, 1000, nonce.value);
      const newHash = blockHash(newBlock);

      hash.value = newHash

      if (newHash.startsWith("0".repeat(DIFFICULTY.value))) {
        addBlock({ ...newBlock, hash: newHash });
        return;
      }

      requestIdleCallback(mineBlock);
    };

    mineBlock();
  };

  const isValidChain = (chain) => {
    const firstBlock = chain[0];
    if (JSON.stringify(firstBlock) !== JSON.stringify(genesi())) return false;

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];

      if (block.lastHash !== lastBlock.hash || block.hash !== blockHash(block)) {
        return false;
      }
    }
    return true;
  };

  const replaceChain = (newChain) => {
    if (newChain.length <= blockchain.value.length) {
      console.warn("A nova corrente de blocos é menor que a atual.");
      return;
    }

    if (!isValidChain(newChain)) {
      console.warn("A nova corrente de blocos não é válida!");
      return;
    }

    console.info("A corrente de blocos foi atualizada!");
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
