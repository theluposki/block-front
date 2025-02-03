import CryptoJS from 'crypto-js';

function generateHash (data) {
  return CryptoJS.SHA256(data).toString();
};

function encryptValue(value, key) {
  const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), generateHash(key)).toString();
  return encryptedValue;
}

function decryptValue(encryptedValue, key) {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedValue, generateHash(key));
  const decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedValue);
}

export { encryptValue, decryptValue }