<template>
    <div class="full-width">
        <loadinglayout v-if="!property"></loadinglayout>
        <propdetailslayout v-else>
            <template v-slot:default>
                <div class="p-d-image-area" @click.prevent="openImagePopup">
                    <!-- contains image thumbnail -->
                    <img v-if="thumbnail" :src="thumbnail" alt="ima"  class="p-d-image propimage"/>
                    <img v-else src="~/assets/images/cardimage.webp" alt="ima"  class="p-d-image propimage"/>
                    <div class="img-count"><span class="img-count-no">{{propertyImages.length}}</span>&nbsp;image<span v-if="propertyImages.length>1">s</span></div>
                    <div class="img-price">{{getSymbol()}}{{commaPrice()}}/{{property.price.per}}</div>
                </div>
                <div class="f-st p-t-b b-b mobile-only"> <!-- mobile only save and share -->
                    <div @click="saveProperty" class="s-cent n-font c-point" v-if="!savedLoading && !isSaved"><img src="~/assets/svg/pdsave.svg" class="m-r-mini" alt="save"/>save</div>
                    <div @click="unsaveProperty" class="s-cent n-font c-point" v-if="!savedLoading && isSaved"><img src="~/assets/svg/pdsaved.svg" class="m-r-mini" alt="saved"/>saved</div>
                    <div class="s-cent n-font" v-if="savedLoading">saving...</div>

                    <div @click="openShare=true" class="s-cent n-font c-point m-l"><img src="~/assets/svg/pdshare.svg" class="m-r-mini" alt="saved"/>share</div>
                </div>
                <div class="p-d-title p-t-b b-b" v-if="property.title"><!-- contains title -->
                    <p class="p-d-title-cont">{{ property.title }}</p>
                </div>
                <div class="p-d-det p-t-b b-b"><!-- contains basic details like (typeof, size, maxguest, rooms, toilets about the property) -->
                    <p v-if="property.typeof" class="p-d-det-cont p-r">{{ property.typeof }}</p>
                    <p v-if="property.size" class="p-d-det-cont p-r">{{ property.size }} sq/ft</p>
                    <p v-if="property.maxguest" class="p-d-det-cont p-r">{{ property.maxguest }} guests</p>
                    <p v-if="property.rooms" class="p-d-det-cont p-r">{{ property.rooms }} room(s)</p>
                    <p v-if="property.toilet" class="p-d-det-cont p-r">{{ property.toilet }} toilet(s)</p>
                </div>
                <div v-if="property.owner" class="p-d-cont p-t-b b-b"><!-- contains owner of property -->
                    <div class="p-d-cont-det">
                        <div class="p-d-cont-det-image">
                            <img v-if="!!property.owner.profilePhoto.location" :src="property.owner.profilePhoto.location" alt="">
                            <img v-else src="~/assets/images/pp.webp" alt="">
                            <!-- <img v-else :src="property.owner.profilePhoto.location" alt=""> -->
                        </div>
                        <p class="p-d-cont-det-name">by {{ property.owner.fullname | shortenText(14, '...') }}</p>
                        <div class="p-d-cont-det-verified"><img src="~/assets/svg/verified.svg" v-if="property.owner.isVerified" alt=""></div>
                    </div>
                    <div class="p-d-cont-link"  @click.prevent="contactPopup = true">Contact Host</div>
                </div>
                <div v-if="property.location" class="flex-c-full p-t-b b-b mobile-only"> <!-- contains location of the property -->
                    <p class="general-title p-b">Location</p>
                    <p class="general-text">{{ property.location.street }}, {{ property.location.city }}, {{ property.location.state }}, {{ property.location.country }}, {{ property.location.zip }}</p>
                </div>
                <div v-if="property.description" class="flex-c-full p-t-b b-b"><!-- contains description of the property -->
                    <p class="general-text">{{ property.description }}</p>
                </div>
                <div v-if="property.rules" class="flex-c-full p-t-b b-b desktop-only"><!-- {{{ desktop }}} only rules of the property -->
                    <p class="general-title p-b">Rules</p>
                    <p class="general-text">{{ property.rules }}</p>
                </div>
                <div v-if="property.idealfor.length>0" class="flex-c-full p-t-b b-b mobile-only"><!-- {{{ mobile }}} only property is ideal for -->
                    <label for="propertydetails" class="general-title p-b s-btw"><p>Ideal for</p><img src="~/assets/svg/selectarrow.svg" alt=""></label>
                    <input type="checkbox" name="propertydetails" id="propertydetails" class="hidecheckbox">
                    <div class="general-tags collapsed-item">
                        <basetag v-for="item in property.idealfor" :key="item">{{item}}</basetag>
                    </div>
                </div>
                <div v-if="property.amenities.length>0" class="flex-c-full p-t-b b-b mobile-only"><!-- {{{ mobile }}} only property Amenities -->
                    <label for="amenitiesdetails" class="general-title p-b s-btw"><p>Amenities</p><img src="~/assets/svg/selectarrow.svg" alt=""></label>
                    <input type="checkbox" name="amenitiesdetails" id="amenitiesdetails" class="hidecheckbox">
                    <div class="general-tags collapsed-item">
                        <basetag v-for="item in property.amenities" :key="item">{{item}}</basetag>
                    </div>
                </div>
                <div v-if="property.accessibility.length>0" class="flex-c-full p-t-b b-b mobile-only"><!-- {{{ mobile }}} only property accessibility -->
                    <label for="accessibilitydetails" class="general-title p-b s-btw"><p>Accessibility</p><img src="~/assets/svg/selectarrow.svg" alt=""></label>
                    <input type="checkbox" name="accessibilitydetails" id="accessibilitydetails" class="hidecheckbox">
                    <div class="general-tags collapsed-item">
                        <basetag v-for="item in property.accessibility" :key="item">{{item}}</basetag>
                    </div>
                </div>
                <div class="flex-c-full p-t-b b-b mobile-only"><!-- contains opening and cloaing time -->
                    <label for="availability" class="general-title p-b s-btw"><p>Availability</p><img src="~/assets/svg/selectarrow.svg" alt=""></label>
                    <input type="checkbox" name="availability" id="availability" class="hidecheckbox">
                    <p class="general-text collapsed-item" v-if="property.time.alwaysopen">Always Open 24/7</p>
                    <div v-else class="collapsed-item f-col">
                        <p class="general-text p-b">Opening time - {{ property.time.open }}</p>
                        <p class="general-text">Closing time - {{ property.time.close }}</p>
                    </div>
                </div>
                <div v-if="property.rules" class="flex-c-full p-t-b b-b mobile-only"><!-- {{{ mobile }}} only property rules -->
                    <label for="rules" class="general-title p-b s-btw"><p>Rules</p><img src="~/assets/svg/selectarrow.svg" alt=""></label>
                    <input type="checkbox" name="rules" id="rules" class="hidecheckbox">
                    <p class="general-text collapsed-item">{{ property.rules }}</p>
                </div>
            </template>
            
            <template v-slot:prop-right> <!-- desktop content on right side of page -->
                <div class="f-st p-t-b b-b full-width"> <!-- save and share -->
                    <div @click="saveProperty" class="s-cent n-font c-point" v-if="!savedLoading && !isSaved"><img src="~/assets/svg/pdsave.svg" class="m-r-mini" alt="save"/>save</div>
                    <div @click="unsaveProperty" class="s-cent n-font c-point" v-if="!savedLoading && isSaved"><img src="~/assets/svg/pdsaved.svg" class="m-r-mini" alt="saved"/>saved</div>
                    <div class="s-cent n-font" v-if="savedLoading">saving...</div>

                    <div @click="openShare=true" class="s-cent n-font c-point m-l"><img src="~/assets/svg/pdshare.svg" class="m-r-mini" alt="saved"/>share</div>
                </div>
                <div v-if="property.location" class="flex-c-full p-t-b b-b"><!-- contains location of the property -->
                    <p class="general-title p-b">Location</p>
                    <p class="general-text">{{ property.location.street }}, {{ property.location.city }}, {{ property.location.state }}, {{ property.location.country }}, {{ property.location.zip }}</p>
                </div>
                <div v-if="property.idealfor.length>0" class="flex-c-full p-t-b b-b"><!-- contains what the property is ideal for -->
                    <p class="general-title p-b">Ideal for</p>
                    <div class="general-tags">
                        <basetag v-for="item in property.idealfor" :key="item">{{item}}</basetag>
                    </div>
                </div>
                <div v-if="property.amenities.length>0" class="flex-c-full p-t-b b-b"><!-- contains what the property amenities are -->
                    <p class="general-title p-b">Amenities</p>
                    <div class="general-tags">
                        <basetag v-for="item in property.amenities" :key="item">{{item}}</basetag>
                    </div>
                </div>
                <div v-if="property.accessibility.length>0" class="flex-c-full p-t-b b-b"><!-- contains what the property accessibilities are -->
                    <p class="general-title p-b">Accessibility</p>
                    <div class="general-tags">
                        <basetag v-for="item in property.accessibility" :key="item">{{item}}</basetag>
                    </div>
                </div>
                <div class="flex-c-full p-t-b"><!-- contains opening and cloaing time -->
                    <p class="general-title p-b">Availability</p>
                    <p class="general-text" v-if="property.time.alwaysopen">Always Open 24/7</p>
                    <div v-else>
                        <p class="general-text p-b">Opening time - {{ property.time.open }}</p>
                        <p class="general-text p-b">Closing time - {{ property.time.close }}</p>
                    </div>
                </div>
            </template>
        </propdetailslayout>
        <sharepopup v-if="openShare && property" @close-popup="closeSharePopup" :link="property._id"></sharepopup>
        <imagepopup v-if="property && propertyImages.length>0 && imagePopup" @close-popup="closeImagePopup" :images="propertyImages"></imagepopup>
        <contactpopup v-if="property && contactPopup" @close-popup="closeContactPopup" :cpPPhoto="property.owner.profilePhoto.location" :cpVerified="property.owner.isVerified" :cpFullname="property.owner.fullname" :cpEmail="property.owner.email" :cpPhNumber="property.phone.number" :cpPhCode="property.phone.code"></contactpopup>
    </div>
