export const state = () => ({
    rtSearchTerms: null,
    searchTerms: null,
    loading: false,
    result: [],
    page: 1,
    limit: 15,
    next: null,
    previous: null
})
 
export const mutations = {
    searchTerms(state, text) {
        state.searchTerms = text
    },
    searchResult(state, result) {
        state.result = result
    },
    addToResult(state, newResult) {
        let resultToPatch = state.result
        newResult.forEach(property => {
            resultToPatch.push(property)
        });
        state.result = resultToPatch
    },
    setNext(state, payload) {
        state.next = payload
    },
    loadingFalse(state) {
        state.loading = false
    },
    loadingTrue(state) {
        state.loading = true
    },
    resetSearch(state) {
        state.page = 1
        state.next = null
        state.previous = null
    },
    updateRTSearchTerms(state, payload) {
        state.rtSearchTerms = payload
    }
}
 
export const actions = {
    search(vuexContext, {search_terms, search_query}) {
        vuexContext.commit('loadingTrue')
        vuexContext.commit('resetSearch')
        return this.$axios
        .$get('/place', { params: 
            {
                search: search_terms,
                typeof: search_query.typeof,
                idealfor: search_query.idealfor,
                amenities: search_query.amenities,
                page: vuexContext.getters.pageNo,
                limit: vuexContext.getters.limitNo,
                img: true,
            }
        })
        .then(data => {
            let searchResult = data.results
            let nextNumber = null
            if (!!data.next) {
                nextNumber = data.next
            }
            vuexContext.commit('searchResult', searchResult)
            vuexContext.commit('setNext', nextNumber)
            vuexContext.commit('loadingFalse')
        })
        .catch(e => {
            console.log(e)
            vuexContext.commit('loadingFalse')
        })
    },
    loadMore(vuexContext, {search_terms, search_query}) {
        return this.$axios
        .$get('/place', { params: 
            {
                search: search_terms,
                typeof: search_query.typeof,
                idealfor: search_query.idealfor,
                amenities: search_query.amenities,
                page: vuexContext.getters.nextNo,
                limit: vuexContext.getters.limitNo,
                img: true,
            }
        })
        .then(data => {
            let newResult = data.results
            let nextNumber = null
            if (!!data.next) {
                nextNumber = data.next
            }
            vuexContext.commit('addToResult', newResult)
            vuexContext.commit('setNext', nextNumber)
        })
        .catch(e => {
            console.log(e)
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
    },
    pageNo(state) {
        return state.page
    },
    limitNo(state) {
        return state.limit
    },
    nextNo(state) {
        return state.next
    }
}