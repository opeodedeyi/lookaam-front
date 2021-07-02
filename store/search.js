export const state = () => ({
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
    }
}
 
export const actions = {
    search(vuexContext, search_terms) {
        vuexContext.commit('loadingTrue')
        return this.$axios
        .$get('/place', { params: 
            {
                search: search_terms,
                page: 1,
                limit: 15,
            }
        })
        .then(data => {
            let searchResult = data.results
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
    }
}