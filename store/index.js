const cookieFromRequest = (request, key) => {
    if (!request.headers.cookie) {
        return;
    }
    const cookie = request.headers.cookie.split(';').find(
        c => c.trim().startsWith(`${key}=`)
    );
    if (cookie) {
        return cookie.split('=')[1];
    }
}

export const state = () => ({
    discoverPlaces: [],
})
 
export const mutations = {
    searchResult(state, result) {
        state.discoverPlaces = result
    },
}
 
export const actions = {
    nuxtServerInit({ commit, dispatch, route }, { req }){
        const token = cookieFromRequest(req, 'token');
        if (!!token) {
            commit('profile/setToken', token);
        }

        return this.$axios
        .$get(`${process.env.BASE_URL}/place`, { params: 
            {
                limit: 8,
                img: true,
                page: 1
            }
        })
        .then(data => {
            let result = data.results
            commit('searchResult', result)
        })
        .catch(e => console.log(e))
    }
}
 
export const getters = {
    discoverPlaces(state) {
        return state.discoverPlaces
    }
}