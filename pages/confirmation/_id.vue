<template>
    <loadinglayout v-if="loading"></loadinglayout>
    <centerlayout v-else>
      <template v-slot:default>
          <div class="confirmation-container">
              <img src="~/assets/svg/failure.svg" class="mail-sent-icon mbm" alt="" />
              <div class="confirmation-text">Something went wrong with the email verification, please <span class="confirmation-text-link">Request another verification email</span></div>
          </div>
      </template>
    </centerlayout>
</template>

<script>
import loadinglayout from "@/components/layout/loadinglayout";
import centerlayout from "@/components/layout/centerlayout";

export default {
    components: {
        loadinglayout,
        centerlayout
    },
    data() {
        return {
            loading: true
        }
    },
    methods: {
        verifyEmail() {
            this.$axios.get(`/confirmation/${this.$route.params.id}`)
            .then(result => {
                this.$router.push('/confirmation/success')
            })
            .catch(e => {
                this.loading = false
                console.log(e);
            })
        }
    },
    mounted() {
        this.verifyEmail()
    }
}
</script>

<style>
.mbm {
  margin-bottom: .8rem;
}

.confirmation-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.confirmation-text {
    text-align: center;
    color: var(--color-dark);
    font-size: 1.2rem;
}

.confirmation-text-link {
    color: var(--color-company);
    cursor: pointer;
}

.confirmation-text-link:hover {
    color: var(--color-company2);
}
</style>