export default ({ $axios, store  }) => {

    $axios.setBaseURL('https://lookaam.herokuapp.com');

    const token = store.getters['profile/token'];
    if (token) {
        $axios.setToken(token, 'Bearer')
    }

    $axios.onResponseError(error => {
        const { status } = error.response || {};
        if (status === 401 && store.getters['profile/check']) {
            store.commit('profile/logOut');
        }
        else{
            return Promise.reject(error);
        }
    });
}