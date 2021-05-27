<template>
  <header>
    <div class="headerMain">
      <logo/>
      <searchbar/>
      <rightsection/>
      <burgerbar class="burgerbar"/>
    </div>

    <div class="headerBottom">
      <searchbar/>
    </div>

    <mobilenav/>
    <mobileoverlay/>
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
  }
}
</script>

<style scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--color-white);
    width: 100%;
    padding: 20px;
    height: 5rem;
    padding: 0 50px;
    border-bottom: 1px solid var(--color-gray);
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
