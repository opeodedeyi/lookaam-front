export const state = () => ({
    mobilenav: false
})

export const mutations = {
    showmobilenav(state) {
        state.mobilenav = true;
    },
    hidemobilenav(state) {
        state.mobilenav = false;
    }
}

export const getters = {
    isvisible(state) {
        return state.mobilenav;
    }
}
