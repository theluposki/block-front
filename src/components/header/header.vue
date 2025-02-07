<script setup>
import { RouterLink } from "vue-router"
import { ref, onMounted } from "vue";

const version = ref("0")

onMounted(() => {
    if(localStorage.getItem("version")){
        version.value = localStorage.getItem("version")
    }
})
</script>

<template>
    <header class="header">
        <RouterLink to="/" class="logo">
            <img src="/assets/logo-512x512.png" alt="logo">
            <span>Frieren</span>
        </RouterLink>

        <span class="version">{{ version }}</span>
    </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playwrite+VN:wght@100..400&display=swap');

.logo {
    text-decoration: none;
    cursor: pointer;
    color: var(--p-2);
    font-family: "Playwrite VN", serif;
    font-size: 20px;
    text-shadow: 0 0 3px var(--p-4);

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 12px;
    line-height: 14px;

    --wh_image: 40px;

    & img {
        width: var(--wh_image);
        height: var(--wh_image);
        object-fit: cover;
        aspect-ratio: 1;
    }


    &:active {
        scale: .98;
    }

}

.version {
    color: var(--p-1);
    font-size: 14px;
    align-self: center;
}

</style>