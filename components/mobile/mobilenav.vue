<template>
    <div class="container" :class="{ open: isvisible }">
        <div class="nav-beginning">
            <div class="nav-header">
                <logo/>
                <cancel @cancel-clicked="cancel"/>
            </div>
            <div class="nav-profile" v-if="isLoggedIn">
                <profilephoto/>
                <p>Hi, {{ user.fullname }}</p>
            </div>
            <ul class="nav-main" @click="cancel">
                <nuxt-link to="/signup" tag="li" active-class="active" v-if="!isLoggedIn"><a>Create an account</a></nuxt-link>
                <nuxt-link to="/login" tag="li" active-class="active" v-if="!isLoggedIn"><a>Log in</a></nuxt-link>
                <nuxt-link to="/getstarted" tag="li" active-class="active" v-if="!isLoggedIn"><a>Become a Host</a></nuxt-link>

                <nuxt-link to="/profile" tag="li" active-class="active" v-if="isLoggedIn"><a>My Profile</a></nuxt-link>
                <nuxt-link to="/profile/manageplaces" tag="li" active-class="active" v-if="isLoggedIn"><a>Manage my Places</a></nuxt-link>
                <nuxt-link to="/getstarted" tag="li" active-class="active" v-if="isLoggedIn"><a>Host a Place</a></nuxt-link>
                <nuxt-link to="/profile/savedplaces" tag="li" active-class="active" v-if="isLoggedIn"><a>Saved Places</a></nuxt-link>
                <li active-class="active" @click.prevent="logOut" v-if="isLoggedIn">Sign out</li>
            </ul>

            <ul class="nav-secondary" @click="cancel">
                <nuxt-link to="/about" tag="li" active-class="active"><a>About us</a></nuxt-link>
                <nuxt-link to="/search" tag="li" active-class="active"><a>Explore places</a></nuxt-link>
                <nuxt-link to="/contactus" tag="li" active-class="active"><a>Contact us</a></nuxt-link>
            </ul>
        </div>
        
        <div class="nav-footer" @click="cancel">
            <instagram/>
            <facebook class="m-l"/>
            <twitter class="m-l"/>
        </div>
    </div>
</template>

<script>
import logo from "@/components/utilities/logo";
import cancel from "@/components/utilities/cancel";
import profilephoto from "@/components/header/hu/profilephoto";
import facebook from "@/components/utilities/facebook";
import twitter from "@/components/utilities/twitter";
import instagram from "@/components/utilities/instagram";

export default {
    components: {
        logo,
        cancel,
        profilephoto,
        facebook,
        twitter,
        instagram
    },
    props: {
        isvisible: {
            type: Boolean,
            required: false
        }
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters["profile/check"]
        },
        user() {
            return this.$store.getters["profile/user"]
        }
    },
    methods: {
        cancel() {
            this.$emit("hide-nav");
        },
        async logOut() {
            await this.$store.dispatch("profile/logOut");
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
    .container {
        line-height: 1.5;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: fixed;
        top: 0;
        right: -999px;
        bottom: 0;
        z-index: 150;
        overflow-y: auto;
        width: 100%;
        max-width: 360px;
        padding: 20px 20px;
        background: var(--color-white);
        color: var(--color-dark);
        transition: right 0.2s;
    }

    .open {
        right: 0;
    }

    .nav-header {
        height: 2.5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-content: center;
        align-items: center;
    }

    .nav-main {
        margin-top: 3rem;
        margin-bottom: 3rem;
    }

    ul {
        padding: 0;
        list-style: none;
    }

    li {
        margin-bottom: .8rem;
        font-size: 1.1rem;
        font-size: 1.1rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    ul a,
    ul li {
        width: 100%;
        cursor: pointer;
    }

    a,
    li {
        text-decoration: none;
        font-weight: 500;
        color: var(--color-dark);
    }

    a:visited {
        color: var(--color-dark);
    }

    .nav-profile {
        height: 2.5rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-content: center;
        align-items: center;
        margin-top: .3rem;
    }

    .nav-profile p {
        margin-right: .2rem;
        color: var(--color-dark);
        font-size: 1.1rem;
        font-weight: 500;
    }

    .nav-footer {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        position: sticky;
        bottom: 0;
        right: 1.25rem;
    }

    .m-l {
        margin-left: .7rem;
    }

    /* Large screens */
    @media only screen and (min-width: 1000px) {
        .container {
            display: none;
        }
    }
</style>