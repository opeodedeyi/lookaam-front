<template>
    <div class="explore-Jumbotron">
        <p>Discover places</p>
        <div class="h-l-container">
            <div class="horizontal-layout">
                <slot/>
            </div>
        </div>
        <nuxt-link to="/" class="e-j-explore">See more places ></nuxt-link>
    </div>
</template>

<script>
export default {
    
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

.explore-Jumbotron a {
    text-decoration: none;
    color: var(--color-company);
    font-size: 1.1rem;
}

.explore-Jumbotron a:hover {
    text-decoration: none;
    color: var(--color-company2);
}

.h-l-container {
    margin-top: 2rem;
    position: relative;
    width: 100%;
    height: 230px;
    overflow-x: hidden;
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
    position: absolute;
}

/* Small screens */
@media only screen and (max-width: 999px) {
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