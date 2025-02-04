<script setup>
import { ref } from 'vue'
import { encryptValue, decryptValue } from '../utils/crypto.js'

const keyEnc = ref("")
const keyEncMessage = ref("")
const textEnc = ref("")
const encriptedText = ref("")

const keyDec = ref("")
const keyDecMessage = ref("")
const textDec = ref("")
const decriptedText = ref("")

const handleEnc = () => {
  try {
    encriptedText.value = encryptValue(textEnc.value, keyEnc.value)
  } catch (error) {
    console.log("Erro ao encriptar.")
  }
}

const handleDec = () => {
  try {
    decriptedText.value = decryptValue(textDec.value, keyDec.value)
  } catch (error) {
    console.log("Erro ao decriptar")
  }
}

let timeoutRef;

const setMessage = (message, ref) => {
  clearTimeout(timeoutRef);
  ref.value = message
  timeoutRef = setTimeout(() => ref.value = "", 2000)
}

const copyKeyEnc = async () => {
  try {
    await navigator.clipboard.writeText(keyEnc.value);
    setMessage("chave copiado!", keyEncMessage)
  } catch (err) {
    console.error("Erro ao copiar:", err);
  }
}

const copyKeyDec = async () => {
  try {
    await navigator.clipboard.writeText(keyDec.value);
    setMessage("chave copiado!", keyDecMessage)
  } catch (err) {
    console.error("Erro ao copiar:", err);
  }
}

const pasteKeyDec = async () => {
  try {
    keyDec.value = await navigator.clipboard.readText();
    setMessage("chave passada.", keyDecMessage)
  } catch (err) {
    console.error("Erro ao colar:", err);
  }
}

const pasteKeyEnc = async () => {
  try {
    keyEnc.value = await navigator.clipboard.readText();
    setMessage("chave passada.", keyEncMessage)
  } catch (err) {
    console.error("Erro ao colar:", err);
  }
}

const copyEncriptedText = async () => {
  try {
    await navigator.clipboard.writeText(encriptedText.value);
    alert("Texto copiado!");
  } catch (err) {
    console.error("Erro ao copiar:", err);
  }
}

const pasteTextEnc = async () => {
  try {
    textEnc.value = await navigator.clipboard.readText();
  } catch (err) {
    console.error("Erro ao colar:", err);
  }
}

const copyDecriptedText = async () => {
  try {
    await navigator.clipboard.writeText(decriptedText.value);
    alert("Texto copiado!");
  } catch (err) {
    console.error("Erro ao copiar:", err);
  }
}

const pasteTextDec = async () => {
  try {
    textDec.value = await navigator.clipboard.readText();
  } catch (err) {
    console.error("Erro ao colar:", err);
  }
}
</script>

<template>
  <div class="page">
    <div class="container">
      <fieldset>
        <legend>Encripted</legend>
        <div class="group">
          <input type="text" v-model="keyEnc" class="input" placeholder="chave">
          <button class="btn-group" @click="copyKeyEnc">
            <i class="ri-file-copy-2-line"></i>
          </button>
          <button class="btn-group" @click="pasteKeyEnc">
            <i class="ri-clipboard-line"></i>
          </button>
          <span>{{ keyEncMessage }}</span>
        </div>
        <div class="group">
          <textarea class="textarea textEnc" v-model="textEnc" placeholder="texto aqui"></textarea>
          <button class="btn-group" @click="pasteTextEnc">
            <i class="ri-clipboard-line"></i>
          </button>
        </div>
        <div class="group">
          <textarea class="textarea" v-model="encriptedText" placeholder="texto encriptado aqui"></textarea>
          <button class="btn-group" @click="copyEncriptedText">
            <i class="ri-file-copy-2-line"></i>
          </button>
        </div>
        <div class="group">
          <button class="btn" @click="handleEnc">criptografar</button>
        </div>
      </fieldset>

      <fieldset>
        <legend>Decripted</legend>
        <div class="group">
          <input type="text" v-model="keyDec" class="input" placeholder="chave">
          <button class="btn-group" @click="copyKeyDec">
            <i class="ri-file-copy-2-line"></i>
          </button>
          <button class="btn-group" @click="pasteKeyDec">
            <i class="ri-clipboard-line"></i>
          </button>
          <span>{{ keyDecMessage }}</span>
        </div>
        <div class="group">
          <textarea class="textarea" v-model="textDec" placeholder="texto encriptado aqui"></textarea>
          <button class="btn-group" @click="pasteTextDec">
            <i class="ri-clipboard-line"></i>
          </button>
        </div>
        <div class="group">
          <textarea class="textarea" v-model="decriptedText" placeholder="texto decifrado"></textarea>
          <button class="btn-group" @click="copyDecriptedText">
            <i class="ri-file-copy-2-line"></i>
          </button>
        </div>
        <div class="group">
          <button class="btn" @click="handleDec">decifrar</button>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: var(--p);
  padding: var(--p);
}

fieldset {
  display: flex;
  flex-direction: column;
  gap: var(--p);

  & legend {
    color: var(--p-4);
    font-weight: bold;
    padding: 0 var(--p);
  }
}

.textarea {
  position: relative;
  resize: none;
  padding: var(--p);
}

.group {
  display: flex;
  gap: 4px;

  & button {
    flex: 1;
  }

  & textarea {
    flex: 1;
  }

  & span {
    font-size: 10px;
    padding: 0 0 0 var(--p);
    align-self: center;
    color: var(--p-3);
    font-weight: bold;
  }
}

.btn-group {
  --w_btn-group: 30px;

  max-width: var(--w_btn-group);
}
</style>