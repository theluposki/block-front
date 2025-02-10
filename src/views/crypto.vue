<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="page">
        <header class="header-int">
            <RouterLink to="/crypto/" exact-active-class="active">Hashing</RouterLink>
            <RouterLink to="/crypto/encrypted" exact-active-class="active">Encrypted</RouterLink>
            <RouterLink to="/crypto/blockchain" exact-active-class="active">blockchain</RouterLink>
        </header>

        <RouterView />
    </div>
</template>

<style scoped>
 
</style>