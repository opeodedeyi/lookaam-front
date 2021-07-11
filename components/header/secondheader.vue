<template>
    <div class="place-second-header">
        <div class="sp-bw sec-height">
            <p class="s-header-title">My Places</p>
            <mainbutton link to="/getstarted" size="small">Create new place</mainbutton>
        </div>
        <ul class="fl-st sec-height-sm head-links">
            <nuxt-link to="/profile/manageplaces" tag="li" class="head-links-fc" ><a>Activated</a></nuxt-link>
            <nuxt-link to="/profile/deactivatedplaces" tag="li" ><a>Deactivated</a></nuxt-link>
        </ul>
    </div>
</template>

<script>
import mainbutton from "@/components/utilities/mainbutton";
export default {
    components: {
        mainbutton
    }
}
</script>

<style scoped>
.place-second-header {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
}

.sp-bw {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
} 

.fl-st {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

.sec-height {
    height: 60px;
}

.sec-height-sm {
    height: 50px;
}

.s-header-title {
    font-size: 1.1rem;
    font-weight: 600;
}

.head-links {
    padding: 0;
}

.head-links-fc {
    margin-right: 1.6rem;
}

.head-links li {
    list-style: none;
    font-size: 1.1rem;
}

.head-links a {
    text-decoration: none;
    color: var(--color-dark);
}

.nuxt-link-active {
    font-weight: 500;
    text-decoration-line: underline;
    text-underline-offset: .7rem;
}

@media only screen and (min-width: 1000px) {
    .s-header-title {
        font-size: 1.25rem;
    }

    .head-links-fc {
        margin-right: 2rem;
    }
}
</style>