<template>
    <div class="J-container">
        <p>Join hundreds of hosts on lookaam</p>
        <mainbutton link to="/getstarted" v-if="isLoggedIn" mode="inverse" size="medium">Host a Place</mainbutton>
        <mainbutton link to="/getstarted" v-else mode="inverse" size="medium">Become a Host</mainbutton>
    </div>
</template>

<script>
import mainbutton from "@/components/utilities/mainbutton";

export default {
    components: {
        mainbutton
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters["profile/isloggedin"]
        }
    }
}
</script>

<style scoped>
    .J-container {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        color: var(--color-white);
        height: 310px;
        padding: 0 50px;
        background-color: var(--color-company);
    }

    .J-container p {
        font-size: 2.7rem;
        font-weight: 600;
        max-width: 600px;
        line-height: 4rem;
        margin-bottom: 1.6rem;
    }


    /* Small screens */
    @media only screen and (max-width: 999.9px) {
        .J-container {
            padding: 0 20px;
        }

        .J-container p {
            font-size: 2.1rem;
            font-weight: 600;
            width: 90%;
            max-width: 600px;
            line-height: 2.5rem;
        }
    }
</style>