<template>
    <div class="main-tag">
        <slot></slot>
    </div>
</template>


<script>
export default {
    
}
</script>

<style scoped>
.main-tag {
    background-color: var(--color-gray);
    padding: 6px 23px;
    color: var(--color-dark);
    border-radius: 17.5px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    margin-right: .5rem;
    margin-top: .5rem;
}
</style>