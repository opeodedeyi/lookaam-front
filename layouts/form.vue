<template>
  <div>
    <app-formheader></app-formheader>
    <nuxt class="mt-body"/>
  </div>
</template>

<script>
import formheader from "~/components/header/formheader";

export default {
  components: {
    'app-formheader': formheader
  }
}
</script>

<style scoped>
.mt-body {
    margin-top: 5rem;
}
</style>
