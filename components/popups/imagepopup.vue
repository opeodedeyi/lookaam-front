<template>
    <div class="main-popup" v-touch:swipe.left="previousImage" v-touch:swipe.right="nextImage">
        <div class="main-popup-content">
            <div class="popup-header">
                <div class="popup-header-empty"></div>
                <div class="popup-header-title">{{current}}/{{images.length}}</div>
                <img class="popup-header-cancel" src="~/assets/svg/cancel.svg" alt="" @click="closePopup"/>
            </div>
            <div class="popup-body">
                <div v-if="current>1" class="popup-left-arrow pop-arrow" @click.prevent="previousImage"><img src="~/assets/svg/boxleft.svg" alt=""/></div>
                <div class="loading"></div>
                <img :src="currentImage" alt="ima"  class="popup-body-image"/>
                <div v-if="current<images.length" class="popup-right-arrow pop-arrow" @click.prevent="nextImage"><img src="~/assets/svg/boxright.svg" alt=""/></div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vue2TouchEvents)

export default {
    props: {
        images: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            current: 1
        }
    },
    computed: {
        currentImage() {
            return this.images[this.current-1].location
        }
    },
    methods: {
        closePopup() {
            this.$emit("close-popup", this.objId);
        },
        doNothing() {
            return
        },
        previousImage() {
            if (this.current>1) {
                return this.current--
            }
            return
        },
        nextImage() {
            if (this.current<this.images.length) {
                return this.current++
            }
            return
        },
        handleKeydown (e) {
            switch (e.keyCode) {
                case 37:
                this.previousImage();
                break;
                case 32:
                this.nextImage();
                break;
                case 39: 
                this.nextImage();
                break;
                case 27: 
                this.closePopup();
                break;
            }
        }
    },
    beforeMount () {
        window.addEventListener('keydown', this.handleKeydown, null);
    },
    beforeDestroy () {
        window.removeEventListener('keydown', this.handleKeydown);
    }
}
</script>

<style scoped>
    .main-popup {
        position: fixed;
        transition: 1ms ease-in-out;
        display: block;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
        background-color: var(--color-white);
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
        z-index: 101;
    }

    .popup-header {
        top: 0;
    }

    .popup-body {
        height: 100%;
        padding: 50px 20px 50px;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-content: center;
        align-items: center;
    }

    .popup-header-empty {
        content: " ";
    }

    .popup-header-empty::before {
        content: " ";
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

    .popup-left-arrow,
    .popup-right-arrow {
        position: absolute;
    }

    .popup-left-arrow {
        left: 50px;
    }

    .popup-right-arrow {
        right: 50px;
    }

    .popup-body {
        position: relative;
    }

    .popup-body-image {
        max-height: 70vh;
        max-width: 100vw;
        z-index: 200;
    }

    .pop-arrow {
        display: none;
        cursor: pointer;
    }

    /* desktop screen */
    @media only screen and (min-width: 1000px) {
        .popup-header {
            padding: 0 50px;
            border: none;
        }

        .popup-body-image {
            max-height: 70vh;
            max-width: 70vw;
        }

        .pop-arrow {
            display: flex;
        }
    }

/* animations animations animations animations animations */
@-webkit-keyframes rotate-forever {
    0% {
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@-moz-keyframes rotate-forever {
    0% {
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@keyframes rotate-forever {
    0% {
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

.loading {
    -webkit-animation-duration: 0.75s;
    -moz-animation-duration: 0.75s;
    animation-duration: 0.75s;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-name: rotate-forever;
    -moz-animation-name: rotate-forever;
    animation-name: rotate-forever;
    -webkit-animation-timing-function: linear;
    -moz-animation-timing-function: linear;
    animation-timing-function: linear;
    height: 40px;
    width: 40px;
    border-radius: 50%;
}

.loading {
    border: 3px solid var(--color-company);
    border-right-color: var(--color-white);
    margin: 0 auto;
    left: 0;
    right: 0;
    position: absolute;
}
</style>