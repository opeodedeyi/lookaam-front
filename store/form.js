export const state = () => ({
    passwordShown: false
})

export const mutations = {
    togglePassword(state) {
        state.passwordShown = !state.passwordShown;
    }
}

export const getters = {
    isPasswordVisible(state) {
        return state.passwordShown;
    }
}
