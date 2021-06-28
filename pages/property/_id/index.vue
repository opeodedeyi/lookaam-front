<template>
    <!-- <div class="property-details-container">
        property {{ $route.params.id }}
    </div> -->
    <propdetailslayout>
        <template v-slot:default>
            <div class="p-d-image-area" @click.prevent="openImagePopup">
                <!-- contains image thumbnail -->
                <img v-if="thumbnail" :src="thumbnail" alt="ima"  class="p-d-image propimage"/>
                <img v-else src="~/assets/images/cardimage.webp" alt="ima"  class="p-d-image propimage"/>
            </div>
            <!-- mobile only save and share goes here -->
            <div class="p-d-title m-t-b">
                <!-- contains title -->
                <p v-if="propertyDetails.title" class="p-d-title-cont">{{ propertyDetails.title }}</p>
                <p v-else class="p-d-title-cont">No Title</p>
            </div>
            <div class="p-d-det p-t-b b-b b-t">
                <!-- contains basic details like (typeof,size, maxguest, rooms,toilets about the property) -->
                <p v-if="propertyDetails.typeof" class="p-d-det-cont p-r">{{ propertyDetails.typeof }}</p>
                <p v-if="propertyDetails.size" class="p-d-det-cont p-r">{{ propertyDetails.size }} sq/ft</p>
                <p v-if="propertyDetails.maxguest" class="p-d-det-cont p-r">{{ propertyDetails.maxguest }} guests</p>
                <p v-if="propertyDetails.rooms" class="p-d-det-cont p-r">{{ propertyDetails.rooms }} room(s)</p>
                <p v-if="propertyDetails.toilet" class="p-d-det-cont p-r">{{ propertyDetails.toilet }} toilet(s)</p>
            </div>
            <div class="p-d-cont p-t-b b-b">
                <!-- contains owner of property -->
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
            <!-- mobile only location -->
        </template>
        
        <template v-slot:prop-right>
            
        </template>
    </propdetailslayout>
</template>

<script>
import propdetailslayout from "@/components/layout/propdetailslayout";

export default {
    components: {
        propdetailslayout
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
                title: null,
                typeof: "Restaurant",
                toilet: "1",
                rooms: "1",
                size: "125",
                maxguest: "1000"
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
/* margin and padding styling ending */

.p-d-image-area {
    position: relative;
    height: 400px;
    cursor: pointer;
    width: 100%;
}

.p-d-image-area:hover img {
    -webkit-filter: blur(1px); /* Safari 6.0 - 9.0 */
    filter: blur(1px);
}

.p-d-image {
    width: 100%;
    height: 100%;
}

.p-d-det {
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
    border-radius: 5px;
    object-fit: cover;
}

.p-d-title-cont {
    font-size: 1.2rem;
    font-weight: 500;
}

@media only screen and (max-width: 999.9px) {
    .p-d-image-area {
        height: 300px;
    }
}
</style>