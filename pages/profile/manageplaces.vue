<template>
    <div class="search-container">
        <secondheader></secondheader>
        <loadinglayout v-if="loading"></loadinglayout>
        <gridlayout v-else-if="myProperties.length>0" @load-more="loadMoreResult">
            <app-main-card 
                :hasLikebtn="false"
                v-for="result in myProperties"
                :key="result._id"
                :id="result._id"
                hasLike="true" 
                :to="`/property/${result._id}`"  
                :Ptitle="result.title"
                :Ptype="result.typeof"
                :Pprice="result.price.amount"
                :Pcurrency="result.price.currency"
                :Pper="result.price.per"
                :PActive="true"
                @remove-property="removeProperty(result._id)">
            </app-main-card>
            <loadingcard v-if="next"></loadingcard>
        </gridlayout>
        <centerlayout v-else>
        <template v-slot:default>
            <p class="no-content-text">You don't have any active place that you created</p>
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
import loadingcard from "@/components/card/loadingcard.vue";

export default {
    middleware: 'isAuth',
    components: { 
        secondheader,
        'app-main-card': maincard,
        loadingcard,
        gridlayout,
        loadinglayout,
        centerlayout,
    },
    data() {
        return {
            myProperties: [],
            loading: false,
            next: null,
            previous: null
        }
    },
    methods: {
        getActivePlaces() {
            this.loading = true
            this.$axios
            .get('/myactiveplaces?', { params: 
                {
                    page: 1,
                    limit: 15
                }
            })
            .then(result => {
                this.loading = false
                this.next = result.data.next
                this.myProperties = result.data.results
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
            this.$axios
            .get('/myactiveplaces?', { params: 
                {
                    page: this.next,
                    limit: 15
                }
            })
            .then(result => {
                console.log(result);
                this.next = result.data.next
                let newResult = result.data.results
                let resultToPatch = this.myProperties
                if (!!result.data.next) {
                    this.next = result.data.next
                } else {
                    this.next = null
                }
                newResult.forEach(property => {
                    resultToPatch.push(property)
                });
                this.myProperties = resultToPatch
            })
            .catch(e => {
                console.log(e);
            })
        },
        removeProperty(receivedId) {
            const propToEdit = this.myProperties
            const filteredProperties = propToEdit.filter((item) => {
                return item._id !== receivedId
            })
            this.myProperties = filteredProperties
        }
    },
    mounted() {
        this.getActivePlaces()
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