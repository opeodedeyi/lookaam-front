<template>
    <div class="si" @click="togglepassword">
        <img v-if="isShown" src="~/assets/svg/eye.svg" alt="" />
        <img v-else src="~/assets/svg/eyehide.svg" alt="" />
    </div>
</template>

<script>
export default {
    computed: {
        isShown() {
            return this.$store.getters["form/isPasswordVisible"]
        }
    },
    methods: {
        togglepassword() {
            this.$store.commit("form/togglePassword");
        }
    }
}
</script>

<style scoped>
.si {
    z-index: 2;
    position: absolute;
    right: 1rem;
    top: 25%;
    cursor: pointer;
}

img {
    height: 1.3rem;
    color: blue;
}
</style>