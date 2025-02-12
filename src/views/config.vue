<template>
  <div class="page">
    <div class="container">
      <p>Versão Atual: {{ currentVersion }}</p>
      <p v-if="updateAvailable">Nova versão disponível! ({{ currentVersion }} → {{ newVersion }})</p>

      <button v-if="updateAvailable" class="btn" @click="updatePWA">Atualizar</button>
      <button class="btn" @click="reinstallPWA">Reinstalar</button>
      <button class="btn" @click="checkForUpdates">Verificar Atualizações</button>
      <button class="btn" @click="clearChains">Deletar chains!</button>
    </div>
  </div>
</template>

<script setup>
import { registerSW } from "virtual:pwa-register";
import { ref, onMounted } from "vue";
import db from "@/database/db.js"

const updateAvailable = ref(false);
const currentVersion = ref(localStorage.getItem("version") || "Desconhecido");
const newVersion = ref(null);

const clearChains = async () => {
  if (confirm("Tem certeza que deseja deletar a blockchain?")) {
    await db.blocks.clear();
  }
}

const updateServiceWorker = registerSW({
  onNeedRefresh() {
    updateAvailable.value = true;
    fetchVersion();
  },
  onOfflineReady() {
    console.log("PWA pronto para uso offline!");
  }
});

// 🔍 Buscar versão no servidor e salvar no localStorage
const fetchVersion = async () => {
  try {
    const response = await fetch("/block-front/version.json");
    const data = await response.json();
    newVersion.value = data.version;

    // Se a versão local for diferente da nova, atualiza
    if (currentVersion.value !== newVersion.value) {
      localStorage.setItem("version", newVersion.value);
      currentVersion.value = newVersion.value;
      window.location.reload();
    }
  } catch {
    newVersion.value = "Desconhecido";
  }
};

// 🔄 Atualizar PWA e salvar nova versão
const updatePWA = () => {
  updateServiceWorker();
  if (newVersion.value) {
    localStorage.setItem("version", newVersion.value);
    currentVersion.value = newVersion.value;
  }
  alert("Aplicativo atualizado com sucesso! 🚀");
  window.location.reload();
};

// 🔥 Reinstalar PWA (remove SW, cache e recarrega)
const reinstallPWA = async () => {
  if ("serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
    }
    caches.keys().then((names) => {
      names.forEach((name) => caches.delete(name));
    });
    alert("PWA reinstalado! Página será recarregada.");
    window.location.reload();
  }
};

// 🔄 Verificar atualizações manualmente
const checkForUpdates = async () => {
  await fetchVersion();
  if (newVersion.value !== currentVersion.value) {
    updateAvailable.value = true;
    localStorage.setItem("version", newVersion.value);
    currentVersion.value = newVersion.value;
    alert("Nova versão encontrada: " + newVersion.value);
    window.location.reload();
  } else {
    alert("Você já está na versão mais recente!");
  }
};

// 🚀 Buscar versão ao carregar o app
onMounted(fetchVersion);
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: var(--g);
  padding: var(--p);
}
</style>