<template>
    <div class="form-layout">
        <div class="form-layout-left">
            <div class="form-layout-left-content">
                <slot></slot>
            </div>
        </div>

        <div class="form-layout-right">
            <slot name="prop-right"></slot>
        </div>
    </div>
</template>


<script>
export default {
  
}
</script>

<style scoped>
.form-layout {
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
}
  
.form-layout-left {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
}

.form-layout-left-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
}
  
.form-layout-right {
    display: none;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 40%;
    max-width: 500px;
    margin-left: 90px;
}

@media only screen and (min-width: 1000px) {
    .form-layout {
        padding: 0 50px;
        min-height: 500px;
    }

    .form-layout-right {
        display: flex;
    }

    .form-layout-left {
        width: 50%;
    }
}
</style>