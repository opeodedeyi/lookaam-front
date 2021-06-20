export const state = () => ({
    token: null,
    loggedin: false,
    photo: "data:image/webp;base64,UklGRuoDAABXRUJQVlA4IN4DAAAwIACdASr6APoAPpFIoUwlpKMiIzM4aLASCWdu4W/L8+GNfYcgTrfR31EbaznivOi35CnjfInZlIk1gQa+qxbnyVJTIy2Z94dVvdJgxICQEgJASAkBICQEgIyYIvv/eeb7WFWSxICPzADFh5PZrqVVbrUO8pmfeHVYTBEHvm1/yp0w6re5Yd4GdmsGdPEIBPi0yMtmekowdYVh8gAg3vsOdWNICQEgIygzw4PxiaDIiIJuTbcr7oDPdJgwuKQTisPZqci6q9lnUTm0kMz7wtNSwhiPxSiKJmHVbln7H6HQd5aDvLQdtna75EnSYiGskR0MSZhMOq3ukwYkBICQEgJASAkBICQEgJALgAD++oR//VcvWwB381GWbeRoyhqEVZAAGVmxO/VYCcE9AcbLygdU+Fl01hFfRDSVkBtCAshwriqFrPuQPJGLT9Kmivhx7ohvMMH169KsYCezjKfdLzV8j9Sn+vWowdSSseu877UJ4qg6A9mybHI708efjEI/dFZQziO6Tr+1UefPEoKlEPz6fUTSnNBLd7MXJx2OzDvgREr0k78uR88Zt65u2AE457ocDzGJWaEzCyuVcpzZKnM9HVZuvE5SYvOicMsAarHqvgOmldVgXLFLIICrOO+OIascUFZa9EiJufSi/BFPtEcMtZu3uhxbdNqJKHlpM6Rjg/GrVApl6923nI12nH2Cg8tn6c8JPfpNDV6C+azS4yCM2JKeWskZZYCPqpFs0H1h+GLVsHBYqYqvWIRU0K0FFBVzl3U4HgvmT+qfUA9a1CGllf6TuESbECpP8C0blvlNwaU8zp/yvrb4S8W9DsjjByP7IfBMFETB78ynEJdn0GoWd+rkzzdu4oZSaeoO1XYItyIIXuDbn7fCuuF7KXjMzN/smUJ61AKjOMmSLHxwJPTg3XAmJsGuBviU5eUxbQuyyTS0TbiiLKxKmMA/R/JprgFYgFFOWjJqaKv1To+vGuGZpM6pWHwy4XfAwZLVTqIZV0hJQWKoc0/lvz2/l8qoLy2MjqK/AvzsrhFKirFH8hCrDURX1jpn7+TpPjZg0R6naOfZyFiYeBwtfo4a/j3T1/zEg+rfZZ1vgJR7yj11PXFV68B70hLmXELAqnCrhzn0tIhDoHMUACUwWDC+3VZCOIahGs96fyN8VURIirfhk68JhxwgjUDAFirw+1PeurFPrx0rveAHM2O2k7UgELdFdz6bKQuI71WTX+UNIsLIHQ8LDfzI2nKAxLisWwiJoMKnDh6PqQ1eBrxtsf9T0u9fyZzz8/y48IlZIWO0bqGNOZYAcA0zCCIv2S0AAAAAAAA=",
    fullname: null,
    id: null
})

export const mutations = {
    setToken(state, token) {
        state.token = token
    },
    logIn(state) {
        state.loggedin = true
    }
}

export const actions = {
    async authenticateUser(vuexContext, authData) {
        let authUrl = 'https://lookaam.herokuapp.com/signup/'
        if (authData.isLogin) {
            authUrl = 'https://lookaam.herokuapp.com/login/'
        }

        return this.$axios
        .$post(authUrl, authData.form)
        .then(data => {
            console.log(data);
            const token = data.token
            vuexContext.commit('setToken', token)
        })
        .catch(e => console.log(e))
    },
}

export const getters = {
    usertoken(state) {
        return state.token;
    },
    profilephoto(state) {
        return state.photo;
    },
    isloggedin(state) {
        return state.loggedin;
    },
    thefullname(state) {
        return state.fullname;
    },
    theid(state) {
        return state.id;
    },
}
