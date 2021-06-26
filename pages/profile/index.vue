<template>
  
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
        }
    },
    data() {
        return {
            vloading: false,
            verificationMailSent: false,
        }
    },
    methods: {
        sendVerificationEmail() {
            this.vloading = true
            this.$axios.post('/requestverificationloggedin/')
            .then(result => {
                if (result.status==201) {
                    this.vloading = true
                    this.verificationMailSent = true
                }
            })
            .catch(e => {
                this.vloading = true
            })
        },
        
    }
}
</script>

<style scoped>

@media only screen and (min-width: 1000px) {

}
</style>