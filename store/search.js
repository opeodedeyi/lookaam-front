export const state = () => ({
    rtSearchTerms: null,
    searchTerms: null,
    loading: false,
    result: []
})
 
export const mutations = {
    searchTerms(state, text) {
        state.searchTerms = text
    },
    searchResult(state, result) {
        state.result = result
    },
    loadingFalse(state) {
        state.loading = false
    },
    loadingTrue(state) {
        state.loading = true
    },
    updateRTSearchTerms(state, payload) {
        state.rtSearchTerms = payload
    }
}
 
export const actions = {
    search(vuexContext, {search_terms, search_query}) {
        vuexContext.commit('loadingTrue')
        return this.$axios
        .$get('/place', { params: 
            {
                search: search_terms,
                typeof: search_query.typeof,
                idealfor: search_query.idealfor,
                amenities: search_query.amenities,
                page: 1,
                limit: 15,
                img: true,
            }
        })
        .then(data => {
            let searchResult = data.results
            console.log(search_query);
            vuexContext.commit('searchResult', searchResult)
            vuexContext.commit('loadingFalse')
        })
        .catch(e => {
            console.log(e)
            vuexContext.commit('loadingFalse')
        })
    },
}
 
export const getters = {
    searchTerms(state) {
        return state.searchTerms
    },
    searchResult(state) {
        return state.result
    },
    loading(state) {
        return state.loading
    },
    rtSearchTerms(state) {
        return state.rtSearchTerms
    }
}