<template>
  <div class="search-container">
    <div class="search-filter">
      <mainbutton :onClick="openFilter" size="filter sb" mode="filter"><img src="~/assets/svg/filter.svg" alt="" /><span>FILTER</span></mainbutton>
      <mainbutton :onClick="openDate" class="ml sb" size="filter" mode="filter"><img src="~/assets/svg/date.svg" class="img-s" alt="" /><span class="img-t">DATE</span></mainbutton>
    </div>
    <mainpopup v-if="filterPopup" @close-popup="closeFilterPopup" title="Filters" ftBtnTxt="Show results">
      <template>
        <div class="vertical-layout">
          <topinput hasSlot name="topinput" overlay v-model="form.typeof">Type of place</topinput>
          <collapsepop title="Ideal for" name="idealfor" isChecked>
            <template>
              <div class="full-width">
                <smallcheckinput name="reception" value="reception" v-model="form.idealfor">Reception</smallcheckinput>
                <smallcheckinput name="production" value="production" v-model="form.idealfor">Production</smallcheckinput>
                <smallcheckinput name="meeting" value="meeting" v-model="form.idealfor">Meeting</smallcheckinput>
                <smallcheckinput name="performance" value="performance" v-model="form.idealfor">Performance</smallcheckinput>
                <smallcheckinput name="dinner" value="dinner" v-model="form.idealfor">Dinner</smallcheckinput>
                <smallcheckinput name="wedding" value="wedding" v-model="form.idealfor">Wedding</smallcheckinput>
                <smallcheckinput name="party" value="party" v-model="form.idealfor">Party</smallcheckinput>
                <smallcheckinput name="conference" value="conference" v-model="form.idealfor">Conference</smallcheckinput>
              </div>
            </template>
          </collapsepop>
          <collapsepop title="Amenities" name="amenities">
            <template>
              <div class="full-width">
                <smallcheckinput name="electricity" value="electricity" v-model="form.amenities">Electricity</smallcheckinput>
                <smallcheckinput name="a/c" value="a/c" v-model="form.amenities">a/c</smallcheckinput>
                <smallcheckinput name="wifi" value="wifi" v-model="form.amenities">wifi</smallcheckinput>
                <smallcheckinput name="soundSystem" value="sound system" v-model="form.amenities">Sound system</smallcheckinput>
                <smallcheckinput name="private entrance" value="private entrance" v-model="form.amenities">Private entrance</smallcheckinput>
                <smallcheckinput name="kitchen" value="kitchen" v-model="form.amenities">Kitchen</smallcheckinput>
                <smallcheckinput name="large table" value="large table" v-model="form.amenities">Large table</smallcheckinput>
                <smallcheckinput name="green screen" value="green screen" v-model="form.amenities">Green screen</smallcheckinput>
                <smallcheckinput name="stage" value="stage" v-model="form.amenities">Stage</smallcheckinput>
                <smallcheckinput name="changing room" value="changing room" v-model="form.amenities">Changing room</smallcheckinput>
                <smallcheckinput name="makeup room" value="makeup room" v-model="form.amenities">Makeup room</smallcheckinput>
                <smallcheckinput name="lounge" value="lounge" v-model="form.amenities">Lounge</smallcheckinput>
                <smallcheckinput name="soundproof" value="soundproof" v-model="form.amenities">Soundproof</smallcheckinput>
              </div>
            </template>
          </collapsepop>
        </div>
      </template>
    </mainpopup>
    <mainpopup v-if="datePopup" @close-popup="closeDatePopup" title="When is the planned date" bkBtnTxt="Clear" ftBtnTxt="Search"></mainpopup>
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
import mainpopup from "@/components/popups/mainpopup";
import gridlayout from "@/components/layout/gridlayout";
import loadinglayout from "@/components/layout/loadinglayout";
import centerlayout from "@/components/layout/centerlayout";
import maincard from "@/components/card/maincard.vue";
import topinput from '@/components/utilities/topinput';
import baselabel from '@/components/utilities/baselabel';
import smallcheckinput from '@/components/utilities/smallcheckinput';
import collapsepop from '@/components/utilities/collapsepop';

export default {
  components: { 
    'app-main-card': maincard,
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
  },
  data() {
    return {
      datePopup: false,
      filterPopup: false,
      next: null,
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
    getAddress() {
      this.$router.push(`/search?search=${this.searchTerms}`);
    },
    closeFilterPopup() {
      this.filterPopup = false;
    },
    closeDatePopup() {
      this.datePopup = false;
    }
  },
  mounted() {
    // this.getAddress()
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