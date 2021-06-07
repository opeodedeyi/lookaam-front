<template>
  <formlayout>
    <template v-slot:default>
      <p class="form-title">Welcome Back</p>

      <form action="" class="form-body-cont">
        <!-- email -->
        <div class="mb-form">
          <label for="email">Email</label>
          <input class="mt4" type="email" name="email" placeholder="Email address">
        </div>
        <!-- password -->
        <div class="mb-form">
          <label for="password">Password</label>
          <div class="password-wrapper mt4">
            <input :type="isShown?'password':'text'" name="password" class="" placeholder="Password">
            <eye/>
          </div>
        </div>
        <!-- forget password -->
        <nuxt-link to="/resetpassword" class="form-link mb-form">forgot password?</nuxt-link>

        <div class="gen-wrapper mb-form">
          <mainbutton :onClick="normalLogin" class="ml" size="max">Log into your account</mainbutton>
        </div>

        <p class="form-or form-center mb-form">OR</p>

        <div class="gen-wrapper mb-form">
          <mainbutton :onClick="googleLogin" class="ml btn" size="max" mode="outline"><img src="~/assets/svg/google.svg" alt="" /><span>Log in with Google</span></mainbutton>
        </div>
        
        <p class="form-right mb-form"><span class="form-or">OR </span><nuxt-link to="/signup">Create an account instead</nuxt-link> </p>
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
  components: {
    formlayout,
    eye,
    mainbutton
  },
  computed: {
    isShown() {
      return this.$store.getters["form/isPasswordVisible"]
    }
  },
  methods: {
    normalLogin() {
      console.log('Button clicked')
    },
    googleLogin() {
      console.log('Button clicked')
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

@media only screen and (min-width: 1000px) {
  .form-title {
    font-size: 1.3rem;
  }
}
</style>