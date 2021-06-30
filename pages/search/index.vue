<template>
  <div class="search-container">
    <div class="search-filter">
      <mainbutton :onClick="openFilter" size="filter sb" mode="filter"><img src="~/assets/svg/filter.svg" alt="" /><span>FILTER</span></mainbutton>
      <mainbutton :onClick="openDate" class="ml sb" size="filter" mode="filter"><img src="~/assets/svg/date.svg" class="img-s" alt="" /><span class="img-t">DATE</span></mainbutton>
    </div>
    <loadinglayout v-if="loading"></loadinglayout>
    <gridlayout v-else-if="searchResult.length>0">
      <app-main-card 
        v-for="result in searchResult"
        :key="result._id"
        :id="result._id"
        hasLike="true" 
        :to="`/property/${result._id}`"  
        :Ptitle="result.title"
        :Ptype="result.typeof"
        :Pprice="result.price.amount">
      </app-main-card>
    </gridlayout>
    <centerlayout v-else>
      <template v-slot:default>
        <p class="no-content-text">There are no properties available in this area.</p>
      </template>
    </centerlayout>
  </div>
</template>

<script>
import mainbutton from "@/components/utilities/mainbutton";
import gridlayout from "@/components/layout/gridlayout";
import loadinglayout from "@/components/layout/loadinglayout";
import centerlayout from "@/components/layout/centerlayout";
import maincard from "@/components/card/maincard.vue";

export default {
  components: { 
    'app-main-card': maincard,
    mainbutton,
    gridlayout,
    loadinglayout,
    centerlayout
  },
  computed:{
    searchTerms() {
      return this.$store.getters["search/searchTerms"]
    },
    searchResult() {
      return this.$store.getters["search/searchResult"]
    },
    loading() {
      return this.$store.getters["search/loading"]
    },
  },
  data() {
    return {
      next: null,
      previous: null
    }
  },
  methods: {
    openFilter() {
      console.log('filter button clicked')
    },
    openDate() {
      console.log('date button clicked')
    },
    getAddress() {
      this.$router.push(`/search?search=${this.searchTerms}`);
    },
  },
  mounted() {
    // this.getAddress()
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

.no-content-text {
  color: var(--color-dark);
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
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