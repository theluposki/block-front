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
        <RouterLink to="/crypto" class="nav-link" active-class="active">
            <i class="ri-stack-fill"></i>
        </RouterLink>
        <RouterLink to="/config" class="nav-link" exact-active-class="active">
            <i class="ri-tools-line"></i>
        </RouterLink>
    </footer>
</template>

<style scoped>
.nav-link {
    --wh_navi-link: 50px;
    text-decoration: none;
    color: var(--white);
    font-size: 40px;

    width: var(--wh_navi-link);
    height: var(--wh_navi-link);

    display: flex;
    align-items: center;
    justify-content: center;
}

.active {
    font-weight: bold;
    text-shadow: 0 0 4px var(--p-3);
    background-color: var(--dark);
    border-radius: 6px;
}
</style>