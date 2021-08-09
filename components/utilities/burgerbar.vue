<template>
    <div class="bb" @click="showsidenav">
        <img src="~/assets/svg/burgerbar.svg" alt="" />
    </div>
</template>

<script>
export default {
    methods: {
        showsidenav() {
            this.$emit("show-nav");
        }
    },
}
</script>

<style scoped>
.bb {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    cursor: pointer;
    border-color: var(--color-dark);
}

img {
    height: 1.55rem;
}

/* Large screens */
@media only screen and (min-width: 1000px) {
    .bb {
        display: none;
    }
}
</style>