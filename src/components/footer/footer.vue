<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
    <footer class="footer">
        <RouterLink to="/" class="nav-link" exact-active-class="active">
            <i class="ri-home-9-line"></i>
        </RouterLink>
        <RouterLink to="/about" class="nav-link" exact-active-class="active">
            <i class="ri-info-card-line"></i>
        </RouterLink>
        <RouterLink to="/hashing" class="nav-link" exact-active-class="active">
            <i class="ri-text-block"></i>
        </RouterLink>
    </footer>
</template>

<style scoped>
.nav-link {
    text-decoration: none;
    color: var(--white);
    font-size: 40px;
}

.active {
    font-weight: bold;
    text-shadow: 0 0 13px var(--dark);
}
</style>