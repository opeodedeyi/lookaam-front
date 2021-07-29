<template>
    <div class="search-container">
        <secondheader></secondheader>
        <loadinglayout v-if="loading"></loadinglayout>
        <gridlayout v-else-if="myDeactivatedProperties.length>0" @load-more="loadMoreResult">
            <app-main-card 
                :hasLikebtn="false"
                v-for="result in myDeactivatedProperties"
                :key="result._id"
                :id="result._id"
                hasLike="true" 
                :to="`/property/${result._id}`"  
                :Ptitle="result.title"
                :Ptype="result.typeof"
                :Pprice="result.price.amount"
                :Pcurrency="result.price.currency"
                :PActive="false"
                @remove-property="removeProperty(result._id)">
            </app-main-card>
        </gridlayout>
        <centerlayout v-else>
        <template v-slot:default>
            <p class="no-content-text">You have no deactivated place</p>
        </template>
        </centerlayout>
    </div>
</template>

<script>
import secondheader from "@/components/header/secondheader";
import gridlayout from "@/components/layout/gridlayout";
import loadinglayout from "@/components/layout/loadinglayout";
import centerlayout from "@/components/layout/centerlayout";
import maincard from "@/components/card/maincard.vue";

export default {
    middleware: 'isAuth',
    components: { 
        secondheader,
        'app-main-card': maincard,
        gridlayout,
        loadinglayout,
        centerlayout,
    },
    data() {
        return {
            myDeactivatedProperties: [],
            loading: false,
            next: null,
            previous: null,
            limit: 15
        }
    },
    methods: {
        getdeactivePlaces() {
            this.loading = true
            this.$axios
            .get('/mydeactivatedplaces?', { params: 
                {
                    page: 1,
                    limit: this.limit
                }
            })
            .then(result => {
                this.loading = false
                this.next = result.data.next
                this.myDeactivatedProperties = result.data.results
                console.log(this.next);
            })
            .catch(e => {
                console.log(e);
            })
        },
        loadMoreResult() {
            if (!this.next) {
                return
            }
            console.log("loading");
            this.$axios
            .get('/mydeactivatedplaces?', { params: 
                {
                    page: this.next,
                    limit: this.limit
                }
            })
            .then(result => {
                console.log(result);
                this.next = result.data.next
                let newResult = result.data.results
                let resultToPatch = this.myDeactivatedProperties
                if (!!result.data.next) {
                    this.next = result.data.next
                } else {
                    this.next = null
                }
                newResult.forEach(property => {
                    resultToPatch.push(property)
                });
                this.myDeactivatedProperties = resultToPatch
            })
            .catch(e => {
                console.log(e);
            })
        },
        removeProperty(receivedId) {
            const propToEdit = this.myDeactivatedProperties
            const filteredProperties = propToEdit.filter((item) => {
                return item._id !== receivedId
            })
            this.myDeactivatedProperties = filteredProperties
        }
    },
    mounted() {
        this.getdeactivePlaces()
    }
}
</script>

<style scoped>
.search-container {
    padding: 0 50px;
}

.no-content-text {
    color: var(--color-dark);
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
}

@media only screen and (max-width: 999.9px) {
    .search-container {
        padding: 0 20px;
    }
}
</style>