</template>

<script>
import propdetailslayout from "@/components/layout/propdetailslayout";
import basetag from "@/components/utilities/basetag";
import loadinglayout from "@/components/layout/loadinglayout";
import sharepopup from "@/components/popups/sharepopup";
import imagepopup from "@/components/popups/imagepopup";
import contactpopup from "@/components/popups/contactpopup";

export default {
    components: {
        loadinglayout,
        propdetailslayout,
        basetag,
        sharepopup,
        imagepopup,
        contactpopup
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters["profile/check"]
        },
    },
    data() {
        return {
            imagePopup: false,
            contactPopup: false,
            thumbnail: null,
            propertyImages: [],
            property: null,
            isSaved: false,
            savedLoading: false,
            openShare: false
        }
    },
    methods: {
        closeSharePopup() {
            this.openShare = false
        },
        openImagePopup() {
            this.imagePopup = true
        },
        closeImagePopup() {
            this.imagePopup = false
        },
        closeContactPopup() {
            this.contactPopup = false
        },
        getSymbol() {
            if (this.property.price.currency === "NGN") {
                return "₦"
            } else if (this.property.price.currency === "GHS") {
                return "₵"
            } else if (this.property.price.currency === "USD") {
                return "$"
            } else if (this.property.price.currency === "ZAR") {
                return "R"
            } else {
                return ""
            }
        },
        commaPrice() {
            return this.property.price.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
        getProperty() {
            this.$axios.get(`/place/${this.$route.params.id}`)
            .then(result => {
                const property = result.data
                this.property = property
            })
            .catch(e => {
                console.log(e);
            })
        },
        getPhoto() {
            this.$axios.get(`/place/${this.$route.params.id}/onephoto`)
            .then(result => {
                const img = result.data.location
                this.thumbnail = img
            })
            .catch(e => {
                console.log("failed to get card image");
            })
        },
        getPropertyImages() {
            this.$axios.get(`/place/${this.$route.params.id}/photo`)
            .then(result => {
                const images = result.data
                this.propertyImages = images
            })
            .catch(e => {
                console.log("failed to get card image");
            })
        },
        getsaved() {
            if (!this.isLoggedIn) {
                return
            }
            this.savedLoading = true
            this.$axios.get(`/favorite/${this.$route.params.id}`)
            .then(result => {
                this.isSaved = result.data.saved
                this.savedLoading = false
            })
            .catch(e => {
                this.savedLoading = false
            })
        },
        saveProperty() {
            if (!this.isLoggedIn) {
                return this.$router.push("/login")
            }
            this.savedLoading = true
            this.$axios.post(`/favorite/${this.$route.params.id}`)
            .then(result => {
                this.isSaved = true
                return this.savedLoading = false
            })
            .catch(e => {
                return this.savedLoading = false
            })
        },
        unsaveProperty() {
            this.savedLoading = true
            this.$axios.delete(`/favorite/${this.$route.params.id}`)
            .then(result => {
                this.isSaved = false
                return this.savedLoading = false
            })
            .catch(e => {
                return this.savedLoading = false
            })
        }
    },
    mounted() {
        this.getProperty()
        this.getsaved()
        this.getPhoto()
        this.getPropertyImages()
    }
}
</script>

