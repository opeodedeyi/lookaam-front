<template>
    <div class="main-popup">
        <div class="main-popup-content">
            <div class="popup-header">
                <div class="popup-header-empty"></div>
                <div class="popup-header-title">Contact host</div>
                <img class="popup-header-cancel" src="~/assets/svg/cancel.svg" alt="" @click="closePopup"/>
            </div>
            <div class="popup-body">
                <div class="popup-full-width">
                    <div v-if="cpPPhoto" class="popup-body-photo">
                        <img :src="cpPPhoto" alt="">
                    </div>
                    <p v-if="cpFullname" class="popup-text">{{ cpFullname }}</p>
                    <div v-if="cpVerified" class="popup-text"><img src="~/assets/svg/verified.svg" alt="">&nbsp;Trusted User</div>
                    <p v-if="cpEmail" class="popup-text">{{ cpEmail }}</p>
                    <p v-if="getPhoneNumber()" class="popup-text">{{ getPhoneNumber() }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        cpPPhoto: {
            type: String,
            required: true
        },
        cpVerified: {
            type: Boolean,
            required: true
        },
        cpFullname: {
            type: String,
            required: true
        },
        cpEmail: {
            type: String,
            required: true
        },
        cpPhNumber: {
            type: String,
            required: true
        },
        cpPhCode: {
            type: String,
            required: true
        }
    },
    methods: {
        closePopup() {
            this.$emit("close-popup", this.objId);
        },
        getPhoneNumber() {
            let num = parseInt(this.cpPhNumber)
            return `+${this.cpPhCode}${num}`
        },
        doNothing() {
            return
        }
    }
}
</script>

<style scoped>
.popup-full-width{
    width: 100%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.popup-body-photo {
    height: 250px;
    width: 250px;
    border-radius: 100%;
    display: block;
    overflow: hidden;
}

.popup-body-photo img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    display: block;
}

.popup-text {
    text-align: center;
    font-size: 1.05rem;
    font-weight: 500;
    height: 65px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

/* container */
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

.popup-body {
    position: relative;
}

/* desktop screen */
@media only screen and (min-width: 1000px) {
    .popup-header {
        padding: 0 50px;
        border: none;
    }
}
</style>