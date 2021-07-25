<template>
    <div class="bb">
        <img src="~/assets/svg/saved.svg" alt="" />
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.bb {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    cursor: pointer;
    border-color: var(--color-dark);
}

img {
    height: 1.6rem;
}

/* Large screens */
@media only screen and (min-width: 1000px) {

}
</style>