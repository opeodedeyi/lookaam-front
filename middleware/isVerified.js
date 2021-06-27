// redirects the user is they are not logged in and if their emails are not verified
export default function ({ store, redirect }){
    if (!store.getters['profile/check']) {
        return redirect(`/login`);
    }
    else if (store.getters['profile/verifiedEmail']) {
        return redirect(`/beverified`);
    }
}