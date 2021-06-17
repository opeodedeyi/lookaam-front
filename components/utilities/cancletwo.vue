<template>
    <div class="bb">
        <img src="~/assets/svg/cancle2.svg" alt="" />
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
    align-items: center;
    cursor: pointer;
    border: none;
    border-radius: 20px;
    height: 30px;
    width: 30px;
    background-color: var(--color-dark);
    opacity: 0.6;
}

img {
    height: 1.3rem;
}
</style>