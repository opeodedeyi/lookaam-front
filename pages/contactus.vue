<template>
  <formlayout>
    <template v-slot:default>
      <p class="form-title">Contact Us</p>

      <p class="form-explain">Are you interested in collaborating with us? or do you have a problem with our service? Please do not hesitate to contact us if you have any questions or concerns.</p>

      <form action="" class="form-body-cont">
        <baseinput v-if="!isLoggedin" hasSlot placeholder="E-mail" name="email" inputType="email" v-model="form.email">Email</baseinput>
        <baseinput hasSlot placeholder="The message's subject is.." name="title" inputType="text" v-model="form.title">Title</baseinput>
        <baseinput hasSlot placeholder="Please describe the issue or provide a suggestion." controlType="textarea" :maxLength=350 name="message" v-model="form.message">Message</baseinput>
        <!-- button -->
        <div class="gen-wrapper mb-form mb-cont">
          <mainbutton :onClick="sendMessage" class="ml" size="max">Send Message</mainbutton>
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
import baseinput from '@/components/utilities/baseinput';

export default {
  components: {
    baseinput,
    formlayout,
    mainbutton
  },
  data() {
    return {
      loading: false,
      error: false,
      form: {
        email: null,
        title: null,
        message: null
      }
    }
  },
  computed: {
    isLoggedin() {
      return this.$store.getters["profile/check"]
    }
  },
  methods: {
    sendMessage() {
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