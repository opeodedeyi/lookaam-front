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
                        <phonecodeinput hasSlot mustFill name="code" v-model="form.phone.code">Country </phonecodeinput>
                        <baseinput hasSlot mustFill placeholder="xxx-xxxx-xxxx" name="phone" inputType="number" v-model="form.phone.number">Phone number </baseinput>
                    </div>
                    <!-- Form page two -->
                    <div class="fw" v-if="step == 2">
                        <p class="form-title">Where is the place located?</p>
                        <countryinput hasSlot mustFill name="country" v-model="form.country">Country </countryinput>
                        <baseinput hasSlot mustFill placeholder="Street" name="street" v-model="form.street">Street </baseinput>
                        <baseinput hasSlot mustFill placeholder="City" name="city" v-model="form.city">City / Town </baseinput>
                        <baseinput hasSlot mustFill placeholder="State" name="state" v-model="form.state">State </baseinput>
                        <baseinput hasSlot mustFill placeholder="Zip" name="zip" v-model="form.zip">Zip code </baseinput>
                    </div>
                    <!-- Form page three (wip) -->
                    <div class="fw" v-if="step == 3">
                        <topinput hasSlot mustFill name="topinput" v-model="form.typeof">What type of place is this property? </topinput>
                        <controlinput hasSlot name="rooms" v-model.number="form.rooms" >How many rooms are in the place? </controlinput>
                        <controlinput hasSlot name="toilet" v-model.number="form.toilet" >How many toilets are in the place? </controlinput>
                        <baseinput hasSlot isBold placeholder="xx" name="size" inputType="number" v-model="form.size">What is the size of the place in sq ft? </baseinput>
                        <baseinput hasSlot isBold placeholder="xx" name="maxguest" inputType="number" v-model="form.maxguest">How many people can it take? </baseinput>
                    </div>
                    <!-- Form page four -->
                    <div class="fw" v-if="step == 4">
                        <p class="form-title">The place is ideal for?</p>
                        <checkinput name="reception" value="reception" v-model="form.idealfor">Reception</checkinput>
                        <checkinput name="production" value="production" v-model="form.idealfor">Production</checkinput>
                        <checkinput name="meeting" value="meeting" v-model="form.idealfor">Meeting</checkinput>
                        <checkinput name="performance" value="performance" v-model="form.idealfor">Performance</checkinput>
                        <checkinput name="dinner" value="dinner" v-model="form.idealfor">Dinner</checkinput>
                        <checkinput name="wedding" value="wedding" v-model="form.idealfor">Wedding</checkinput>
                        <checkinput name="party" value="party" v-model="form.idealfor">Party</checkinput>
                        <checkinput name="conference" value="conference" v-model="form.idealfor">Conference</checkinput>
                    </div>
                    <!-- Form page five -->
                    <div class="fw" v-if="step == 5">
                        <p class="form-title">What amenities are provided for people?</p>
                        <checkinput name="electricity" value="electricity" v-model="form.amenities">Electricity</checkinput>
                        <checkinput name="a/c" value="a/c" v-model="form.amenities">a/c</checkinput>
                        <checkinput name="wifi" value="wifi" v-model="form.amenities">wifi</checkinput>
                        <checkinput name="soundSystem" value="sound system" v-model="form.amenities">Sound system</checkinput>
                        <checkinput name="private entrance" value="private entrance" v-model="form.amenities">Private entrance</checkinput>
                        <checkinput name="kitchen" value="kitchen" v-model="form.amenities">Kitchen</checkinput>
                        <checkinput name="large table" value="large table" v-model="form.amenities">Large table</checkinput>
                        <checkinput name="green screen" value="green screen" v-model="form.amenities">Green screen</checkinput>
                        <checkinput name="stage" value="stage" v-model="form.amenities">Stage</checkinput>
                        <checkinput name="changing room" value="changing room" v-model="form.amenities">Changing room</checkinput>
                        <checkinput name="makeup room" value="makeup room" v-model="form.amenities">Makeup room</checkinput>
                        <checkinput name="lounge" value="lounge" v-model="form.amenities">Lounge</checkinput>
                        <checkinput name="soundproof" value="soundproof" v-model="form.amenities">Soundproof</checkinput>
                    </div>
                    <!-- Form page six -->
                    <div class="fw" v-if="step == 6">
                        <p class="form-title">What accessibility does the place have?</p>
                        <checkinput name="wheelchair" value="wheelchair" v-model="form.accessibility">Wheelchair</checkinput>
                        <checkinput name="elevator" value="elevator" v-model="form.accessibility">Elevator</checkinput>
                        <checkinput name="on-site parking" value="on-site parking" v-model="form.accessibility">On-site parking</checkinput>
                        <checkinput name="parking near by" value="parking near by" v-model="form.accessibility">Parking near by</checkinput>
                        <checkinput name="stairs" value="stairs" v-model="form.accessibility">Stairs</checkinput>
                    </div>
                    <!-- Form page seven -->
                    <div class="fw" v-if="step == 7">
                        <p class="form-title">How long is your place open?</p>
                        <baselabel mustFill name="alwaysopen">Always open 24/7 </baselabel>
                        <div class="inline-radio mb9">
                            <radioinput name="yes" :value="true" v-model="form.time.alwaysopen">Yes</radioinput>
                            <radioinput name="no" :value="false" v-model="form.time.alwaysopen">No</radioinput>
                        </div>
                        <baseinput v-if="!form.time.alwaysopen" hasSlot name="open" inputType="time" v-model="form.time.open">Opening time</baseinput>
                        <baseinput v-if="!form.time.alwaysopen" hasSlot name="close" inputType="time" v-model="form.time.close">Closing time</baseinput>
                    </div>
                    <!-- Form page eight -->
                    <div class="fw" v-if="step == 8">
                        <p class="form-title">How much are you charging to rent it out for a day? <span class="label-required">*</span></p>
                        <currencyinput hasSlot mustFill name="currency" v-model="form.price.currency">Currency </currencyinput>
                        <baseinput hasSlot mustFill placeholder="xxx" name="price" inputType="number" v-model="form.price.amount">Amount </baseinput>
                    </div>
                    <!-- Form page nine (photo upload)(wip) -->
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
                        <baseinput hasSlot mustFill placeholder="Title of place" name="title" inputType="text" v-model="form.title">Give the place a short title </baseinput>
                        <baseinput hasSlot mustFill placeholder="You can also add any missing information we failed to collect" controlType="textarea" :maxLength=350 name="description" v-model="form.description">Describe the place</baseinput>
                    </div>
                    <!-- Form page eleven -->
                    <div class="fw" v-if="step == 11">
                        <p class="form-title">Are there rules people should be aware of?</p>
                        <baseinput placeholder="Tell people abut the rules of the place" controlType="textarea" :maxLength=350 name="rules" v-model="form.rules"></baseinput>
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
import baselabel from '@/components/utilities/baselabel';
import countryinput from '@/components/utilities/countryinput';
import phonecodeinput from '@/components/utilities/phonecodeinput';
import currencyinput from '@/components/utilities/currencyinput';
import topinput from '@/components/utilities/topinput';
import checkinput from '@/components/utilities/checkinput';
import radioinput from '@/components/utilities/radioinput';
import controlinput from '@/components/utilities/controlinput';

export default {
    components: {
        createproplayout,
        baseinput,
        baselabel,
        countryinput,
        phonecodeinput,
        currencyinput,
        topinput,
        checkinput,
        radioinput,
        controlinput
    },
    data() {
        return {
            progresstext: ["Contact details", "Location details", "Property details", "More details", "Amentites information", "Accessibility information", "Timing", "Pricing", "Upload photos of the place", "One more", "Finishing"],
            step: 1,
            totalsteps: 11,
            form: {
                phone: {
                    code: '234',
                    number: null
                },
                time: {
                    alwaysopen: true,
                    open: '00:00',
                    close: '00:00'
                },
                idealfor: [],
                amenities: [],
                accessibility: [],
                typeof: 'studio',
                country: 'Nigeria',
                street: null,
                city: null,
                state: null,
                zip: null,
                rooms: 0,
                toilet: 0,
                size: null,
                maxguest: null,
                rules: null,
                title: null,
                description: null,
                price: {
                    currency: 'NGN',
                    amount: null,
                }
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

.mb9 {
    margin-bottom: .9rem;
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

.inline-radio {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
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