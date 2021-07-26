<template>
    <div class="main-popup" @click="closePopup">
        <div class="main-popup-content" @click.stop="doNothing">
            <div class="popup-header">
                <div class="popup-header-empty"></div>
                <div class="popup-header-title">Share</div>
                <img class="popup-header-cancel" src="~/assets/svg/cancel.svg" alt="" @click="closePopup"/>
            </div>
            <div class="popup-body">
                <a target="_blank" :href="`https://twitter.com/intent/tweet?text=${propertyLink()}`" class="share-link"><img src="~/assets/svg/stwitter.svg" class="m-r" alt="twitter"/><span>Twitter</span></a>
                <a target="_blank" :href="`https://www.facebook.com/sharer/sharer.php?u=${propertyLink()}`" class="fb-xfbml-parse-ignore share-link"><img src="~/assets/svg/sfacebook.svg" class="m-r" alt="facebook"/><span>Facebook</span></a>
                <a target="_blank" :href="`https://api.whatsapp.com/send?text=${propertyLink()}`" data-action="share/whatsapp/share" class="share-link"><img src="~/assets/svg/swhatsapp.svg" class="m-r" alt="whatsapp"/><span>WhatsApp</span></a>
                <a target="_blank" :href="`https://t.me/share/url?url=${propertyLink()}&text=${propertyText()}`" class="share-link"><img src="~/assets/svg/stelegram.svg" class="m-r" alt="telegram"/>Telegram</a>
                <!-- <a target="_blank" :href="`https://t.me/share/url?url=${propertyLink()}&text=${propertyLink()}`" class="share-link"><img src="~/assets/svg/scopy.svg" class="m-r" alt="copy"/>Copy link</a> -->
                <a target="_blank" :href="`mailto:?subject=I wanted you to see this property&amp;body=Check out this property ${propertyLink()}`" class="share-link" title="Share by Email"><img src="~/assets/svg/smail.svg" class="m-r" alt="mail"/>Email</a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    methods: {
        closePopup() {
            this.$emit("close-popup", this.objId);
        },
        doNothing() {
            return
        },
        propertyLink() {
            return `https://lookaam.com/property/${this.link}`
        },
        propertyText() {
            return `check out this property on lookaam`
        }
    },
    props: {
        link: {
            type: String,
            required: false
        }
    }
}
</script>

<style scoped>
    .m-r {
        margin-right: 1.5rem;
    }

    .main-popup {
        position: fixed;
        transition: 1ms ease-in-out;
        display: block;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
        background-color: rgba(var(--rgba-backdrop), 0.6);
        cursor: pointer;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
    }

    .main-popup-content {
        background-color: var(--color-white);
        width: 100%;
        height: 100%;
        position: relative;
        cursor: default;
    }

    .popup-header,
    .popup-footer {
        height: 80px;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        position: absolute;
        background-color: var(--color-white);
        z-index: 101;
    }

    .popup-header {
        border-bottom: 1px solid var(--color-gray);
        top: 0;
    }

    .popup-footer {
        border-top: 1px solid var(--color-gray);
        bottom: 0;
    }

    .popup-body {
        height: 100%;
        padding: 100px 20px;
        position: relative;
        width: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .popup-header-empty {
        content: "";
    }

    .popup-header-empty::before {
        content: "";
    }

    .popup-header-title {
        font-size: 1.125rem;
        font-weight: 500;
    }

    .popup-header-cancel {
        font-size: 1.125rem;
        font-weight: 500;
        cursor: pointer;
        z-index: 101;
    }

    .popup-footer-btn {
        width: 45%;
    }

    .f-btn {
        width: 100%;
        height: 40px;
        border-radius: 20px;
        font-size: 1rem;
        border: none;
        cursor: pointer;
    }

    .button-back {
        text-decoration: underline;
        color: var(--color-company);
        text-underline-offset: .2rem;
        background-color: transparent;
    }

    .button-back:hover {
        color: var(--color-company2);
        background-color: var(--color-card);
    }

    .button-onward {
        text-decoration: none;
        color: var(--color-white);
        background-color: var(--color-company);
    }

    .button-onward:hover {
        background-color: var(--color-company2);
    }

    .share-link {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        text-decoration: none;
        color: var(--color-dark);
        font-size: 1.2rem;
        font-weight: 500;
        height: 59px;
    }

    .share-link:hover {
        color: var(--color-company);
    }

    /* desktop screen */
    @media only screen and (min-width: 460px) {
        .main-popup-content {
            max-width: 450px;
            max-height: 570px;
            border-radius: 10px;
        }

        .popup-header,
        .popup-footer {
            padding: 0 50px;
            border: none;
        }

        .popup-body {
            padding: 100px 50px;
        }

        .popup-footer-btn {
            width: 40%;
        }
    }
</style>