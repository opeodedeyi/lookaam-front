<template>
  <loadinglayout v-if="gloading"></loadinglayout>
  <formlayout v-else>
    <template v-slot:default>
      <p class="form-title">Welcome Back</p>

      <form action="" class="form-body-cont">
        <baseinput hasSlot placeholder="Email address" name="email" inputType="email" v-model="form.email">Email</baseinput>
        <passwordinput hasSlot placeholder="Password" name="password" inputType="password" v-model="form.password">Password</passwordinput>

        <!-- forgot password -->
        <nuxt-link to="/resetpassword" class="form-link mb-form">forgot password?</nuxt-link>

        <div class="gen-wrapper mb-form">
          <mainbutton v-if="loading === false" :onClick="normalLogin" class="ml" size="max">Log into your account</mainbutton>
          <mainbutton loading v-else class="ml" mode="loading" size="max">Logging in</mainbutton>
        </div>

        <p class="form-or form-center mb-form">OR</p>

        <googleSignIn class="gen-wrapper mb-form" customButton customButtonId='gsignin' :clientId="'156377464736-vlgvsdtk4ka382a36bnb48r2m82afdfd.apps.googleusercontent.com'" :successCallBack="getSuccessData" :failureCallBack="getFailureData">
          <mainbutton  :gloading="gloading" id="gsignin" :onClick="setLoading" class="ml btn" size="max" mode="outline"><img src="~/assets/svg/google.svg" alt="" /><span>Login using Google</span></mainbutton>
        </googleSignIn>
        
        <p class="form-right mb-form"><span class="form-or">OR </span><nuxt-link to="/signup">Create an account instead</nuxt-link> </p>
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
      loading: false,
      gloading: false,
      error: false,
      isLogin: true,
      form: {
        tokenId: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    normalLogin() {
      this.gloading = true
      this.$store.dispatch("profile/authenticateUser", {
        isLogin: this.isLogin,
        form: this.form
      })
      .then(() => {
        this.$router.push('/')
      })
      .catch(e => {
        this.gloading = false
        console.log(e, 'failed to login')
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

@media only screen and (min-width: 1000px) {
  .form-title {
    font-size: 1.3rem;
  }
}
</style>