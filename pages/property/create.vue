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
                        <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
                        <phonecodeinput hasSlot mustFill name="code" v-model="form.phone.code">Country </phonecodeinput>
                        <baseinput hasSlot mustFill placeholder="xxx-xxxx-xxxx" name="phone" inputType="number" v-model="form.phone.number">Phone number </baseinput>
                    </div>
                    <!-- Form page two -->
                    <div class="fw" v-if="step == 2">
                        <p class="form-title">Where is the place located?</p>
                        <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
                        <countryinput hasSlot mustFill name="country" v-model="form.location.country">Country </countryinput>
                        <baseinput hasSlot mustFill placeholder="Street" name="street" v-model="form.location.street">Street </baseinput>
                        <baseinput hasSlot mustFill placeholder="City" name="city" v-model="form.location.city">City / Town </baseinput>
                        <baseinput hasSlot mustFill placeholder="State" name="state" v-model="form.location.state">State / Region </baseinput>
                        <baseinput hasSlot placeholder="Zip" name="zip" v-model="form.location.zip">Zip code </baseinput>
                    </div>
                    <!-- Form page three -->
                    <div class="fw" v-if="step == 3">
                        <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
                        <topinput hasSlot mustFill name="topinput" v-model="form.typeof">What type of place is this property? </topinput>
                        <controlinput hasSlot name="rooms" v-model.number="form.rooms" >How many rooms are in the place? </controlinput>
                        <controlinput hasSlot name="toilet" v-model.number="form.toilet" >How many toilets are in the place? </controlinput>
                        <numberinput hasSlot isBold placeholder="xx" name="size" v-model.number="form.size">What is the size of the place in sq ft? </numberinput>
                        <numberinput hasSlot isBold placeholder="xx" name="maxguest" v-model.number="form.maxguest">How many people can it take? </numberinput>
                    </div>
                    <!-- Form page four -->
                    <div class="fw" v-if="step == 4">
                        <p class="form-title">The place is ideal for?</p>
                        <checkinput name="house party" value="house party" v-model="form.idealfor">House Party</checkinput>
                        <checkinput name="video shoot" value="video shoot" v-model="form.idealfor">Video Shoot</checkinput>
                        <checkinput name="photo shoot" value="photo shoot" v-model="form.idealfor">Photo Shoot</checkinput>
                    </div>
                    <!-- Form page five -->
                    <div class="fw" v-if="step == 5">
                        <p class="form-title">What amenities are provided for people?</p>
                        <checkinput name="electricity" value="electricity" v-model="form.amenities">Electricity</checkinput>
                        <checkinput name="tables" value="tables" v-model="form.amenities">Tables</checkinput>
                        <checkinput name="chairs" value="chairs" v-model="form.amenities">Chairs</checkinput>
                        <checkinput name="air conditioner" value="air conditioner" v-model="form.amenities">Air Conditioner</checkinput>
                        <checkinput name="wifi" value="wifi" v-model="form.amenities">wifi</checkinput>
                        <checkinput name="soundSystem" value="sound system" v-model="form.amenities">Sound System</checkinput>
                        <checkinput name="kitchen" value="kitchen" v-model="form.amenities">Kitchen</checkinput>
                        <checkinput name="changing room" value="changing room" v-model="form.amenities">Changing room</checkinput>
                    </div>
                    <!-- Form page six -->
                    <div class="fw" v-if="step == 6">
                        <p class="form-title">What are some of the features of the place?</p>
                        <checkinput name="wheelchair accessible" value="wheelchair accessible" v-model="form.accessibility">Wheelchair Accessible</checkinput>
                        <checkinput name="elevator" value="elevator" v-model="form.accessibility">Elevator</checkinput>
                        <checkinput name="parking space" value="parking space" v-model="form.accessibility">Parking Space(s)</checkinput>
                        <checkinput name="natural light" value="natural light" v-model="form.accessibility">Natural Light</checkinput>
                        <checkinput name="soundproof" value="soundproof" v-model="form.accessibility">Soundproof</checkinput>
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
                        <p class="form-title">How much are you charging to rent it out for a day?</p>
                        <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
                        <currencyinput hasSlot mustFill name="currency" v-model="form.price.currency">Currency </currencyinput>
                        <numberinput hasSlot mustFill placeholder="xxx" name="price" v-model.number="form.price.amount">Amount </numberinput>
                        <perinput hasSlot mustFill name="perinput" v-model="form.price.per">Per </perinput>
                    </div>
                    <!-- Form page nine (photo upload)(wip) -->
                    <div keep-alive :keep-alive-props="{ include: ['multiPhotoUpload'] }" class="fw" v-show="step == 9">
                        <div class="normal-form">
                            <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
                            <p v-if="successMessage" class="form-okay">{{ successMessage }}</p>
                            <label for="photo" class="mb1">
                                <ul class="list-photo">
                                    <li>Upload at least one photo to your place</li>
                                    <li>You can upload a maximum of 15 images</li>
                                    <li>Make sure the enviroment is well lit and clean</li>
                                </ul> 
                            </label>
                            <multiplephotoupload name="images" :objId="objectid"></multiplephotoupload>
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
                        <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
                        <p class="form-title">Are there rules people should be aware of?</p>
                        <baseinput placeholder="Tell people abut the rules of the place" controlType="textarea" :maxLength=350 name="rules" v-model="form.rules"></baseinput>
                    </div>
                    
                </form>
            </template>

            <template v-slot:button>
                <div class="btn-container"><button class="button-back f-btn" @click.prevent="backPressed" v-if="step != 1">Back</button></div>
                <div class="btn-container" v-if="step < 11"><button class="button-onward f-btn" @click.prevent="nextPressed">Next <smbtnloading v-if="loading"></smbtnloading> </button></div>
                <div class="btn-container" v-if="step == 11"> <button class="button-onward f-btn" @click.prevent="submitForm">Create place</button></div>
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
import smbtnloading from '@/components/utilities/smbtnloading';
import numberinput from '@/components/utilities/numberinput';
import baselabel from '@/components/utilities/baselabel';
import countryinput from '@/components/utilities/countryinput';
import phonecodeinput from '@/components/utilities/phonecodeinput';
import currencyinput from '@/components/utilities/currencyinput';
import topinput from '@/components/utilities/topinput';
import perinput from '@/components/utilities/perinput';
import checkinput from '@/components/utilities/checkinput';
import radioinput from '@/components/utilities/radioinput';
import controlinput from '@/components/utilities/controlinput';
import multiplephotoupload from '@/components/utilities/multiplephotoupload';

