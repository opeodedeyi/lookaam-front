export default async ({ $axios, store }) => {
    const token = store.getters['profile/token'];
    if (process.server) {
        if (token) {
            $axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        } else {
            delete $axios.defaults.headers.common.Authorization;
        }
    }
    if (!store.getters['profile/check'] && token) {
        await store.dispatch('profile/fetchUser');
    }
}