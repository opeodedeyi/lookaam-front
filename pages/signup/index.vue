<template>
  <loadinglayout v-if="gloading"></loadinglayout>
  <formlayout v-else>
    <template v-slot:default v-if="error === false">
      <p class="form-title">Create your account</p>

      <form class="form-body-cont" @submit.prevent="onSubmit">
        <p v-if="errorMessage" class="form-error">{{ errorMessage }}</p>
        <baseinput hasSlot placeholder="Email address" name="email" inputType="email" v-model="form.email">Email</baseinput>
        <baseinput hasSlot placeholder="Full name" name="fullname" v-model="form.fullname">Full name</baseinput>
        <passwordinput hasSlot placeholder="Password" name="password" inputType="password" v-model="form.password">Password</passwordinput>

        
        <div class="gen-wrapper mb-form">
          <mainbutton v-if="loading === false" :onClick="createAccount" class="ml" size="max">Create your account</mainbutton>
          <mainbutton loading v-else :onClick="doNothing" class="ml" mode="loading" size="max">Creating your account</mainbutton>
        </div>

        <p class="form-or form-center mb-form">OR</p>

        <googleSignIn class="gen-wrapper mb-form" customButton customButtonId='gsignin' :clientId="'156377464736-vlgvsdtk4ka382a36bnb48r2m82afdfd.apps.googleusercontent.com'" :successCallBack="getSuccessData" :failureCallBack="getFailureData">
          <mainbutton  :gloading="gloading" id="gsignin" :onClick="setLoading" class="ml btn" size="max" mode="outline"><img src="~/assets/svg/google.svg" alt="" /><span>Sign in using Google</span></mainbutton>
        </googleSignIn>
        
        <p class="form-right mb-form"><span class="form-or">Already have an account? </span><nuxt-link to="/login">Sign in instead</nuxt-link> </p>
      </form>
    </template>
    
    <template v-slot:image>
      <img src="~/assets/svg/welldone.svg" alt="" />
    </template>
  </formlayout>
</template>


<script>
import loadinglayout from "@/components/layout/loadinglayout";
import baseinput from '@/components/utilities/baseinput';
import passwordinput from '@/components/utilities/passwordinput';
import formlayout from "@/components/layout/formlayout";
import mainbutton from "@/components/utilities/mainbutton";
import googleSignIn from 'google-signin-vue/src/googleSignIn.vue';

export default {
  middleware: ['notAuth'],
  head: {
    script: [
      { src: "https://apis.google.com/js/platform.js" },
    ]
  },
  components: {
    loadinglayout,
    baseinput,
    passwordinput,
    formlayout,
    mainbutton,
    googleSignIn
  },
  data() {
    return {
      errorMessage: null,
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
      this.gloading = true
      if ( !this.form.password || this.form.password.length<8 ) {
        this.gloading = false
        return this.errorMessage = "New password must be at least 8 characters"
      } else if ( !this.form.fullname || !this.form.email ) {
        this.gloading = false
        return this.errorMessage = "Please fill out all fields"
      } else if ( !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.form.email) ) {
        this.gloading = false
        return this.errorMessage = "Please provide a valid email address"
      }
      this.$store.dispatch("profile/authenticateUser", {
        isSignup: this.isSignup,
        form: this.form
      })
      .catch(err => {
        // handle errors here
        this.gloading = false
        console.log(err.response)
      })
    },
    getSuccessData(user) {
      let googleIdToken = user.id_token
      this.form.tokenId = googleIdToken
      this.$store.dispatch("profile/authenticateUser", {
        isGoogle: true,
        form: this.form
      })
      .catch(err => {
        this.gloading = false
        console.log(err.response)
      })
    },
    getFailureData(errorData) {
      console.log(errorData);
      this.gloading = false
    },
    setLoading() {
      this.gloading = true
    },
    doNothing() {
      return
    }
  },
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

.form-error {
  font-size: .9rem;
  color: var(--color-danger);
  margin-bottom: .6rem;
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