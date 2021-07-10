<template>
  <div @click="toggledropdown" @mouseover="showdropdown" @mouseleave="hidedropdown">
    <nuxt-link v-if="photo" to="/profile" tag="div" class="container">
      <img :src="photo" alt="">
    </nuxt-link>

    <ul class="dropdown" :class="{ show: dropdown }">
      <nuxt-link to="/profile" tag="li" class="first">Profile</nuxt-link>
      <nuxt-link to="/getstarted" tag="li" class="mid">Host a place</nuxt-link>
      <nuxt-link to="/profile/manageplaces" tag="li" >Manage my places</nuxt-link>
      <nuxt-link to="/profile/savedplaces" tag="li" >Saved places</nuxt-link>
      <li class="last" @click.prevent="logOut">Log out</li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    photo() {
      return this.$store.getters["profile/profilephoto"]
    },
    dropdown() {
      return this.$store.getters["dropdown/isdropdown"]
    }
  },
  methods: {
    toggledropdown() {
      this.$store.commit("dropdown/toggledropdown");
    },
    hidedropdown() {
      this.$store.commit("dropdown/hidedropdown");
    },
    showdropdown() {
      this.$store.commit("dropdown/showdropdown");
    },
    async logOut() {
      await this.$store.dispatch("profile/logOut");
      this.$router.push('/')
    }
  },
}
</script>

<style scoped>
    .container {
        height: 35px;
        width: 35px;
        border-radius: 100%;
        display: block;
        overflow: hidden;
        cursor: pointer;
    }

    .container img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        display: block;
    }

    .dropdown {
      position: absolute;
      list-style: none;
      width: 180px;
      right: 0.3rem;
      padding: .5rem 1.2rem;
      background-color: var(--color-white);
      border: 1px solid var(--color-gray-darker);
      display: none;
    }

    .show {
      display: block;
    }

    ul {
      padding: 0;
      margin: 0;
      border-radius: 20px;
    }

    li {
      padding-top: 5px;
      padding-bottom: 5px;
      width: 100%;
      padding-left: 0;
    }

    li:hover {
      cursor: pointer;
      color: var(--color-company);
    }

    .first {
      font-weight: 500;
    }

    /* Small screens */
    @media only screen and (max-width: 999.9px) {
      .dropdown {
        display: none;
      }

      .container {
        height: 30px;
        width: 30px;
        border-radius: 100%;
        display: block;
        overflow: hidden;
        cursor: pointer;
      }
    }

    /* Large screens */
    @media only screen and (min-width: 1000px) {
      .mid {
        display: block;
      }
    }

    /* Larger screens */
    @media only screen and (min-width: 1260px) {
      .mid {
        display: none;
      }
    }
</style>