<template>
  <formlayout>
    <template v-slot:default>
      <p class="form-title">Reset password</p>

      <p class="form-explain">Enter the email associated with your account and we will send an email with instructions to reset your password</p>

      <form action="" class="form-body-cont">
        <!-- email -->
        <div class="mb-form">
          <label for="email">Email</label>
          <input class="mt4" type="email" name="email" placeholder="Email address">
        </div>
        <!-- button -->
        <div class="gen-wrapper mb-form">
          <mainbutton :onClick="consoleClick" class="ml" size="max">Send Instructions</mainbutton>
        </div>

      </form>
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
  computed: {
    isShown() {
      return this.$store.getters["form/isPasswordVisible"]
    }
  },
  methods: {
    consoleClick() {
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

@media only screen and (min-width: 1000px) {
  .form-title {
    font-size: 1.3rem;
  }
}
</style>