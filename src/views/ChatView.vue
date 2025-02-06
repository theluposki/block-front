<template>
    <div class="container">
      <!-- Conteúdo acima do textarea -->
      <div class="top-content">
        <h2>Conteúdo Acima</h2>
        <p>Rola para baixo até o textarea... luposki</p>
      </div>
  
      <!-- Textarea com ajuste ao teclado -->
      <div class="message-input-container">
        <textarea 
          ref="messageInput"
          v-model="message"
          placeholder="Digite sua mensagem aqui..."
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Referência ao textarea
  const messageInput = ref(null)
  
  // Estado da mensagem
  const message = ref('')
  
  // Funções para lidar com o foco do teclado
  const handleFocus = () => {
    // Adiciona classe para ajustar o layout quando o teclado aparece
    document.body.classList.add('keyboard-active')
  }
  
  const handleBlur = () => {
    // Remove a classe quando o teclado some
    document.body.classList.remove('keyboard-active')
  }
  </script>
  
  <style scoped>
  .container {
    height: 100svh;
    display: flex;
    flex-direction: column;
  }
  
  .top-content {
    flex-grow: 1;
    padding: 20px;
  }
  
  .message-input-container {
    padding: 20px;
    background-color: white;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }
  
  textarea {
    width: 100%;
    min-height: 120px;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ddd;
    resize: vertical;
  }
  
  /* Estilos para quando o teclado está ativo */
  .keyboard-active .message-input-container {
    position: fixed;
    bottom: calc(env(safe-area-inset-bottom) + 80px);
    left: 0;
    right: 0;
    z-index: 1000;
    transform: translateY(0);
    transition: transform 0.3s ease-out;
  }
  
  .keyboard-active .top-content {
    padding-bottom: 140px;
  }
  </style>