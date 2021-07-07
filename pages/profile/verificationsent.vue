<template>
    <formlayout>
        <template v-slot:default>
            <div class="mail-sent">
                <div class="mail-sent-top">
                    <img src="~/assets/svg/mail.svg" class="mail-sent-icon mbm" alt="" />
                    <p class="mail-sent-title mbm">Verification Email Sent</p>
                    <p class="mail-sent-text mbm">We have sent a verification email with an instruction to verify your email</p>
                </div>

                <div class="mail-sent-bottom">
                    <p class="mail-sent-text mbm">Did not receive the email? check your spam filter</p>
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

export default {
    middleware: ['isAuth'],
    components: {
        formlayout
    },
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