<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const viewportHeight = ref(window.visualViewport?.height || window.innerHeight);

const updateHeight = () => {
    viewportHeight.value = window.visualViewport?.height || window.innerHeight;
};

onMounted(() => {
    if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", updateHeight);
    }
});

onUnmounted(() => {
    if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updateHeight);
    }
});
</script>

<template>
    <div :style="{ height: viewportHeight + 'px' }" class="app-container">

    <textarea class="message-input" placeholder="digite algo..."></textarea>
    </div>
</template>

<style>
.app-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.message-input {
    width: 100%;
    height: 170px;
    border: 1px solid #ccc;
    padding: var(--p);
}
</style>
