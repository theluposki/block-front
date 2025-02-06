<template>
    <div class="fullscreen-container">
      <!-- Header do app -->
      <header class="app-header">
        <!-- Seu conteúdo do header aqui -->
      </header>
  
      <!-- Conteúdo principal -->
      <main class="content">
        <!-- Seu conteúdo aqui -->
      </main>
  
      <!-- Área de mensagem -->
      <div class="message-area">
        <textarea 
          v-model="mensagem"
          @focus="handleFocus"
          @blur="handleBlur"
          placeholder="Digite sua mensagem..."
        ></textarea>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Estado da aplicação
  const mensagem = ref('')
  const isInputFocused = ref(false)
  
  // Funções para gerenciar o foco
  const handleFocus = () => {
    isInputFocused.value = true
    document.documentElement.style.setProperty('--viewport-height', 'calc(var(--vh, 1vh) * 70)')
  }
  
  const handleBlur = () => {
    isInputFocused.value = false
    document.documentElement.style.setProperty('--viewport-height', 'var(--vh, 1vh) * 100')
  }
  </script>
  
  <style scoped>
  /* Definição inicial do viewport height */
  :root {
    --vh: 1px * var(--viewport-height, 100);
  }
  
  .fullscreen-container {
    min-height: calc(100svh - env(safe-area-inset-bottom));
    max-height: calc(100svh - env(safe-area-inset-bottom));
    position: relative;
    overflow-y: auto;
  }
  
  .app-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: white;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .content {
    padding-bottom: 120px;
  }
  
  .message-area {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
    padding: 10px 20px;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    transform: translateY(calc(-50% - env(safe-area-inset-bottom)));
    transition: transform 0.3s ease-out;
  }
  
  textarea {
    width: 100%;
    min-height: 40px;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ddd;
    resize: vertical;
  }
  </style>