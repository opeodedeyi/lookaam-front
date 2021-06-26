import Cookie from 'js-cookie';

export const state = () => ({
    token: null,
    user: null,
    loggedin: false,
    photo: "data:image/webp;base64,UklGRuoDAABXRUJQVlA4IN4DAAAwIACdASr6APoAPpFIoUwlpKMiIzM4aLASCWdu4W/L8+GNfYcgTrfR31EbaznivOi35CnjfInZlIk1gQa+qxbnyVJTIy2Z94dVvdJgxICQEgJASAkBICQEgIyYIvv/eeb7WFWSxICPzADFh5PZrqVVbrUO8pmfeHVYTBEHvm1/yp0w6re5Yd4GdmsGdPEIBPi0yMtmekowdYVh8gAg3vsOdWNICQEgIygzw4PxiaDIiIJuTbcr7oDPdJgwuKQTisPZqci6q9lnUTm0kMz7wtNSwhiPxSiKJmHVbln7H6HQd5aDvLQdtna75EnSYiGskR0MSZhMOq3ukwYkBICQEgJASAkBICQEgJALgAD++oR//VcvWwB381GWbeRoyhqEVZAAGVmxO/VYCcE9AcbLygdU+Fl01hFfRDSVkBtCAshwriqFrPuQPJGLT9Kmivhx7ohvMMH169KsYCezjKfdLzV8j9Sn+vWowdSSseu877UJ4qg6A9mybHI708efjEI/dFZQziO6Tr+1UefPEoKlEPz6fUTSnNBLd7MXJx2OzDvgREr0k78uR88Zt65u2AE457ocDzGJWaEzCyuVcpzZKnM9HVZuvE5SYvOicMsAarHqvgOmldVgXLFLIICrOO+OIascUFZa9EiJufSi/BFPtEcMtZu3uhxbdNqJKHlpM6Rjg/GrVApl6923nI12nH2Cg8tn6c8JPfpNDV6C+azS4yCM2JKeWskZZYCPqpFs0H1h+GLVsHBYqYqvWIRU0K0FFBVzl3U4HgvmT+qfUA9a1CGllf6TuESbECpP8C0blvlNwaU8zp/yvrb4S8W9DsjjByP7IfBMFETB78ynEJdn0GoWd+rkzzdu4oZSaeoO1XYItyIIXuDbn7fCuuF7KXjMzN/smUJ61AKjOMmSLHxwJPTg3XAmJsGuBviU5eUxbQuyyTS0TbiiLKxKmMA/R/JprgFYgFFOWjJqaKv1To+vGuGZpM6pWHwy4XfAwZLVTqIZV0hJQWKoc0/lvz2/l8qoLy2MjqK/AvzsrhFKirFH8hCrDURX1jpn7+TpPjZg0R6naOfZyFiYeBwtfo4a/j3T1/zEg+rfZZ1vgJR7yj11PXFV68B70hLmXELAqnCrhzn0tIhDoHMUACUwWDC+3VZCOIahGs96fyN8VURIirfhk68JhxwgjUDAFirw+1PeurFPrx0rveAHM2O2k7UgELdFdz6bKQuI71WTX+UNIsLIHQ8LDfzI2nKAxLisWwiJoMKnDh6PqQ1eBrxtsf9T0u9fyZzz8/y48IlZIWO0bqGNOZYAcA0zCCIv2S0AAAAAAAA=",
})

export const mutations = {
    setToken(state, token) {
        state.token = token
    },
    fetchUserSuccess(state, user){
        state.user = user;
    },
    fetchUserFailure(state){
        state.user = null;
    },
    logOut(state){
        state.token = null;
        state.user = null;
    },
    updateUser(state, user ){
        state.user = user;
    }
}

export const actions = {
    async authenticateUser(vuexContext, authData) {
        let authUrl = 'https://lookaam.herokuapp.com/signup/'
        if (authData.isLogin) {
            authUrl = 'https://lookaam.herokuapp.com/login/'
        }
        else if (authData.isGoogle) {
            authUrl = 'https://lookaam.herokuapp.com/googlelogin/'
        }

        return await this.$axios
        .$post(authUrl, authData.form)
        .then(data => {
            const token = data.token
            const user = data.user
            vuexContext.dispatch('saveToken', token)
            vuexContext.dispatch('updateUser', user)
            this.$axios.setToken(token, 'Bearer')
            if (authData.isSignup) {
                this.$router.push('/signup/success')
            }
            this.$router.push('/')
        })
    },
    directLogin(vuexContext, data){
        const token = data.token
        const user = data.user
        vuexContext.dispatch('saveToken', token)
        vuexContext.dispatch('updateUser', user)
        this.$axios.setToken(token, 'Bearer')
        this.$router.push('/')
    },
    saveToken({ commit }, token){
        commit('setToken', token);
        Cookie.set('token', token);
    },
    async fetchUser({ commit }){
        try{
            const { data } = await this.$axios.get('/me');
            commit('fetchUserSuccess', data);
        }catch(e){
            Cookie.remove('token');
            commit('fetchUserFailure');
        }
    },
    updateUser({ commit }, payload){
        commit('updateUser', payload);
    },
    async logOut(vuexContext) {
        return this.$axios
        .$post('https://lookaam.herokuapp.com/logout/')
        .then(data => {
            Cookie.remove('token');
            vuexContext.commit('logOut');
        })
        .catch(e => console.log(e))
    },
}

export const getters = {
    token(state) {
        return state.token;
    },
    profilephoto(state) {
        if (!!state.user.profilePhoto) {
            return state.user.profilePhoto.location
        }
        return state.photo;
    },
    isloggedin(state) {
        return state.loggedin;
    },
    check(state) {
        return state.user !== null
    },
    user(state) {
        return state.user
    }
}
