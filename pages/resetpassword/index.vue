<template>
  <formlayout>
    <template v-slot:default v-if="success === false && error === false">
      <p class="form-title">Reset password</p>

      <p class="form-explain">Enter the email associated with your account and we will send an email with instructions to reset your password</p>

      <form action="" class="form-body-cont">
        <!-- email -->
        <div class="mb-form">
          <label for="email">Email</label>
          <input class="mt4" type="email" name="email" placeholder="Email address" v-model="form.email">
        </div>
        <!-- button -->
        <div class="gen-wrapper mb-form">
          <mainbutton v-if="loading === false" :onClick="resetPassword" class="ml" size="max">Send Instructions</mainbutton>
          <mainbutton loading v-else class="ml" mode="loading" size="max">Sending instructions </mainbutton>
        </div>

      </form>
    </template>

    <template v-slot:default v-else-if="success === true && error === false">
      <div class="mail-sent">
        <div class="mail-sent-top">
          <img src="~/assets/svg/mail.svg" class="mail-sent-icon mbm" alt="" />
          <p class="mail-sent-title mbm">Check your Mail</p>
          <p class="mail-sent-text mbm">We have sent a password recover instructions to your email</p>
        </div>

        <div class="mail-sent-bottom">
          <p class="mail-sent-text mbm">Did not receive the email? check your spam filter</p>
          <p class="mail-sent-link" @click="falseSuccess">or try another email address</p>
        </div>
      </div>
    </template>

    <template v-slot:default v-else >
      <div class="mail-sent">
        <div class="mail-sent-top">
          <img src="~/assets/svg/mail.svg" class="mail-sent-icon mbm" alt="" />
          <p class="mail-sent-title mbm">Mail not set</p>
          <p class="mail-sent-text mbm">{{message}}</p>
        </div>

        <div class="mail-sent-bottom">
          <p class="mail-sent-link" @click="falseSuccess">You can try another email address</p>
        </div>
      </div>
    </template>
    
    <template v-slot:image>
      <img src="~/assets/svg/chilling.svg" alt="" />
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
  data() {
    return {
      loading: false,
      success: false,
      error: false,
      message: '',
      form: {
        email: null
      }
    }
  },
  computed: {
    isShown() {
      return this.$store.getters["form/isPasswordVisible"]
    }
  },
  methods: {
    resetPassword() {
      this.loading = true
      this.$axios.post('/resetpassword/', this.form)
      .then(result => {
        if (result.status==201) {
          this.loading = false
          this.success = true
          this.error = false
        }
      })
      .catch(e => {
        this.error = true
        this.message = "The email you provided is not anactive email on our platform"
        console.log(e);
      })
    },
    falseSuccess() {
      this.loading = false
      this.success = false
      this.error = false
    }
  }
}
</script>

<style scoped>
.form-title {
  font-weight: 500;
  font-size: 1.1rem;
}

.form-explain {
  font-weight: 400;
  font-size: 1rem;
  margin-top: 1.2rem;
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

.form-link:hover {
  color: var(--color-company2);
}

.mt4{
  margin-top: .4rem;
}

.mb-form{
  margin-bottom: 1.2rem;
}

label,
input {
  width: 100%;
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