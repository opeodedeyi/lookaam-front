<template>
    <div class="container">
        <nuxt-link to="/getstarted" v-if="isLoggedIn" class="hide">Host a Place</nuxt-link>
        <profilephoto class="ml2" v-if="isLoggedIn"/>

        <nuxt-link to="/getstarted" v-if="!isLoggedIn" class="hide">Become a Host</nuxt-link>
        <mainbutton link to="/login" v-if="!isLoggedIn" class="ml">Login</mainbutton>
    </div>
</template>

<script>
import mainbutton from "@/components/utilities/mainbutton";
import profilephoto from "@/components/header/hu/profilephoto";

export default {
    components: {
        profilephoto,
        mainbutton
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters["profile/check"]
        }
    }
}
</script>

<style scoped>
.container {
    display: none;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
}

a {
    font-weight: 500;
    text-decoration: none;
    color: var(--color-dark);
}

/* Large screens */
@media only screen and (min-width: 1000px) {
    .container {
        display: flex;
    }
    
    .hide {
        display: none;
    }
}

/* Larger screens */
@media only screen and (min-width: 1260px) {
    .container {
        display: flex;
    }

    .hide {
        display: block;
    }

    .ml {
        margin-left: 3rem;
    }

    .ml2 {
        margin-left: 4rem;
    }
}
</style>