<template>
    <div v-if="hasLikebtn" @click="forwardProperty(to)" class="main-card" :class="[typeofcard]">
        <img v-if="photo" :src="photo" alt="ima"  class="main-card-area cardimage"/>
        <img v-else src="~/assets/images/cardimage.webp" alt="ima"  class="main-card-area cardimage"/>
        <div class="main-card-area cardtext">
            <div v-if="isLoggedIn" class="card-top">
                <div @click.stop="toggleSave">
                    <cardloading v-if="savedLoading"></cardloading>
                    <save v-if="!savedLoading && !isSaved"></save>
                    <saved v-if="!savedLoading && isSaved"></saved>
                </div>
            </div>
            
            <div class="card-top very-empty" v-else></div>
            <div class="card-bottom">
                <p class="card-p-title" v-if="Ptitle">{{ Ptitle | shortenText(24, '...') }}</p>
                <p class="card-p-type">{{ Ptype | shortenText(24, '...') }}</p>
                <p class="card-p-price" v-if="Pprice"><span class="cless">{{ getSymbol }}{{ commaPrice }}</span>/day</p>
            </div>
        </div>
    </div>

    <div v-else :to="to" @click="forwardProperty(to)" class="main-card" :class="[typeofcard]">
        <img v-if="photo" :src="photo" alt="ima"  class="main-card-area cardimage"/>
        <img v-else src="~/assets/images/cardimage.webp" alt="ima"  class="main-card-area cardimage"/>
        <div class="main-card-area cardtext">
            <div class="card-top">

            </div>
            <div class="card-bottom">
                <p class="card-p-title" v-if="Ptitle">{{ Ptitle | shortenText(24, '...') }}</p>
                <p class="card-p-type">{{ Ptype }}</p>
                <p class="card-p-price" v-if="Pprice"><span class="cless">{{ getSymbol }}{{ commaPrice }}</span>/day</p>
            </div>
        </div>
    </div>
</template>

<script>
import save from "@/components/utilities/save";
import saved from "@/components/utilities/saved";
import cardloading from "@/components/utilities/cardloading";


export default {
    components: {
        save,
        saved,
        cardloading
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
            required: false
        },
        Ptype: {
            type: String,
            required: true
        },
        Pprice: {
            type: Number,
            required: true
        },
        Pcurrency: {
            type: String,
            required: false
        },
        Pimage: {
            type: String,
            required: false
        },
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters["profile/check"]
        },
        getSymbol() {
            if (this.Pcurrency === "NGN") {
                return "₦"
            } else if (this.Pcurrency === "GHS") {
                return "₵"
            } else if (this.Pcurrency === "USD") {
                return "$"
            } else if (this.Pcurrency === "ZAR") {
                return "R"
            } else {
                return ""
            }
        },
        commaPrice() {
            return this.Pprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    },
    data() {
        return {
            loading: false,
            photo: null,
            savedLoading: false,
            isSaved: false
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
        },
        getsaved() {
            this.savedLoading = true
            this.$axios.get(`/favorite/${this.id}`)
            .then(result => {
                this.isSaved = result.data.saved
                this.savedLoading = false
            })
            .catch(e => {
                this.savedLoading = false
            })
        },
        toggleSave(e) {
            e.stopPropagation();
            if (this.isSaved===true) {
                this.savedLoading = true
                this.$axios.delete(`/favorite/${this.id}`)
                .then(result => {
                    console.log(result);
                    this.isSaved = false
                    return this.savedLoading = false
                })
                .catch(e => {
                    return this.savedLoading = false
                })
            } else {
                this.savedLoading = true
                this.$axios.post(`/favorite/${this.id}`)
                .then(result => {
                    console.log(result);
                    this.isSaved = true
                    return this.savedLoading = false
                })
                .catch(e => {
                    return this.savedLoading = false
                })
            }
        },
        forwardProperty(link) {
            this.$router.push(link);
        }
    },
    mounted() {
        this.getsaved()
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
    cursor: pointer;
}

.main-card:hover img {
    -webkit-filter: blur(1px); /* Safari 6.0 - 9.0 */
    filter: blur(1px);
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

.very-empty {
    content: "";
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