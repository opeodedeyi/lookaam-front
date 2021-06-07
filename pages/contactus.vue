<template>
  <formlayout>
    <template v-slot:default>
      <p class="form-title">Contact Us</p>

      <p class="form-explain">Would you like to collaborate with us? or have an issue with our service? Do not hesitate to let us know</p>

      <form action="" class="form-body-cont">
        <!-- email -->
        <div class="mb-form">
          <label for="email">Email</label>
          <input class="mt4" type="email" name="email" placeholder="Your email address">
        </div>
        <!-- title -->
        <div class="mb-form">
          <label for="title">Title</label>
          <input class="mt4" type="text" name="title" placeholder="The subject of the message">
        </div>
        <!-- message -->
        <div class="mb-form">
          <label for="message">Message</label>
          <textarea class="mt4" name="message" placeholder="Tell us the problem or suggestion" cols="30" rows="6"></textarea>
        </div>
        <!-- button -->
        <div class="gen-wrapper mb-form mb-cont">
          <mainbutton :onClick="consoleClick" class="ml" size="max">Send Message</mainbutton>
        </div>

      </form>
    </template>
    
    <template v-slot:image>
      <img src="~/assets/svg/contactus.svg" alt="" />
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
input,
textarea {
  width: 100%;
}

input,
textarea {
  font-size: .95rem;
  color: var(--color-dark);
  padding: 11.2px 16px;
  background-color: var(--color-gray);
  border: none;
  border-radius: 20px;
  outline: none;
}

@media only screen and (max-width: 999.9px) {
  .mb-cont {
    /* this is to add margin to bottom of contact us form so
    for ease of use */
    margin-bottom: 10rem;
  }
}

@media only screen and (min-width: 1000px) {
  .form-title {
    font-size: 1.3rem;
  }
}
</style>