<template>
    <div class="grid-card-layout">
        <slot/>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.grid-card-layout {
    display: grid;
    grid-template-columns: repeat(12, minmax(auto, 100px));
    gap: 20px;
    width: 100%;
    margin-top: 40px;
    margin-bottom: 40px;
}

@media only screen and (max-width: 571.9px) {
    .grid-card-layout {
        row-gap: 40px;
    }
}

@media only screen and (min-width: 572px) {
    .grid-card-layout {
        gap: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
}

@media only screen and (min-width: 1300px) {
    .grid-card-layout {
        grid-template-columns: repeat(15, minmax(auto, 100px));
    }
}
</style>