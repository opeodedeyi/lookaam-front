<template>
  <div class="container" @click="hidemobilenav">
  </div>
</template>

<script>
    export default {
        methods: {
            hidemobilenav() {
                this.$emit("hide-nav");
            }
        }
    }
</script>

<style scoped>
    .container {
        position: fixed;
        transition: 1ms ease-in-out;
        display: block;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
        background-color: rgba(var(--rgba-backdrop), 0.6);
    }

    /* Small screens */
    @media only screen and (max-width: 999px) {
        
    }

    /* Large screens */
    @media only screen and (min-width: 1000px) {
        .container {
            display: none;
        }
    }
</style>