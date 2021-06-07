<template>
    <div>
        <!-- progress bar -->
        <div class="progress-bar"><div class="current-progress"></div></div>
    </div>
</template>

<script>
export default {
    layout: 'form'
}
</script>

<style>
.progress-bar {
    height: .5rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    background-color: var(--color-gray);
}

.current-progress {
    height: 100%;
    background-color: var(--color-company);
    width: 9%;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
</style>