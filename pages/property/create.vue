<template>
    <div>
        <!-- progress bar -->
        <div class="progress-bar"><div class="current-progress" :style="{width: calcBar(step) + '%'}"></div></div>
        <!-- progress text -->
        <p class="progress-text">{{ progressText }}</p>
        <createproplayout>
            <template v-slot:default>
                <form action="" class="form-body-cont">

                    <!-- Form page one -->
                    <div class="fw" v-if="step == 1">
                        <p class="form-title">What phone number can be called about this location?</p>
                        <!-- phone number -->
                        <div class="normal-form">
                            <label for="phone" class="mb1">Phone number <span class="label-required">*</span></label>
                            <input type="number" name="phone" placeholder="xxx-xxxx-xxxx" v-model="form.phone">
                        </div>
                    </div>

                    <!-- Form page two -->
                    <div class="fw" v-if="step == 2">
                        <p class="form-title">Where is the place located?</p>
                        <div class="normal-form">
                            <label for="country" class="mb1">Country <span class="label-required">*</span></label>
                            <input type="text" name="country" placeholder="Country" v-model="form.country">
                        </div>
                        <div class="normal-form">
                            <label for="street" class="mb1">Street <span class="label-required">*</span></label>
                            <input type="text" name="street" placeholder="Street" v-model="form.street">
                        </div>
                        <div class="normal-form">
                            <label for="city" class="mb1">City <span class="label-required">*</span></label>
                            <input type="text" name="city" placeholder="City" v-model="form.city">
                        </div>
                        <div class="normal-form">
                            <label for="state" class="mb1">State <span class="label-required">*</span></label>
                            <input type="text" name="state" placeholder="State" v-model="form.state">
                        </div>
                        <div class="normal-form">
                            <label for="zip" class="mb1">Zip code <span class="label-required">*</span></label>
                            <input type="number" name="zip" placeholder="Zip Code" v-model="form.zip">
                        </div>
                    </div>
                    
                </form>
            </template>

            <template v-slot:button>
                <div class="btn-container">
                    <button class="button-back f-btn" @click.prevent="backPressed" v-if="step != 1">Back</button>
                </div>
                <div class="btn-container" v-if="step < 11">
                    <button class="button-onward f-btn" @click.prevent="nextPressed">Next</button>
                </div>
                <div class="btn-container" v-if="step == 11">
                    <button class="button-onward f-btn" @click.prevent="finishPressed">Create place</button>
                </div>
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
    data() {
        return {
            progresstext: ["Contact details", "Location details", "Property details", "More details", "Amentites information", "Accessibility information", "Timing", "Pricing", "Upload photos of the place", "One more", "Finishing"],
            step: 1,
            totalsteps: 11,
            form: {
                phone: null,
                country: null,
                street: null,
                city: null,
                state: null,
                zip: null,
            },
            
        }
    },
    computed: {
        progressText() {
            return this.progresstext[this.step-1]
        }
    },
    methods: {
        calcBar(num) {
            return 9 * num;
        },
        backPressed() {
            this.step--
            console.log("Back button has been clicked");
        },
        nextPressed() {
            this.step++
            console.log("Next button has been clicked");
        },
        finishPressed() {
            console.log("Finish button has been clicked");
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
    width: 100%;
    height: 40px;
    border-radius: 20px;
    font-size: 1rem;
    border: none;
    cursor: pointer;
}

.fw {
    width: 100%;
}

.btn-container {
    width: 45%;
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
    margin-bottom: .9rem;
}

input {
    font-family: 'Jost';
}

.normal-form input {
    font-size: .95rem;
    color: var(--color-dark);
    padding: 9.2px 16px;
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