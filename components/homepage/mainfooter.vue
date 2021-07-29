<template>
    <div class="footer">
        <div class="footer-links">
            <nuxt-link to="/about" class="ft-link fti-right">About Lookaam</nuxt-link>
            <nuxt-link to="/contactus" class="fti-left">Contact Us</nuxt-link>
        </div>

        <div class="footer-social">
            <p class="footer-social-text">&#169; 2021 lookaam</p>
            <div class="footer-social-footer">
                <instagram/>
                <facebook class="ml-7"/>
                <twitter class="ml-7"/>
            </div>
        </div>
    </div>
</template>

<script>
import facebook from "@/components/utilities/facebook";
import twitter from "@/components/utilities/twitter";
import instagram from "@/components/utilities/instagram";

export default {
    components: {
        facebook,
        twitter,
        instagram
    },
}
</script>

<style scoped>
.footer {
    height: 5rem;
    padding: 0 50px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
}

.footer-links {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.footer-links a {
    color: var(--color-company);
    text-decoration: none;
    font-size: 1.05rem;
}

.footer-links a:hover {
    color: var(--color-company2);
}

.footer-social {
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
}

.footer-social-text {
    font-weight: 500;
}

.footer-social-footer {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
}

.ml-7 {
    margin-left: .7rem;
}

/* Small screens */
@media only screen and (max-width: 999.9px) {
    .footer {
        padding: 30px 20px;
        height: 12rem;
        flex-direction: column;
        align-items: flex-start;
    }

    .ft-link {
        margin-bottom: 1rem;
    }

    .footer-links {
        flex-direction: column;
    }

    .footer-social {
        font-size: 1rem;
        max-width: 990px;
        width: 100%;
    }
}

/* large screens */
@media only screen and (min-width: 1000px) {
    .fti-left {
        padding-left: 3rem;
    }

    .fti-right {
        padding-right: 3rem;
        border-right: 1px solid var(--color-dark);
    }
}
</style>