<style>
/* margin and padding styling starting */
.m-t-b {
    margin: 1.4rem 0;
}

.c-point {
    cursor: pointer;
}

.p-t-b {
    padding: 1.4rem 0;
}

.b-b {
    border-bottom: 2px solid var(--color-gray);
}

.b-t {
    border-top: 2px solid var(--color-gray);
}

.p-l-r {
    padding: 0 2rem;
}

.p-l {
    padding-left: 2rem;
}

.m-l {
    margin-left: 1.3rem;
}

.m-l-mini {
    margin-left: .3rem;
}

.m-r-mini {
    margin-right: .3rem;
}

.p-r {
    padding-right: 2rem;
}

.p-b {
    padding-bottom: .7rem;
}

.n-font {
    font-size: 1.1rem;
    font-weight: 500;
}

.full-width {
    width: 100%;
}

.s-btw {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
}

.s-cent {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}

.f-st {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

.f-col {
    display: flex;
    flex-direction: column;
}
/* margin and padding styling ending */

.p-d-image-area {
    position: relative;
    height: 300px;
    cursor: pointer;
    width: 100%;
}

.p-d-image-area:hover img {
    -webkit-filter: brightness(0.9); /* Safari 6.0 - 9.0 */
    filter: brightness(0.9);
}

.p-d-image {
    width: 100%;
    height: 100%;
    border-radius: 10px;
}

.img-price {
    color: var(--color-white);
    background: rgba(35, 62, 134, .7);
    padding: 1px 10px;
    height: 26px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: .9rem;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}

.img-count {
    color: var(--color-white);
    background: rgba(34, 34, 34, 0.48);
    padding: 1px 10px;
    height: 26px;
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size: .9rem;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}

.img-count-no {
    font-size: .8rem;
}

.p-d-det {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.flex-c-full {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.general-title {
    font-size: 1.1rem;
    font-weight: 500;
}

.general-tags {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.p-d-cont-det-image {
    height: 30px;
    width: 30px;
    border-radius: 100%;
    display: block;
    overflow: hidden;
}

.p-d-cont-det-name {
    font-size: 1rem;
    font-weight: 400;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    margin-left: .7rem;
}

.p-d-cont-det-verified {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    margin-left: .3rem;
}

.p-d-cont-det {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.p-d-cont-link {
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
}

.p-d-cont-det-image img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    display: block;
}

.p-d-cont {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.p-d-det-cont {
    font-weight: 400;
}

.propimage {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.p-d-title-cont {
    font-size: 1.2rem;
    font-weight: 500;
}

.desktop-only {
    display: none;
}

.hidecheckbox {
    display: none;
}

.collapsed-item {
    display: none;
}

.hidecheckbox:checked + .collapsed-item {
    display: flex;
}

@media only screen and (min-width: 1000px) {
    .p-d-image-area {
        height: 400px;
    }

    .mobile-only {
        display: none;
    }

    .desktop-only {
        display: flex;
    }
}
</style>