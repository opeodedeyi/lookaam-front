<template>
    <div class="si" @click="cancel">
        <img src="~/assets/svg/cancel.svg" alt="" />
    </div>
</template>

<script>
export default {
    methods: {
        cancel() {
            this.$store.commit("mobilenav/hidemobilenav");
            this.$store.commit("mobileoverlay/hideoverlay");
        }
    },
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
    height: 1.5rem;
}
</style>