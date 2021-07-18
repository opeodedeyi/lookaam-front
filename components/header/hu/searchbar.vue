<template>
    <div class="search-box">
        <searchicon class="searchsvg"/>
        <input type="text" class="search-input" placeholder="Search for a location" @keypress="search" v-model="terms" @keyup="updateST">
    </div>
</template>

<script>
import searchicon from "@/components/utilities/searchicon.vue";

export default {
    components: {
        searchicon
    },
    data() {
        return {
            terms: null || this.$route.query.search,
            form: {
                typeof: null,
                idealfor: [],
                amenities: []
            }
        }
    },
    methods: {
        updateST() {
            this.$store.commit("search/updateRTSearchTerms", this.terms);
        },
        search(event) {
            const btn = event.key;
            if (btn === "Enter") {
                const search_terms = this.terms;
                this.$store.dispatch("search/search", {search_terms, search_query: this.form});
                this.$router.push(`/search?search=${search_terms}`);
            }
        }
    },
}
</script>

<style scoped>
    .search-box {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        padding: 0 18px;
        height: 42px;
        width: 100%;
        max-width: 600px;
        border-radius: 25px;
        background-color: var(--color-gray);
    }

    .searchsvg {
        padding-right: 5px;
    }

    input {
        border: 0px;
        background-color: var(--color-gray);
        height: 38px;
        width: 90%;
        font-size: .9rem;
    }

    input:focus {
        outline: none;
    }

/* Small screens */
@media only screen and (max-width: 999.9px) {
    .search-box {
        height: 40px;
        max-width: 990px;
    }

    input {
        color: var(--color-dark);
        font-size: 1rem;
    }
}

/* Larger screens */
@media only screen and (min-width: 1260px) {
    .search-box {
        width: 70%;
    }
}
</style>
