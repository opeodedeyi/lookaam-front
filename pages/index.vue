<template>
  <div>
    <jumbotron></jumbotron>
    <explorejumbotron>
      <maincard 
        typeofcard="flexx" 
        v-for="(result, index) in explorePlaces"
        :key="index"
        :id="result._id"
        hasLike="true" 
        :to="`/property/${result._id}`"
        :Ptitle="result.title"
        :Ptype="result.typeof"
        :Pprice="result.price.amount"
        :Pcurrency="result.price.currency">
      </maincard>
    </explorejumbotron>
    <jumbotronbottom></jumbotronbottom>
    <mainfooter></mainfooter>
  </div>
</template>

<script>
import jumbotron from "@/components/homepage/jumbotron.vue";
import jumbotronbottom from "@/components/homepage/jumbotronbottom.vue";
import explorejumbotron from "@/components/homepage/explorejumbotron.vue";
import mainfooter from "@/components/homepage/mainfooter.vue";
import maincard from "@/components/card/maincard.vue";

export default {
  components: {
    jumbotron,
    jumbotronbottom,
    explorejumbotron,
    maincard,
    mainfooter
  },
  computed:{
    explorePlaces() {
      return this.$store.getters["discoverPlaces"]
    },
  },
}
</script>

<style>

</style>
