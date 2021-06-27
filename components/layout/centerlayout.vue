<template>
    <div class="center-layout">
        <slot/>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.center-layout {
    width: 100%;
    min-height: 400px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

@media only screen and (min-width: 1000px) {
    .center-layout {
        min-height: 500px;
        padding: 50px;
    }
}
</style>