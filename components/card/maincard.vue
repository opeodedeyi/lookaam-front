<template>
    <nuxt-link v-if="hasLikebtn" :to="to" class="main-card" :class="[typeofcard]">
        <img v-if="photo" :src="photo" alt="ima"  class="main-card-area cardimage"/>
        <img v-else src="~/assets/images/cardimage.webp" alt="ima"  class="main-card-area cardimage"/>
        <div class="main-card-area cardtext">
            <div class="card-top">
                <save v-if="!liked"></save>
                <saved v-else></saved>
            </div>
            <div class="card-bottom">
                <p class="card-p-title">{{ Ptitle | shortenText(24, '...') }}</p>
                <p class="card-p-type">{{ Ptype }}</p>
                <p class="card-p-price"><span class="cless">{{ Pprice }}</span>/day</p>
            </div>
        </div>
    </nuxt-link>

    <nuxt-link v-else :to="to" class="main-card" :class="[typeofcard]">
        <img v-if="photo" :src="photo" alt="ima"  class="main-card-area cardimage"/>
        <img v-else src="~/assets/images/cardimage.webp" alt="ima"  class="main-card-area cardimage"/>
        <div class="card-top">

        </div>
        <div class="card-bottom">
            <p class="card-p-title">{{ Ptitle | shortenText(24, '...') }}</p>
            <p class="card-p-type">{{ Ptype }}</p>
            <p class="card-p-price"><span class="cless">{{ Pprice }}</span>/day</p>
        </div>
    </nuxt-link>
</template>

<script>
import save from "@/components/utilities/save";
import saved from "@/components/utilities/saved";

export default {
    components: {
        save,
        saved
    },
    props: {
        typeofcard: {
            type: String,
            required: false,
            default: "gridd"
        },
        hasLikebtn : {
            // has like 
            // has option
            type: Boolean,
            required: false,
            default: true
        },
        to: {
            type: String,
            required: false,
            default: '/'
        },
        id: {
            type: String,
            required: false,
        },
        liked: {
            type: Boolean,
            required: false,
            default: false
        },
        Ptitle: {
            type: String,
            required: true
        },
        Ptype: {
            type: String,
            required: true
        },
        Pprice: {
            type: Number,
            required: true
        },
        Pimage: {
            type: String,
            required: false
        },
    },
    data() {
        return {
            loading: false,
            photo: null
        }
    },
    methods: {
        getPhoto() {
            this.loading = true
            this.$axios.get(`/place/${this.id}/onephoto`)
            .then(result => {
                const img = result.data.location
                this.photo = img
                this.loading = false
            })
            .catch(e => {
                console.log("failed to get card image");
                this.loading = false
            })
        }
    },
    mounted() {
        this.getPhoto()
    }
}
</script>

<style scoped>
p {
    color: var(--color-white);
}

.card-p-type,
.card-p-title {
    font-size: 1.1rem;
}

.cless {
    font-size: .9rem;
}

.card-p-title {
    font-weight: 500;
    line-height: 1rem;
}

.card-p-type,
.card-p-price {
    font-weight: 300;
}

.main-card {
    border-radius: 5px;
}

.main-card:hover img {
    filter: grayscale(100%);
}

.cardimage,
.cardtext {
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 5px;
}

.cardimage {
    object-fit: cover;
}

.cardtext {
    z-index: 2;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 1rem;
    background: linear-gradient(180deg, rgba(34, 34, 34, 0) 0%, rgba(34, 34, 34, 0.35) 37.29%, rgba(34, 34, 34, 0.85) 100%);
}

.card-top {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
}

.card-bottom {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.card-p-price {
    align-self: flex-end;
}

.flexx {
    position: relative;
    height: 230px;
    width: 250px;
    margin-right: 1rem;
}

/* Small screens */
.gridd {
    position: relative;
    grid-column: span 12;
    height: 230px;
}

/* Screen gets bigger */
@media only screen and (min-width: 572px) {
    .gridd {
        grid-column: span 6;
        height: 200px;
    }
}

@media only screen and (min-width: 840px) {
    .gridd {
        grid-column: span 4;
    }
}

@media only screen and (min-width: 1149px) {
    .gridd {
        grid-column: span 3;
    }
}

@media only screen and (min-width: 1300px) {
    .gridd {
        grid-column: span 3;
    }
}
</style>