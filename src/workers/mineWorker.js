import CryptoJS from "crypto-js";

self.onmessage = function (event) {
  const { lastBlock, difficulty } = event.data;
  let nonce = 0;
  let hash = "";
  let timestamp;

  const blockHash = (block) => CryptoJS.SHA256(JSON.stringify(block)).toString();

  while (true) {
    nonce++;
    timestamp = Date.now();
    const newBlock = {
      index: lastBlock.index + 1,
      timestamp,
      nonce,
      data: 1000,
      lastHash: lastBlock.hash,
    };

    hash = blockHash(newBlock);

    // Envia cada hash gerado para a UI
    self.postMessage({ hash, nonce, difficulty });

    if (hash.startsWith("0".repeat(difficulty))) {
      self.postMessage({ newBlock: { ...newBlock, hash }, done: true });
      break;
    }
  }
};
