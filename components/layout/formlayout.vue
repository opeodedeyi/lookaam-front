<template>
    <div class="form-layout">
        <div class="form-layout-left">
            <div class="form-layout-left-content">
                <slot></slot>
            </div>
        </div>

        <div class="form-layout-right">
            <div class="form-art">
                <slot name="image"></slot>
            </div>
        </div>
    </div>
</template>


<script>
export default {
  
}
</script>

<style scoped>
.form-layout {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
}
  
.form-layout-left {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-start;
    align-self: flex-start;
    width: 50%;
    padding: 80px 50px 50px;
}

.form-layout-left-content {
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
}
  
.form-layout-right {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    max-height: calc(100vh-5rem);
}

@media only screen and (max-width: 999.9px) {
    .form-layout-left {
        width: 100%;
        padding: 20px;
    }
    
    .form-layout-right {
        display: none;
    }
}

@media only screen and (min-width: 1000px) {
    .form-layout {
        /* formerly 600 */
        min-height: 500px;
    }
}
</style>