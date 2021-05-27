export const state = () => ({
    dropdown: false
})

export const mutations = {
    showdropdown(state) {
        state.dropdown = true;
    },
    hidedropdown(state) {
        state.dropdown = false;
    },
    toggledropdown(state) {
        state.dropdown = !state.dropdown;
    }
}

export const getters = {
    isdropdown(state) {
        return state.dropdown;
    }
}
