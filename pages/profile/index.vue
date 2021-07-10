<template>
    <div class="profile-body">
        <div class="full-width">
            <div v-if="photo" class="profile-body-photo">
                <img :src="photo" alt="">
            </div>
            <p v-if="user.fullname" class="profile-body-name">{{ user.fullname }}</p>
            <mainbutton link to="/profile/manageplaces" size="maxx">Manage my places</mainbutton>
            <mainbutton link to="/profile/changepassword" size="maxx" mode="outline-b">Change my password</mainbutton>
            <mainbutton v-if="!user.isEmailConfirmed" :gloading="vloading" size="maxx" mode="outline-b" :onClick="sendVerificationEmail">Resend verification Email</mainbutton>
            <mainbutton :gloading="logloading" size="maxx" mode="outline-b" :onClick="logoutAll">Logout of all devices</mainbutton>
        </div>
        
    </div>
</template>


<script>
import mainbutton from "@/components/utilities/mainbutton";

export default {
    middleware: 'isAuth',
    components: {
        mainbutton
    },
    computed: {
        user() {
            return this.$store.getters["profile/user"]
        },
        photo() {
            return this.$store.getters["profile/profilephoto"]
        }
    },
    data() {
        return {
            vloading: false,
            verificationMailSent: false,
            logloading: false
        }
    },
    methods: {
        sendVerificationEmail(e) {
            e.preventDefault();
            this.vloading = true
            this.$axios.post('/requestverificationloggedin')
            .then(result => {
                console.log(result);
                if (result.status==201) {
                    this.vloading = false
                    this.$router.push('/profile/verificationsent')
                }
            })
            .catch(e => {
                this.vloading = false
            })
        },
        async logoutAll(e) {
            e.preventDefault();
            this.logloading = true
            await this.$store.dispatch("profile/devicesLogOut", null);
        },
    }
}
</script>

<style scoped>
.full-width{
    width: 100%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.profile-body {
    padding: 20px 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

.profile-body-photo {
    height: 250px;
    width: 250px;
    border-radius: 100%;
    display: block;
    overflow: hidden;
}

.profile-body-photo img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    display: block;
}

.profile-body-name {
    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

@media only screen and (min-width: 1000px) {
    .profile-body {
        padding: 70px 50px;
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
    }
}
</style>