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
                <p class="card-p-price" v-if="Pprice"><span class="cless">{{ getSymbol }}{{ commaPrice }}</span>/{{ Pper }}</p>
            </div>
        </div>
    </div>

    <div v-else :to="to" @click="forwardProperty(to)" class="main-card" :class="[typeofcard]">
        <img v-if="photo" :src="photo" alt="ima"  class="main-card-area cardimage"/>
        <img v-else src="~/assets/images/cardimage.webp" alt="ima"  class="main-card-area cardimage"/>
        <div class="main-card-area cardtext">
            <div class="card-top">
                <div @click.stop="optionShown=!optionShown">
                    <cardloading v-if="optionsLoading"></cardloading>
                    <div class="optionBtn" v-else>
                        <img v-if="!optionShown" src="~/assets/svg/optionsmore.svg" alt="" />
                        <img v-if="optionShown" src="~/assets/svg/optionsless.svg" alt="" />
                    </div>
                </div>
                <ul class="carddropdown" :class="{ show: optionShown }">
                    <li @click.stop="forwardEditProperty" class="first">Edit</li>
                    <li @click.stop="deactivateProperty" v-if="PActive" class="mid">Deactivate</li>
                    <li @click.stop="reactivateProperty" v-else>Activate</li>
                    <!-- <li @click.prevent="openDateModal">Block or reactivate dates</li> -->
                    <li @click.stop="deleteProperty" class="last delete-link">Delete</li>
                </ul>
            </div>
            <div class="card-bottom">
                <p class="card-p-title" v-if="Ptitle">{{ Ptitle | shortenText(24, '...') }}</p>
                <p class="card-p-type">{{ Ptype | shortenText(24, '...') }}</p>
                <p class="card-p-price" v-if="Pprice"><span class="cless">{{ getSymbol }}{{ commaPrice }}</span>/{{ Pper }}</p>
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
        Pper: {
            type: String,
            required: false
        },
        Pimage: {
            type: String,
            required: false
        },
        PActive: {
            type: Boolean,
            required: false,
        }
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
            optionsLoading: false,
            isSaved: false,
            optionShown: false
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
            if (!this.isLoggedIn) {
                return
            }
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
            // let routeData = this.$router.resolve(link);
            // window.open(routeData.href, '_blank');
        },
        forwardEditProperty() {
            let newLink = `/property/${this.id}/edit`
            this.$router.push(newLink);
            // let routeData = this.$router.resolve(newLink);
            // window.open(routeData.href, '_blank');
        },
        deactivateProperty() {
            this.optionsLoading = true
            this.optionShown = false
            this.$axios.delete(`/place/${this.id}/active`)
            .then(result => {
                this.$emit("remove-property", this.id);
                return this.optionsLoading = false
            })
            .catch(e => {
                return this.optionsLoading = false
            })
        },
        deleteProperty() {
            this.optionsLoading = true
            this.optionShown = false
            this.$axios.delete(`/place/${this.id}`)
            .then(result => {
                this.$emit("remove-property", this.id);
                return this.optionsLoading = false
            })
            .catch(e => {
                return this.optionsLoading = false
            })
        },
        reactivateProperty() {
            this.optionsLoading = true
            this.optionShown = false
            this.$axios.patch(`/place/${this.id}/active`)
            .then(result => {
                this.$emit("remove-property", this.id);
                return this.optionsLoading = false
            })
            .catch(e => {
                return this.optionsLoading = false
            })
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
    -webkit-filter: brightness(0.9); /* Safari 6.0 - 9.0 */
    filter: brightness(0.9);
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
    position: relative; /* work to be done here */
}

.carddropdown {
    position: absolute;
    top: 30px;
    list-style: none;
    width: 180px;
    right: 0.3rem;
    padding: .5rem 1.2rem;
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-darker);
    border-radius: 10px;
    display: none;
    z-index: 10;
}

.delete-link {
    color: var(--color-danger);
}

ul {
    padding: 0;
    margin: 0;
    border-radius: 20px;
}

li {
    padding-top: 5px;
    padding-bottom: 5px;
    width: 100%;
    padding-left: 0;
}

li:hover {
    cursor: pointer;
    color: var(--color-company);
}

.show {
    display: block;
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

.optionBtn {
    z-index: 5;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    background-color: var(--color-dark);
    border: 2px solid var(--color-white);
}

.optionBtn img {
    height: 16px;
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