<template>
  <formlayout>
    <template v-slot:default>
        <p class="form-title">BECOMING A HOST</p>
        <p class="form-explain mb-form">Through hosting, you can enjoy the freedom of being your own boss, earn extra money, and build lifelong connections.</p>
        <p class="form-explain mb-form">It's entirely free to list your property, and you'll have access to our assistance at any time.</p>
        <div>
            <p class="form-explain mb-form" v-if="!isLoggedIn">You must first create an account or log in if you already have one in order to begin hosting your space.</p>
            <p class="form-explain mb-form" v-else>Start hosting your space by clicking the button below.</p>
        </div>
        <!-- button -->
        <div class="gen-wrapper" v-if="isLoggedIn">
            <mainbutton link to="property/create" class="ml" size="great">Get started</mainbutton>
        </div>
        <div class="gen-wrapper" v-else>
            <mainbutton link to="signup" class="ml" size="large">Create your account</mainbutton>
        </div>
    </template>
    
    <template v-slot:image>
      <img src="~/assets/svg/started.svg" alt="" />
    </template>
  </formlayout>
</template>


<script>
import formlayout from "@/components/layout/formlayout";
import mainbutton from "@/components/utilities/mainbutton";

export default {
  components: {
    formlayout,
    mainbutton
  },
  computed: {
    isLoggedIn() {
        return this.$store.getters["profile/isloggedin"]
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

.mb-form{
    margin-bottom: 1rem;
}

.gen-wrapper {
    margin-top: 2rem;
}

@media only screen and (min-width: 1000px) {
  .form-title {
    font-size: 1.3rem;
  }
}
</style>