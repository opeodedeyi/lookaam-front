<template>
  <formlayout>
    <template v-slot:default v-if="error === false">
      <p class="form-title">Create your account</p>

      <form class="form-body-cont" @submit.prevent="onSubmit">
        <!-- email -->
        <div class="mb-form">
          <label for="email">Email</label>
          <input class="mt4" type="email" name="email" placeholder="Email address" v-model="form.email">
        </div>
        <!-- fullname -->
        <div class="mb-form">
          <label for="fullname">Full name</label>
          <input class="mt4" type="text" name="fullname" placeholder="Full name" v-model="form.fullname">
        </div>
        <!-- password -->
        <div class="mb-form">
          <label for="password">Password</label>
          <div class="password-wrapper mt4">
            <input :type="isShown?'password':'text'" name="password" class="" placeholder="Password" v-model="form.password">
            <eye/>
          </div>
        </div>
        
        <div class="gen-wrapper mb-form">
          <mainbutton v-if="loading === false" :onClick="createAccount" class="ml" size="max">Create your account</mainbutton>
          <mainbutton loading v-else :onClick="doNothing" class="ml" mode="loading" size="max">Creating your account</mainbutton>
        </div>

        <p class="form-or form-center mb-form">OR</p>

        <div class="gen-wrapper mb-form">
          <mainbutton v-if="gloading === false" :onClick="googleLog" class="ml btn" size="max" mode="outline"><img src="~/assets/svg/google.svg" alt="" /><span>Sign in using Google</span></mainbutton>
          <mainbutton loading v-else :onClick="doNothing" class="ml btn" size="max" mode="google"><img src="~/assets/svg/google.svg" alt="" /><span>Sign in using Google</span></mainbutton>
        </div>
        
        <p class="form-right mb-form"><span class="form-or">Already have an account? </span><nuxt-link to="/login">Sign in instead</nuxt-link> </p>
      </form>
    </template>
    
    <template v-slot:image>
      <img src="~/assets/svg/welldone.svg" alt="" />
    </template>
  </formlayout>
</template>


<script>
import formlayout from "@/components/layout/formlayout";
import eye from "@/components/utilities/eye";
import mainbutton from "@/components/utilities/mainbutton";

export default {
  middleware: ['notAuth'],
  components: {
    formlayout,
    eye,
    mainbutton
  },
  data() {
    return {
      loading: false,
      gloading: false,
      error: false,
      isSignup: true,
      form: {
        tokenId: null,
        email: null,
        fullname: null,
        password: null
      }
    }
  },
  computed: {
    isShown() {
      return this.$store.getters["form/isPasswordVisible"]
    }
  },
  
  methods: {
    createAccount() {
      this.loading = true
      this.$store.dispatch("profile/authenticateUser", {
        isSignup: this.isSignup,
        form: this.form
      })
      .catch(err => {
        // handle login errors here
        this.loading = false
        console.log(err.response)
      })
    },
    googleLog() {
      this.gloading = true
      this.$store.dispatch("profile/authenticateUser", {
        isGoogle: true,
        form: this.form
      })
    },
    doNothing() {
      return
    }
  }
}
</script>

<style scoped>
.form-title {
  font-weight: 500;
  font-size: 1.1rem;
}

.form-body-cont {
  margin-top: 2rem;
  display: flex;
  flex-direction: column
}

.form-link {
  align-self: flex-end;
  text-decoration: none;
  color: var(--color-company);
}

.btn img {
  margin-right: .5rem;
}

.form-or {
  font-weight: 500;
}

.form-center {
  align-self: center;
}

.form-right {
  align-self: flex-end;
}

.form-link:hover {
  color: var(--color-company2);
}

.gen-wrapper {
  width: 100%;
}

.mt4{
  margin-top: .4rem;
}

p a {
  text-decoration: none;
  color: var(--color-company);
}

p a:hover {
  color: var(--color-company2);
}

.mb-form{
  margin-bottom: 1.2rem;
}

label,
input {
  width: 100%;
}

.password-wrapper {
  width: 100%;
  position: relative;
}

input {
  font-size: .95rem;
  color: var(--color-dark);
  padding: 11.2px 16px;
  background-color: var(--color-gray);
  border: none;
  border-radius: 20px;
  outline: none;
}

.password-wrapper input {
  padding: 11.2px 42px 11.2px 16px;
}

/* mail sent section */
.mbm {
  margin-bottom: .5rem;
}

.mail-sent {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 400px;
}

.mail-sent-top {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mail-sent-title {
  font-size: 1rem;
  font-weight: 500;
}

.mail-sent-text {
  text-align: center;
}

.mail-sent-link {
  text-align: center;
  color: var(--color-company);
  cursor: pointer;
}

.mail-sent-link:hover {
  color: var(--color-company2);
}

.mail-sent-icon {
  height: 60px;
}

@media only screen and (min-width: 1000px) {
  .form-title {
    font-size: 1.3rem;
  }
}
</style>