<template>
    <div>
        <!-- progress bar -->
        <div class="progress-bar"><div class="current-progress" :style="{width: calcBar(step) + '%'}"></div></div>
        <!-- progress text -->
        <p class="progress-text">{{ progressText }}</p>
        <createproplayout>
            <template v-slot:default>
                <form @submit.prevent="submitForm" class="form-body-cont">

                    <!-- Form page one -->
                    <div class="fw" v-if="step == 1">
                        <p class="form-title">What phone number can be called about this location?</p>
                        <baseinput hasSlot mustFill placeholder="xxx-xxxx-xxxx" name="phone" inputType="number" v-model="form.phone">Phone number </baseinput>
                    </div>

                    <!-- Form page two -->
                    <div class="fw" v-if="step == 2">
                        <p class="form-title">Where is the place located?</p>
                        <countryinput hasSlot mustFill name="country" v-model="form.country">Country </countryinput>
                        <!-- <baseinput hasSlot mustFill placeholder="Country" name="country" v-model="form.country">Country </baseinput> -->
                        <baseinput hasSlot mustFill placeholder="Street" name="street" v-model="form.street">Street </baseinput>
                        <baseinput hasSlot mustFill placeholder="City" name="city" v-model="form.city">City </baseinput>
                        <baseinput hasSlot mustFill placeholder="State" name="state" v-model="form.state">State </baseinput>
                        <baseinput hasSlot mustFill placeholder="Zip" name="zip" v-model="form.zip">Zip code </baseinput>
                    </div>

                    <!-- Form page three (wip) -->
                    <div class="fw" v-if="step == 3">
                        <baseinput hasSlot isBold placeholder="xx" name="size" inputType="number" v-model="form.size">What is the size of the place in sq ft? </baseinput>
                        <baseinput hasSlot isBold placeholder="xx" name="guest" inputType="number" v-model="form.guest">How many people can it take? </baseinput>
                    </div>

                    <!-- Form page four (wip) -->
                    <div class="fw" v-if="step == 4">
                        <p class="form-title">The place is ideal for?</p>
                        <!-- work in progress -->
                        <!-- work in progress -->
                    </div>

                    <!-- Form page five (wip) -->
                    <div class="fw" v-if="step == 5">
                        <p class="form-title">What amenities are provided for people?</p>
                        <!-- work in progress -->
                        <!-- work in progress -->
                    </div>

                    <!-- Form page six (wip) -->
                    <div class="fw" v-if="step == 6">
                        <p class="form-title">What accessibility does the place have?</p>
                        <!-- work in progress -->
                        <!-- work in progress -->
                    </div>

                    <!-- Form page seven (wip) -->
                    <div class="fw" v-if="step == 7">
                        <p class="form-title">How long is your place open?</p>
                        <!-- work in progress -->
                        <!-- work in progress -->
                    </div>

                    <!-- Form page eight (wip) -->
                    <div class="fw" v-if="step == 8">
                        <p class="form-title">How much are you charging to rent it out for a day? <span class="label-required">*</span></p>
                        <baseinput placeholder="xxx" name="price" inputType="number" v-model="form.price"></baseinput>
                    </div>

                    <!-- Form page nine (photo upload) -->
                    <div class="fw" v-if="step == 9">
                        <div class="normal-form">
                            <label for="photo" class="mb1">Upload at least one photo 
                                to your place, you can always add more later 
                                <br>Make sure the enviroment is well lit and clean</label>
                            <!-- work in progress -->
                            <!-- work in progress -->
                        </div>
                    </div>

                    <!-- Form page ten -->
                    <div class="fw" v-if="step == 10">
                        <p class="form-title">Tell us about the place</p>
                        <baseinput hasSlot isBold placeholder="Title of place" name="title" inputType="text" v-model="form.title">Give the place a short title </baseinput>
                        <div class="normal-form">
                            <label for="title" class="mb1">Give the place a short title</label>
                            <input type="text" name="title" placeholder="Title of place" v-model="form.title">
                        </div>
                        <div class="normal-form">
                            <label for="description" class="mb1">Describe the place</label>
                            <textarea name="description" placeholder="Tell people abut the rules of the place" maxlength="500" cols="30" rows="7"></textarea>
                        </div>
                    </div>

                    <!-- Form page eleven -->
                    <div class="fw" v-if="step == 11">
                        <p class="form-title">Are there rules people should be aware of?</p>
                        <!-- rules -->
                        <div class="normal-form">
                            <textarea name="rules" placeholder="Tell people abut the rules of the place" maxlength="500" cols="30" rows="7"></textarea>
                        </div>
                    </div>
                    
                </form>
            </template>

            <template v-slot:button>
                <div class="btn-container"><button class="button-back f-btn" @click.prevent="backPressed" v-if="step != 1">Back</button></div>
                <div class="btn-container" v-if="step < 11"><button class="button-onward f-btn" @click.prevent="nextPressed">Next</button></div>
                <div class="btn-container" v-if="step == 11"> <button class="button-onward f-btn" @click.prevent="finishPressed">Create place</button></div>
            </template>
            
            <template v-slot:image>
                <img src="~/assets/svg/host.svg" alt="" />
            </template>
        </createproplayout>
    </div>
</template>

<script>
import createproplayout from "@/components/layout/createproplayout";
import baseinput from '@/components/utilities/baseinput';
import Countryinput from '@/components/utilities/countryinput';

export default {
    components: {
        createproplayout,
        baseinput,
        Countryinput
    },
    data() {
        return {
            progresstext: ["Contact details", "Location details", "Property details", "More details", "Amentites information", "Accessibility information", "Timing", "Pricing", "Upload photos of the place", "One more", "Finishing"],
            step: 1,
            totalsteps: 11,
            form: {
                phone: null,
                country: 'Nigeria',
                street: null,
                city: null,
                state: null,
                zip: null,
                title: null,
                size: null,
                guest: null,
                price: null,
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
            console.log(this.form);
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

.label-required {
    color: var(--color-danger);
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