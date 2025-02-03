<script setup>
import { ref } from 'vue'   
import { encryptValue, decryptValue } from '../utils/crypto.js'

const key = ref("")
const text = ref("lucas")
const encText = ref("")

const handleEnc = () => {
  encText.value = encryptValue(encText.value)
}
</script>

<template>
  <div class="page">
    <div class="container">
      <fieldset>
        <legend>Encripted</legend>
        <input type="text" class="input" placeholder="chave">
        <textarea class="textarea" v-model="text" placeholder="texto aqui"></textarea>
        <textarea class="textarea" v-model="encText" placeholder="texto encriptado aqui"></textarea>
        <button class="btn" @click="handleEnc">Enc</button>
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
}

.textarea {
  resize: none;
  padding: var(--p);
}
</style>