import { ref, computed } from "vue"
import { useBlockChain } from "@/stores/blockchain.js"
import { Block } from "./block.js"

const useBlockchain = useBlockChain()

const blockchain = computed(useBlockchain.blockchain)

