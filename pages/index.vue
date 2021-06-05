<template>
  <div>
    <app-jumbotron></app-jumbotron>
    <app-explore-jumbotron>
      <app-main-card 
        typeofcard="flexx" 
        hasLike="true" 
        to="/card" 
        Ptitle="Otedola mansion plaza lagos nigeria" 
        Ptype="Restaurant"
        Pprice="60,000">
      </app-main-card>
      <app-main-card 
        typeofcard="flexx" 
        hasLike="true" 
        to="/card" 
        Ptitle="Otedola mansion plaza lagos nigeria" 
        Ptype="Restaurant"
        Pprice="60,000">
      </app-main-card>
      <app-main-card 
        typeofcard="flexx" 
        hasLike="true" 
        to="/card" 
        Ptitle="Otedola mansion plaza lagos nigeria" 
        Ptype="Restaurant"
        Pprice="60,000">
      </app-main-card>
      <app-main-card 
        typeofcard="flexx" 
        hasLike="true" 
        to="/card" 
        Ptitle="Otedola mansion plaza lagos nigeria" 
        Ptype="Restaurant"
        Pprice="60,000">
      </app-main-card>
      <app-main-card 
        typeofcard="flexx" 
        hasLike="true" 
        to="/card" 
        Ptitle="Otedola mansion plaza lagos nigeria" 
        Ptype="Restaurant"
        Pprice="60,000">
      </app-main-card>
      <app-main-card 
        typeofcard="flexx" 
        hasLike="true" 
        to="/card" 
        Ptitle="Otedola mansion plaza lagos nigeria" 
        Ptype="Restaurant"
        Pprice="60,000">
      </app-main-card>
      <app-main-card 
        typeofcard="flexx" 
        hasLike="true" 
        to="/card" 
        Ptitle="Otedola mansion plaza lagos nigeria" 
        Ptype="Restaurant"
        Pprice="60,000">
      </app-main-card>
      <app-main-card 
        typeofcard="flexx" 
        hasLike="true" 
        to="/card" 
        Ptitle="Otedola mansion plaza lagos nigeria" 
        Ptype="Restaurant"
        Pprice="60,000">
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
  }
}
</script>

<style>

</style>
