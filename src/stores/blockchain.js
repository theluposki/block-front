import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { genesi } from '@/views/blockchain/genesis.js'
import CryptoJS from 'crypto-js';

export const useBlockChain = defineStore('blockchain', () => {
  const blockchain = ref([genesi()])

    const addBlock = (block) => {
        blockchain.value.push(block)
    }

    const Block = (lastBlock, data) => {

      const newBlock = {
        index: lastBlock.index + 1,
        timestamp: Date.now(),
        data,
        lastHash: lastBlock.hash,
      }
    
      const newHash = CryptoJS.SHA256(JSON.stringify(newBlock)).toString()
    
      return { ...newBlock, hash: newHash}
    }

    const Mine = () => {
      const lastBlock = blockchain.value[blockchain.value.length -1]
    
      const newBlock = Block(lastBlock, 1000)
    
      addBlock(newBlock)
  }

  return { blockchain, addBlock, Mine }
})

