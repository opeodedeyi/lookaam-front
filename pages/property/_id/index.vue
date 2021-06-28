<template>
    <propdetailslayout>
        <template v-slot:default>
            <div class="p-d-image-area" @click.prevent="openImagePopup">
                <!-- contains image thumbnail -->
                <img v-if="thumbnail" :src="thumbnail" alt="ima"  class="p-d-image propimage"/>
                <img v-else src="~/assets/images/cardimage.webp" alt="ima"  class="p-d-image propimage"/>
            </div>
            <!-- mobile only save and share goes here -->
            <div class="p-d-title p-t-b b-b" v-if="propertyDetails.title"><!-- contains title -->
                <p class="p-d-title-cont">{{ propertyDetails.title }}</p>
            </div>
            <div class="p-d-det p-t-b b-b"><!-- contains basic details like (typeof, size, maxguest, rooms, toilets about the property) -->
                <p v-if="propertyDetails.typeof" class="p-d-det-cont p-r">{{ propertyDetails.typeof }}</p>
                <p v-if="propertyDetails.size" class="p-d-det-cont p-r">{{ propertyDetails.size }} sq/ft</p>
                <p v-if="propertyDetails.maxguest" class="p-d-det-cont p-r">{{ propertyDetails.maxguest }} guests</p>
                <p v-if="propertyDetails.rooms" class="p-d-det-cont p-r">{{ propertyDetails.rooms }} room(s)</p>
                <p v-if="propertyDetails.toilet" class="p-d-det-cont p-r">{{ propertyDetails.toilet }} toilet(s)</p>
            </div>
            <div class="p-d-cont p-t-b b-b"><!-- contains owner of property -->
                <div class="p-d-cont-det">
                    <div class="p-d-cont-det-image">
                        <img v-if="propertyDetails.user.photo" :src="propertyDetails.user.photo" alt="">
                        <img v-else src="~/assets/images/pp.webp" alt="">
                    </div>
                    <p class="p-d-cont-det-name">by {{ propertyDetails.user.fullname | shortenText(14, '...') }}</p>
                    <div class="p-d-cont-det-verified"><img src="~/assets/svg/verified.svg" v-if="propertyDetails.user.isVerified" alt=""><img src="~/assets/svg/notverified.svg" v-else alt=""></div>
                </div>
                <div class="p-d-cont-link"  @click.prevent="openContactPopup">Contact Host</div>
            </div>
            <div class="flex-c-full p-t-b b-b mobile-only"><!-- contains location of the property -->
                <p class="general-title p-b">Location</p>
                <p class="general-text">{{ propertyDetails.street }}, {{ propertyDetails.city }}, {{ propertyDetails.state }}, {{ propertyDetails.country }}, {{ propertyDetails.zip }}</p>
            </div>
            <div v-if="propertyDetails.description" class="flex-c-full p-t-b b-b"><!-- contains description of the property -->
                <p class="general-text">{{ propertyDetails.description }}</p>
            </div>
            <div v-if="propertyDetails.rules" class="flex-c-full p-t-b b-b desktop-only"><!-- {{{ desktop }}} only rules of the property -->
                <p class="general-title p-b">Rules</p>
                <p class="general-text">{{ propertyDetails.rules }}</p>
            </div>
            <div v-if="propertyDetails.idealfor.length>0" class="flex-c-full p-t-b b-b mobile-only"><!-- {{{ mobile }}} only property is ideal for -->
                <label for="propertydetails" class="general-title p-b s-btw"><p>Ideal for</p><img src="~/assets/svg/selectarrow.svg" alt=""></label>
                <input type="checkbox" name="propertydetails" id="propertydetails" class="hidecheckbox">
                <div class="general-tags collapsed-item">
                    <basetag v-for="item in propertyDetails.idealfor" :key="item">{{item}}</basetag>
                </div>
            </div>
            <div v-if="propertyDetails.amenities.length>0" class="flex-c-full p-t-b b-b mobile-only"><!-- {{{ mobile }}} only property Amenities -->
                <label for="amenitiesdetails" class="general-title p-b s-btw"><p>Amenities</p><img src="~/assets/svg/selectarrow.svg" alt=""></label>
                <input type="checkbox" name="amenitiesdetails" id="amenitiesdetails" class="hidecheckbox">
                <div class="general-tags collapsed-item">
                    <basetag v-for="item in propertyDetails.amenities" :key="item">{{item}}</basetag>
                </div>
            </div>
            <div v-if="propertyDetails.accessibility.length>0" class="flex-c-full p-t-b b-b mobile-only"><!-- {{{ mobile }}} only property accessibility -->
                <label for="accessibilitydetails" class="general-title p-b s-btw"><p>Accessibility</p><img src="~/assets/svg/selectarrow.svg" alt=""></label>
                <input type="checkbox" name="accessibilitydetails" id="accessibilitydetails" class="hidecheckbox">
                <div class="general-tags collapsed-item">
                    <basetag v-for="item in propertyDetails.accessibility" :key="item">{{item}}</basetag>
                </div>
            </div>
            <!-- Add {{{ mobile }}} only availability -->
            <div v-if="propertyDetails.rules" class="flex-c-full p-t-b b-b mobile-only"><!-- {{{ mobile }}} only property rules -->
                <label for="rules" class="general-title p-b s-btw"><p>Rules</p><img src="~/assets/svg/selectarrow.svg" alt=""></label>
                <input type="checkbox" name="rules" id="rules" class="hidecheckbox">
                <p class="general-text collapsed-item">{{ propertyDetails.rules }}</p>
            </div>
        </template>
        
        <template v-slot:prop-right> <!-- desktop content on right side of page -->
            <!-- {{{ desktop }}} only save and share goes here -->
            <div class="flex-c-full p-t-b b-b"><!-- contains location of the property -->
                <p class="general-title p-b">Location</p>
                <p class="general-text">{{ propertyDetails.street }}, {{ propertyDetails.city }}, {{ propertyDetails.state }}, {{ propertyDetails.country }}, {{ propertyDetails.zip }}</p>
            </div>
            <div v-if="propertyDetails.idealfor.length>0" class="flex-c-full p-t-b b-b"><!-- contains what the property is ideal for -->
                <p class="general-title p-b">Ideal for</p>
                <div class="general-tags">
                    <basetag v-for="item in propertyDetails.idealfor" :key="item">{{item}}</basetag>
                </div>
            </div>
            <div v-if="propertyDetails.amenities.length>0" class="flex-c-full p-t-b b-b"><!-- contains what the property amenities are -->
                <p class="general-title p-b">Amenities</p>
                <div class="general-tags">
                    <basetag v-for="item in propertyDetails.amenities" :key="item">{{item}}</basetag>
                </div>
            </div>
            <div v-if="propertyDetails.accessibility.length>0" class="flex-c-full p-t-b b-b"><!-- contains what the property accessibilities are -->
                <p class="general-title p-b">Accessibility</p>
                <div class="general-tags">
                    <basetag v-for="item in propertyDetails.accessibility" :key="item">{{item}}</basetag>
                </div>
            </div>
            <div class="flex-c-full p-t-b"><!-- contains opening and cloaing time -->
                <p class="general-title p-b">Availability</p>
                
            </div>
        </template>
    </propdetailslayout>
