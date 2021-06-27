// redirects the user is they are not logged in
export default function ({ store, redirect }){
    if (!store.getters['profile/check']) {
        return redirect(`/login`);
    }
}