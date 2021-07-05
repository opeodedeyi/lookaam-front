<template>
    <div class="explore-Jumbotron">
        <p>Discover places</p>
        <div class="h-l-container">
            <div class="horizontal-layout">
                <slot/>
            </div>
        </div>
        <div class="e-j-explore" @click.prevent="explorePlaces">See more places ></div>
    </div>
</template>

<script>
export default {
    methods: {
        explorePlaces() {
            console.log("clicked");
            this.$store.dispatch("search/search", "");
            this.$router.push('/search');
        },
    },
}
</script>

<style scoped>
.explore-Jumbotron {
    background-color: var(--color-white);
    padding: 3.5rem 50px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.e-j-explore {
    text-decoration: none;
    color: var(--color-company);
    font-size: 1.1rem;
    cursor: pointer;
}

.e-j-explore:hover {
    text-decoration: none;
    color: var(--color-company2);
}

.h-l-container {
    margin-top: 2rem;
    /* position: relative; */
    width: 100%;
    height: 230px;
    overflow-x: scroll;
    overflow-y: hidden;
}

.h-l-container::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.h-l-container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.e-j-explore {
    align-self: flex-end;
    margin: 1.8rem 0 0;
}

.explore-Jumbotron p {
    color: var(--color-dark);
    font-size: 1.7rem;
    font-weight: 700;
}

.horizontal-layout {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    /* position: absolute; */
}

/* Small screens */
@media only screen and (max-width: 999.9px) {
    .explore-Jumbotron {
        padding: 2rem 0 2rem 20px;
    }

    .explore-Jumbotron p {
        font-size: 1.4rem;
    }

    .e-j-explore {
        margin: 1.5rem 20px 0;
    }
}

/* Large screens */
@media only screen and (min-width: 1000px) {
    
}
</style>