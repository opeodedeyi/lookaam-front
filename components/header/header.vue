<template>
  <header>
    <div class="headerMain">
      <logo/>
      <searchbar/>
      <rightsection/>
      <burgerbar @show-nav="showNav()" class="burgerbar"/>
    </div>

    <div class="headerBottom">
      <searchbar/>
    </div>

    <mobilenav v-if="mobileOverlayShown" @hide-nav="hideNav()" :isvisible="mobileOverlayShown"/>
    <mobileoverlay v-if="mobileOverlayShown" @hide-nav="hideNav()"/>
  </header>
</template>

<script>
import burgerbar from "@/components/utilities/burgerbar";
import logo from "@/components/utilities/logo";
import searchbar from "@/components/header/hu/searchbar";
import rightsection from "@/components/header/hu/rightsection";
import mobilenav from "@/components/mobile/mobilenav";
import mobileoverlay from "@/components/mobile/mobileoverlay";

export default {
  components: {
    burgerbar,
    logo,
    searchbar,
    mobilenav,
    mobileoverlay,
    rightsection
  },
  data() {
    return {
      mobileOverlayShown: false
    }
  },
  methods: {
    showNav() {
      this.mobileOverlayShown = true
    },
    hideNav() {
      this.mobileOverlayShown = false
    }
  },
}
</script>

<style scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--color-white);
    width: 100%;
    height: 5rem;
    padding: 0 50px;
    z-index: 99;
  }

  .header-logo a {
    color: var(--color-dark);
    font-weight: 500;
    text-decoration: none;
  }

  .headerMain {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

/* Small screens */
@media only screen and (max-width: 999.9px) {
  header {
    width: 100%;
    height: 8.25rem;
    padding: 14px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .headerMain {
    height: 50%;
  }

  .headerBottom {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    height: 50%;
    width: 100%;
  }

  .headerMain .search-box {
    display: none; /* this affects styling in the searchbar component */
  }
}

/* Large screens */
@media only screen and (min-width: 1000px) {
  .headerBottom {
    display: none;
  }
}
</style>
