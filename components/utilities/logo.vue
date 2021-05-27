<template>
    <nuxt-link to="/" class="si">
        <img src="~/assets/svg/logo.svg" alt="" />
    </nuxt-link>
</template>

<script>
export default {

}
</script>

<style scoped>
.si {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    cursor: pointer;
    border-color: var(--color-white);
}

img {
    height: 1.1rem;
}
</style>