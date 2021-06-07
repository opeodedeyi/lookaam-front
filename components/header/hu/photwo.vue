<template>
  <div>
    <nuxt-link to="/profile" tag="div" class="container">
      <img :src="photo" alt="">
    </nuxt-link>
  </div>
</template>

<script>
export default {
    computed: {
        photo() {
            return this.$store.getters["profile/profilephoto"]
        }
    }
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

/* Small screens */
@media only screen and (max-width: 999.9px) {
    .container {
        height: 30px;
        width: 30px;
        border-radius: 100%;
        display: block;
        overflow: hidden;
        cursor: pointer;
    }
}
</style>