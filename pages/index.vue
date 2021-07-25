<template>
  <div>
    <app-jumbotron></app-jumbotron>
    <app-explore-jumbotron>
      <app-main-card 
        typeofcard="flexx" 
        v-for="result in explorePlaces"
        :key="result._id"
        :id="result._id"
        hasLike="true" 
        :to="`/property/${result._id}`"
        :Ptitle="result.title"
        :Ptype="result.typeof"
        :Pprice="result.price.amount"
        :Pcurrency="result.price.currency">
      </app-main-card>
    </app-explore-jumbotron>
    <app-jumbotron-bottom></app-jumbotron-bottom>
    <app-footer></app-footer>
  </div>
</template>

<script>
import jumbotron from "@/components/homepage/jumbotron.vue";
import jumbotronbottom from "@/components/homepage/jumbotronbottom.vue";
import explorejumbotron from "@/components/homepage/explorejumbotron.vue";
import footer from "@/components/homepage/footer.vue";
import maincard from "@/components/card/maincard.vue";

export default {
  components: {
    'app-jumbotron': jumbotron,
    'app-jumbotron-bottom': jumbotronbottom,
    'app-explore-jumbotron': explorejumbotron,
    'app-main-card': maincard,
    'app-footer': footer
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
