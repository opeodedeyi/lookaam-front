<template>
    <div class="place-second-header">
        <div class="sp-bw sec-height">
            <p class="s-header-title">My Saved Places</p>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.place-second-header {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
}

.sp-bw {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
}

.sec-height {
    height: 60px;
}

.sec-height-sm {
    height: 50px;
}

.s-header-title {
    font-size: 1.2rem;
    font-weight: 600;
}

@media only screen and (min-width: 1000px) {
    .s-header-title {
        font-size: 1.4rem;
        font-weight: 500;
    }
}
</style>