export default {
    middleware: [ 'isVerified' ],
    components: {
        createproplayout,
        baseinput,
        smbtnloading,
        numberinput,
        baselabel,
        countryinput,
        phonecodeinput,
        currencyinput,
        topinput,
        perinput,
        checkinput,
        radioinput,
        controlinput,
        multiplephotoupload
    },
    data() {
        return {
            objectid: "null",
            loading: false,
            progresstext: ["Contact details", "Location details", "Property details", "More details", "Amentites information", "Accessibility information", "Timing", "Pricing", "Upload photos of the place", "One more", "Finishing"],
            step: 1,
            totalsteps: 11,
            errorMessage: null,
            successMessage: null,
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
                location: {
                    country: 'Nigeria',
                    street: null,
                    city: null,
                    state: null,
                    zip: null
                },
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
                    per: 'day'
                }
            },
            
        }
    },
    watch: {
        "form.size": function (val) {
            if (typeof val === 'string') {
                this.form.size=null
            }
        },
        "form.maxguest": function (val) {
            if (typeof val === 'string') {
                this.form.maxguest=null
            }
        },
        "form.price.amount": function (val) {
            if (typeof val === 'string') {
                this.form.price.amount=null
            }
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
            this.errorMessage = null
            this.successMessage = null
        },
        nextStep() {
            if (this.step == 11) {
                return
            }
            this.step++
            this.errorMessage = null
            this.successMessage = null
        },
        firstFormSubmit() {
            this.$axios.post('/place', this.form)
            .then(result => {
                const id = result.data._id
                this.objectid = id
                this.loading = false
                this.nextStep()
                return this.successMessage = "Your prograss has been saved, you can always return to complete the form"
            })
            .catch(e => {
                this.loading = false
                console.log(e);
                return this.errorMessage = "Something went wrong, please try again later"
            })
        },
        nextPressed() {
            if (this.step == 1) {
                if (!this.form.phone.number || this.form.phone.number.length<9 || this.form.phone.number.length > 11) {
                    return this.errorMessage = "Please provide a valid phone number"
                }
                this.nextStep()
            } else if (this.step == 2) {
                if (!this.form.location.country || !this.form.location.street || !this.form.location.city || !this.form.location.state ) {
                    return this.errorMessage = "Please fill out all fields with an *asterisk*"
                }
                this.nextStep()
            } else if (this.step == 3) {
                if (!this.form.typeof ) {
                    return this.errorMessage = "Please fill out all fields with an *asterisk*"
                }
                this.nextStep()
            } else if (this.step == 8) {
                if (!this.form.price.amount || !this.form.price.currency) {
                    return this.errorMessage = "Please fill out all fields with an *asterisk*"
                } else if (this.objectid=="null") {
                    this.loading = true
                    return this.firstFormSubmit()
                } else {
                    return this.nextStep()
                }
            } else {
                this.nextStep()
            }
        },
        async submitForm() {
            if (this.step == 11) {
                this.loading = true
                await this.$axios.patch(`/place/${this.objectid}`, this.form)
                .then(result => {
                    console.log(result);
                    this.loading = false
                    return this.$router.push(`/property/${this.objectid}`);
                })
                .catch(e => {
                    this.loading = false
                    console.log(e);
                    return this.errorMessage = "Something went wrong, please try again later"
                })
            }
            this.nextPressed()
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
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
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

.form-error {
    font-size: .9rem;
    color: var(--color-danger);
    margin-bottom: .6rem;
}

.form-okay {
    font-size: .9rem;
    color: var(--color-company2);
    margin-bottom: .6rem;
}

.inline-radio {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

.list-photo {
    padding: 0;
    list-style-type: none;
}

.list-photo li {
    font-size: 1rem;
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