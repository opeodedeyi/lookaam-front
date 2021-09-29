<template>
  <div class="search-container">
    <div class="search-filter">
      <mainbutton :onClick="openFilter" size="filter sb" mode="filter"><img src="~/assets/svg/filter.svg" alt="" /><span>FILTER</span></mainbutton>
      <!-- <mainbutton :onClick="openDate" class="ml sb" size="filter" mode="filter"><img src="~/assets/svg/date.svg" class="img-s" alt="" /><span class="img-t">DATE</span></mainbutton> -->
    </div>
    <mainpopup v-if="filterPopup" @close-popup="closeFilterPopup" @fw-btn="filterSearch" @bk-btn="clearFilter" title="Filters" ftBtnTxt="Show results" bkBtnTxt="Clear">
      <template>
        <div class="vertical-layout">
          <!-- type of place -->
          <topinput hasSlot name="topinput" overlay v-model="form.typeof">Type of place</topinput>
          <!-- idealfor -->
          <collapsepop title="Ideal for" name="idealfor" isChecked>
            <template>
              <div class="full-width">
                <smallcheckinput name="house party" value="house party" v-model="form.idealfor">House Party</smallcheckinput>
                <smallcheckinput name="video shoot" value="video shoot" v-model="form.idealfor">Video Shoot</smallcheckinput>
                <smallcheckinput name="photo shoot" value="photo shoot" v-model="form.idealfor">Photo Shoot</smallcheckinput>
              </div>
            </template>
          </collapsepop>
          <!-- amenities -->
          <collapsepop title="Amenities" name="amenities" isChecked>
            <template>
              <div class="full-width">
                <smallcheckinput name="electricity" value="electricity" v-model="form.amenities">Electricity</smallcheckinput>
                <smallcheckinput name="tables" value="tables" v-model="form.amenities">Tables</smallcheckinput>
                <smallcheckinput name="chairs" value="chairs" v-model="form.amenities">Chairs</smallcheckinput>
                <smallcheckinput name="air conditioner" value="air conditioner" v-model="form.amenities">Air Conditioner</smallcheckinput>
                <smallcheckinput name="wifi" value="wifi" v-model="form.amenities">wifi</smallcheckinput>
                <smallcheckinput name="sound system" value="sound system" v-model="form.amenities">Sound system</smallcheckinput>
                <smallcheckinput name="kitchen" value="kitchen" v-model="form.amenities">Kitchen</smallcheckinput>
                <smallcheckinput name="changing room" value="changing room" v-model="form.amenities">Changing room</smallcheckinput>
              </div>
            </template>
          </collapsepop>
        </div>
      </template>
    </mainpopup>
    <mainpopup v-if="datePopup" @close-popup="closeDatePopup" title="When is the planned date" bkBtnTxt="Clear" ftBtnTxt="Search"></mainpopup>
    <loadinglayout v-if="loading"></loadinglayout>
    <gridlayout v-else-if="searchResult.length>0" @load-more="loadMoreResult">
      <maincard
        v-for="(result, index) in searchResult"
        :key="index"
        :id="result._id"
        hasLike="true"
        :to="`/property/${result._id}`"
        :Ptitle="result.title"
        :Ptype="result.typeof"
        :Pprice="result.price.amount"
        :Pcurrency="result.price.currency"
        :Pper="result.price.per">
      </maincard>
      <loadingcard v-if="getNext"></loadingcard>
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
import mainpopup from "@/components/popups/mainpopup";
import gridlayout from "@/components/layout/gridlayout";
import loadinglayout from "@/components/layout/loadinglayout";
import centerlayout from "@/components/layout/centerlayout";
import maincard from "@/components/card/maincard.vue";
import loadingcard from "@/components/card/loadingcard.vue";
import topinput from '@/components/utilities/topinput';
import baselabel from '@/components/utilities/baselabel';
import smallcheckinput from '@/components/utilities/smallcheckinput';
import collapsepop from '@/components/utilities/collapsepop';

export default {
  components: { 
    maincard,
    loadingcard,
    mainbutton,
    gridlayout,
    loadinglayout,
    centerlayout,
    mainpopup,
    topinput,
    baselabel,
    smallcheckinput,
    collapsepop
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
    rtSearchTerms() {
      return this.$store.getters["search/rtSearchTerms"]
    },
    getNext() {
      return this.$store.getters["search/nextNo"]
    }
  },
  data() {
    return {
      datePopup: false,
      filterPopup: false,
      previous: null,
      form: {
        typeof: null,
        idealfor: [],
        amenities: []
      }
    }
  },
  methods: {
    openFilter() {
      this.filterPopup = true;
    },
    openDate() {
      this.datePopup = true;
    },
    filterSearch() {
      const search_terms = this.rtSearchTerms
      this.$router.push({ path: 'search', query: { search: this.rtSearchTerms, typeof: this.form.typeof, idealfor: this.form.idealfor, amenities: this.form.amenities }});
      this.$store.dispatch("search/search", { search_terms, search_query: this.form });
      this.filterPopup = false;
    },
    clearFilter() {
      this.form.typeof = null
      this.form.idealfor = []
      this.form.amenities = []
    },
    loadMoreResult() {
      if (this.getNext) {
        const search_terms = this.rtSearchTerms
        console.log(this.getNext);
        return this.$store.dispatch("search/loadMore", { search_terms, search_query: this.form });
      }
      return console.log(this.getNext);
    },
    reloadSearch() {
      const searchParams = this.$route.query
      
      // updating the form
      let gottenTypeof = searchParams.typeof
      let gottenIdealfor = searchParams.idealfor
      let gottenAmenities = searchParams.amenities
      this.form.typeof = gottenTypeof
      if (!gottenIdealfor) {
        this.form.idealfor = []
      } else if (gottenIdealfor.constructor === Array) {
        this.form.idealfor = gottenIdealfor
      } else {
        let newIdealfor = []
        newIdealfor.push(gottenIdealfor)
        this.form.idealfor = newIdealfor
      }
      if (!gottenAmenities) {
        this.form.amenities = []
      } else if (gottenAmenities.constructor === Array) {
        this.form.amenities = gottenAmenities
      } else {
        let newAmenities = []
        newAmenities.push(gottenAmenities)
        this.form.amenities = newAmenities
      }
      // updating the form ^^
      this.$store.dispatch("search/search", {search_terms: searchParams.search, search_query: searchParams});
    },
    loadMore() {
      this.$store.dispatch("search/loadmore", { search_terms, search_query: this.form });
    },
    closeFilterPopup() {
      this.filterPopup = false;
    },
    closeDatePopup() {
      this.datePopup = false;
    }
  },
  mounted() {
    this.reloadSearch()
  }
}
</script>

<style scoped>
.full-width {
  width: 100%;
}

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

.vertical-layout {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
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