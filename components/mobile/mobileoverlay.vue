<template>
  <div class="container" @click="hidemobilenav" v-show="isoverlayvisible">
  </div>
</template>

<script>
    export default {
        methods: {
            hidemobilenav() {
                this.$store.commit("mobilenav/hidemobilenav");
                this.$store.commit("mobileoverlay/hideoverlay");
            }
        },
        computed: {
            isoverlayvisible() {
                return this.$store.getters["mobileoverlay/isvisible"]
            },
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