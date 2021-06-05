<template>
  <div>
    <app-header></app-header>
    <nuxt class="mt-body"/>
  </div>
</template>

<script>
import header from "~/components/header/header";

export default {
  components: {
    'app-header': header
  }
}
</script>

<style scoped>
.mt-body {
    margin-top: 5rem;
}

@media only screen and (max-width: 999.9px) {
    .mt-body {
        margin-top: 8.25rem;
    }
}
</style>
