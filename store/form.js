export const state = () => ({
    passwordShown: true
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