</template>

<script>
import propdetailslayout from "@/components/layout/propdetailslayout";
import basetag from "@/components/utilities/basetag";

export default {
    components: {
        propdetailslayout,
        basetag
    },
    data() {
        return {
            imagePopup: false,
            thumbnail: null,
            propertyImages: [],
            propertyDetails: {
                // user details start
                user: {
                    photo: null,
                    fullname: "kfdnfkjdnkjfdnjfdnkjdfnkjfdnkjfdnkjfdnkjfdn",
                    email: null,
                    isVerified: false
                },
                // user details end
                title: "Royal gerden mansion",
                typeof: "Restaurant",
                toilet: "1",
                rooms: "1",
                size: "125",
                maxguest: "1000",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                rules: "No smoking, drinking, fighting",
                // location start,
                country: 'Nigeria',
                street: "Lorem ipsum",
                city: "null",
                state: "null",
                zip: null,
                // location end,
                // Timing start,
                alwaysopen: true,
                open: "12:30",
                close: "21:00",
                // Timing end,
                idealfor: ["reception", "production", "meeting", "performance", "dinner", "wedding"],
                amenities: ["electricity", "a/c", "wifi", "sound system", "private entrance", "kitchen", "large table", "tv"],
                accessibility: ["wheelchair", "elevator", "on-site parking", "parking near by", "stairs"],
            }
        }
    },
    methods: {
        openImagePopup() {
            console.log("image popup opened");
        },
        openContactPopup() {
            console.log("contact popup opened");
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
        }
    },
    mounted() {
        this.getPhoto()
    }
}
</script>

<style>
/* margin and padding styling starting */
.m-t-b {
    margin: 1.4rem 0;
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

.p-r {
    padding-right: 2rem;
}

.p-b {
    padding-bottom: .7rem;
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