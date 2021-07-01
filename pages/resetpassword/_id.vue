<template>
  <formlayout>
    <template v-slot:default v-if="success === false && error === false">
      <p class="form-title">Create a new password</p>

      <form action="" class="form-body-cont">
        <passwordinput hasSlot placeholder="New Password" name="new password" inputType="password" v-model="form.password">New Password</passwordinput>
        <!-- button -->
        <div class="gen-wrapper mb-form">
          <mainbutton v-if="loading === false" :onClick="resetPassword" class="ml" size="max">Reset Password</mainbutton>
          <mainbutton loading v-else class="ml" :onClick="doNothing" mode="loading" size="max">Resetting Password</mainbutton>
        </div>

      </form>
    </template>

    <template v-slot:default v-else >
      <div class="mail-sent">
        <div class="mail-sent-top">
          <img src="~/assets/svg/mail.svg" class="mail-sent-icon mbm" alt="" />
          <p class="mail-sent-title mbm">Password was not reset</p>
          <p class="mail-sent-text mbm">You will need to request a new password reset because something went wrong.</p>
        </div>

        <div class="mail-sent-bottom">
          <p class="mail-sent-link" @click="newApplication">Submit an application for a new password reset</p>
        </div>
      </div>
    </template>
    
    <template v-slot:image>
      <img src="~/assets/svg/changepassword.svg" alt="" />
    </template>
  </formlayout>
</template>


<script>
import passwordinput from '@/components/utilities/passwordinput';
import formlayout from "@/components/layout/formlayout";
import mainbutton from "@/components/utilities/mainbutton";

export default {
  middleware: 'notAuth',
  components: {
    passwordinput,
    formlayout,
    mainbutton
  },
  data() {
    return {
      loading: false,
      success: false,
      error: false,
      message: '',
      form: {
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
    resetPassword() {
        this.loading = true
        this.$axios.post(`/resetpassword/${this.$route.params.id}`, this.form)
        .then(result => {
            const data = result.data
            console.log(data);
            this.$store.dispatch("profile/directLogin",data)
        })
        .catch(e => {
            this.error = true
            console.log(e);
        })
    },
    newApplication() {
        this.$router.push('/resetpassword/')
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