<template>
    <div>
        <!-- progress bar -->
        <div class="progress-bar"><div class="current-progress" :style="{width: calcBar(num) + '%'}"></div></div>
        <!-- progress text -->
        <p class="progress-text">{{ progressText }}</p>
        <createproplayout>
            <template v-slot:default>
                <form action="" class="form-body-cont">

                    <!-- Form page one -->
                    <p class="form-title">What phone number can be called about this location?</p>
                    <div class="fw">
                        <!-- phone number -->
                        <div class="normal-form">
                            <label for="phone" class="mb1" >Phone number <span class="label-required">*</span></label>
                            <input type="number" name="phone" placeholder="xxx-xxxx-xxxx">
                        </div>
                    </div>

                    <!-- Form page two -->
                    <!-- <div>
                        <div class="mb-form">
                            <label for="email">Email</label>
                            <input class="mt4" type="email" name="email" placeholder="Email address">
                        </div>
                    </div> -->
                    
                </form>
            </template>

            <template v-slot:button>
                <button class="button-back f-btn" @click="backPressed">Back</button>
                <!-- <button class="button-onward f-btn" @click="nextPressed">Next</button> -->
                <button class="button-onward f-btn" @click="finishPressed">Finish</button>
            </template>
            
            <template v-slot:image>
                <img src="~/assets/svg/host.svg" alt="" />
            </template>
        </createproplayout>
    </div>
</template>

<script>
import createproplayout from "@/components/layout/createproplayout";

export default {
    components: {
        createproplayout
    },
    computed: {
        progressText() {
            return "Contact details"
        }
    },
    methods: {
        calcBar(num) {
            return 9 * 1;
        },
        backPressed() {
            console.log("Back button has been pressed");
        },
        nextPressed() {
            console.log("Next button has been pressed");
        },
        finishPressed() {
            console.log("Finish button has been pressed");
        }
    },
    layout: 'form'
}
</script>

<style>
.mb1 {
    margin-bottom: .3rem;
}

.progress-bar {
    height: .5rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    background-color: var(--color-gray);
}

.current-progress {
    height: 100%;
    background-color: var(--color-company);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}

.progress-text {
    font-size: 1rem;
    font-weight: 500;
    height: 1.5rem;
    padding: 0 50px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

.f-btn {
    width: 45%;
    height: 40px;
    border-radius: 20px;
    font-size: 1rem;
    border: none;
    cursor: pointer;
}

.fw {
    width: 100%;
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

.form-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
}

.normal-form {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
}

input {
    font-family: 'Jost';
}

.normal-form input {
    font-size: .95rem;
    color: var(--color-dark);
    padding: 11.2px 16px;
    background-color: var(--color-gray);
    border: none;
    border-radius: 20px;
    outline: none;
}

.label-required {
    color: var(--color-danger);
}

@media only screen and (max-width: 999.9px) {
    .progress-text {
        padding: 0 20px;
    }

    .button-back:hover {
        color: var(--color-company);
        background-color: transparent;
    }

    .button-onward:hover {
        background-color: var(--color-company);
    }

    .form-title {
        font-size: 1rem;
        margin-bottom: 1.3rem;
    }
}
</style>