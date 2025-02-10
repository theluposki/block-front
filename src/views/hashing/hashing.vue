<script setup>
import { ref } from 'vue'
import CryptoJS from 'crypto-js';

const text = ref("");
const key = ref("sua chave aqui...");
const vKey = ref(false);
const type = ref("MD5")
const hash = ref(null);
const len = ref(null);
const explanation = ref({
  type: "MD5",
  bits: "128",
  char: "32",
  key: false
})

const explic = {
  "MD5": {
    type: "MD5",
    bits: "128",
    char: "32",
    key: false
  },
  "sha1": {
    type: "SHA1",
    bits: "160",
    char: "40"
  },
  "sha224": {
    type: "SHA224",
    bits: "224",
    char: "56",
    key: false
  },
  "sha256": {
    type: "SHA256",
    bits: "256",
    char: "64"
  },
  "sha384": {
    type: "SHA384",
    bits: "384",
    char: "96",
    key: false
  },
  "sha512": {
    type: "SHA512",
    bits: "512",
    char: "128",
    key: false
  },
  "HmacSHA256": {
    type: "HmacSHA256",
    bits: "256",
    char: "64",
    key: true
  },
  "HmacSHA512": {
    type: "HmacSHA512",
    bits: "512",
    char: "128",
    key: true
  },
}

const generatedHashing = () => {
  let hashing;

  if (type.value === "PBKDF2") {
    hashing = CryptoJS.PBKDF2(text.value)
    explanation.value = explic["MD5"];
  }

  if (type.value === "MD5") {
    vKey.value = false
    hashing = CryptoJS.MD5(text.value)
    explanation.value = explic["MD5"];
  }

  if (type.value === "SHA1") {
    vKey.value = false
    hashing = CryptoJS.SHA1(text.value)
    explanation.value = explic["sha1"];
  }

  if (type.value === "SHA224") {
    vKey.value = false
    hashing = CryptoJS.SHA224(text.value)
    explanation.value = explic["sha224"];
  }

  if (type.value === "SHA256") {
    vKey.value = false
    hashing = CryptoJS.SHA256(text.value)
    explanation.value = explic["sha256"];
  }

  if (type.value === "SHA384") {
    vKey.value = false
    hashing = CryptoJS.SHA384(text.value)
    explanation.value = explic["sha384"];
  }

  if (type.value === "SHA512") {
    vKey.value = false
    hashing = CryptoJS.SHA512(text.value)
    explanation.value = explic["sha512"];
  }

  if (type.value === "HmacSHA256") {
    vKey.value = true
    hashing = CryptoJS.HmacSHA256(text.value, key.value)
    explanation.value = explic["HmacSHA256"];
  }

  if (type.value === "HmacSHA512") {
    vKey.value = true
    hashing = CryptoJS.HmacSHA512(text.value, key.value)
    explanation.value = explic["HmacSHA512"];
  }


  hash.value = hashing
  len.value = hash?.value?.toString().length
}

const select = (typ) => {
  type.value = typ
  generatedHashing()
}



</script>

<template>
  <div class="page-int">
    <main class="container">
    <div class="controlers">
      <button @click="select('MD5')" :class="type === 'MD5' ? 'btn btn-active':'btn' ">MD5</button>
      <button @click="select('SHA1')" :class="type === 'SHA1' ? 'btn btn-active':'btn' ">SHA1</button>
      <button @click="select('SHA224')" :class="type === 'SHA224' ? 'btn btn-active':'btn' ">SHA224</button>
      <button @click="select('SHA256')" :class="type === 'SHA256' ? 'btn btn-active':'btn' ">SHA256</button>
      <button @click="select('SHA384')" :class="type === 'SHA384' ? 'btn btn-active':'btn' ">SHA384</button>
      <button @click="select('SHA512')" :class="type === 'SHA512' ? 'btn btn-active':'btn' ">SHA512</button>
    </div>

    <div class="controlers">
      <button @click="select('HmacSHA256')" :class="type === 'HmacSHA256' ? 'btn btn-active':'btn' ">HmacSHA256</button>
      <button @click="select('HmacSHA512')" :class="type === 'HmacSHA512' ? 'btn btn-active':'btn' ">HmacSHA512</button>
      <span class="viewt">
        <b>{{ type }}</b> bits
        <b>{{ len }}</b> char
      </span>
    </div>
    <p class="explanation"><strong>{{ explanation.type }}</strong>: <b>{{ explanation.bits }}</b> bits <b>{{
      explanation.char }}</b> caracteres
      hexadecimais; chave <strong v-if="!explanation.key">{{ explanation.key ? 'Sim' : 'Não' }}</strong> <b v-if="explanation.key">{{ explanation.key ? 'Sim' : 'Não' }}</b></p>
    <input type="text" class="input" v-model="key" v-if="vKey" @keyup="generatedHashing" placeholder="digite a chave">
    <textarea class="textarea" v-model="text" @keyup="generatedHashing" placeholder="seu texto aqui."></textarea>
    <div class="textHashing">
      {{ hash }}
    </div>

  </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
}

.controlers {
  display: flex;
  align-items: center;
  gap: 4px;
}

.textarea {
  resize: none;
  padding: 12px;
}

.textHashing {
  word-wrap: break-word;
}

.viewt {
  font-size: 10px;

  & b {
    color: var(--p-4);
  }
}

.explanation {
  font-size: 12px;

  & strong {
    color: var(--p-4);
  }

  & b {
    color: var(--p-3);
  }
}

</style>
