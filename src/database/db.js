// db.js
import Dexie from "dexie";

// Cria uma instância do banco de dados chamado 'blockchainDB'
export const db = new Dexie("blockchainDB");

// Define a versão do banco e a estrutura (stores) para a tabela 'blocks'
// A chave primária é um número auto-incrementado (++) e definimos índices para os campos que podem ser úteis para consultas.
db.version(1).stores({
  blocks: "++id, index, timestamp, nonce, hash, lastHash, data"
});

