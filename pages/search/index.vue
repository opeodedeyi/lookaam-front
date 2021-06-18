<template>
  <div class="search-container">
    <div class="search-filter">
      <mainbutton :onClick="openFilter" size="filter sb" mode="filter"><img src="~/assets/svg/filter.svg" alt="" /><span>FILTER</span></mainbutton>
      <mainbutton :onClick="openDate" class="ml sb" size="filter" mode="filter"><img src="~/assets/svg/date.svg" class="img-s" alt="" /><span class="img-t">DATE</span></mainbutton>
    </div>
    <gridlayout>
      <app-main-card 
        hasLike="true" 
        to="/card" 
        Ptitle="Otedola mansion plaza lagos nigeria" 
        Ptype="Restaurant"
        Pprice="60,000">
      </app-main-card>
      <app-main-card 
        hasLike="true" 
        to="/card" 
        Ptitle="Otedola mansion plaza lagos nigeria" 
        Ptype="Restaurant"
        Pprice="60,000">
      </app-main-card>
      <app-main-card 
        hasLike="true" 
        to="/card" 
        Ptitle="Otedola mansion plaza lagos nigeria" 
        Ptype="Restaurant"
        Pprice="60,000">
      </app-main-card>
      <app-main-card 
        hasLike="true" 
        to="/card" 
        Ptitle="Otedola mansion plaza lagos nigeria" 
        Ptype="Restaurant"
        Pprice="60,000">
      </app-main-card>
      <app-main-card 
        hasLike="true" 
        to="/card" 
        Ptitle="Otedola mansion plaza lagos nigeria" 
        Ptype="Restaurant"
        Pprice="60,000">
      </app-main-card>
      <app-main-card 
        hasLike="true" 
        to="/card" 
        Ptitle="Otedola mansion plaza lagos nigeria" 
        Ptype="Restaurant"
        Pprice="60,000">
      </app-main-card>
      <app-main-card 
        hasLike="true" 
        to="/card" 
        Ptitle="Otedola mansion plaza lagos nigeria" 
        Ptype="Restaurant"
        Pprice="60,000">
      </app-main-card>
      <app-main-card 
        hasLike="true" 
        to="/card" 
        Ptitle="Otedola mansion plaza lagos nigeria" 
        Ptype="Restaurant"
        Pprice="60,000">
      </app-main-card>
    </gridlayout>
  </div>
</template>

<script>
import mainbutton from "@/components/utilities/mainbutton";
import gridlayout from "@/components/layout/gridlayout";
import maincard from "@/components/card/maincard.vue";

export default {
  components: { 
    'app-main-card': maincard,
    mainbutton,
    gridlayout
  },
  methods: {
    openFilter() {
      console.log('filter button clicked')
    },
    openDate() {
      console.log('date button clicked')
    }
  }
}
</script>

<style scoped>
.search-container {
  padding: 0 50px;
}

.search-filter {
  height: 3.125rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.ml {
  margin-left: 1rem;
}

.sb {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.img-s {
  padding-right: .3rem;
}

.img-t {
  margin-top: .2rem;
}

@media only screen and (max-width: 999.9px) {
  .search-filter {
    height: 2.5rem;
  }

  .search-container {
    padding: 0 20px;
  }

  .search-filter {
    justify-content: space-between;
  }
}
</style>