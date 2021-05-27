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

<style>

</style>
