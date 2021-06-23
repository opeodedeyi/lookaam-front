export default function ({ store, redirect }){
    if (store.getters['profile/check']) {
        return redirect(`/`);
    }
}