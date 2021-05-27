export const state = () => ({
    overlay: false
})

export const mutations = {
    showoverlay(state) {
        state.overlay = true;
    },
    hideoverlay(state) {
        state.overlay = false;
    }
}

export const getters = {
    isvisible(state) {
        return state.overlay;
    }
}
