import CryptoJS from "crypto-js";

let isMining = true;

self.onmessage = function (event) {
  if (event.data === "stop") {
    isMining = false;
    return;
  }

  const { lastBlock, difficulty, workerIndex, startNonce } = event.data;
  let nonce = startNonce || 0;
  let hash = "";
  let timestamp;

  const blockHash = (block) => CryptoJS.SHA256(JSON.stringify(block)).toString();

  while (isMining) {
    nonce++;
    timestamp = Date.now();
    const newBlock = {
      index: lastBlock.index + 1,
      timestamp,
      nonce,
      data: 1000, // Aqui você pode integrar dados de transações, por exemplo
      lastHash: lastBlock.hash,
    };

    hash = blockHash(newBlock);

    if(difficulty == 1) {
      self.postMessage({ hash, nonce, difficulty, workerIndex });
    }

    if(difficulty <= 3 && nonce % 50 === 0 ) {
      self.postMessage({ hash, nonce, difficulty, workerIndex });
    }
    // Envia cada hash gerado para a UI apenas se houver uma mudança significativa
    if (nonce % 5000 === 0) {
      self.postMessage({ hash, nonce, difficulty, workerIndex });
    }

    if (hash.startsWith("0".repeat(difficulty))) {
      self.postMessage({ newBlock: { ...newBlock, hash }, done: true, workerIndex });
      break;
    }
  }
};
