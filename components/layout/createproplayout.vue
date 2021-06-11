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

        <div class="form-footer">
            <div class="form-footer-extra">
                <div class="form-footer-content">
                    <slot name="button"></slot>
                </div>
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
    justify-content: flex-start;
    align-items: center;
    padding: 0 50px 90px;
}

.form-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    border-top: 1px solid var(--color-gray);
    background-color: var(--color-white);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    padding: 0 50px 10px;
}
  
.form-layout-left {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-start;
    align-self: flex-start;
    width: 50%;
    padding: 75px 0 0;
}

.form-footer-extra {
    width: 50%;
}

.form-layout-left-content {
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
}

.form-footer-content {
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
}
  
.form-layout-right {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    margin-left: 70px;
}

@media only screen and (max-width: 999.9px) {
    .form-layout {
        padding: 0 20px 90px;
    }
    
    .form-layout-left {
        width: 100%;
        padding: 55px 0 0;
    }

    .form-footer {
        padding: 0 20px 15px;
    }

    .form-footer-extra {
        width: 100%;
    }
    
    .form-layout-right {
        display: none;
    }
}

@media only screen and (min-width: 1000px) {
    .form-layout {
        min-height: 646px;
    }
}

@media only screen and (min-width: 1235px) {
    .form-layout-right {
        margin-left: 130px;
    }
}
</style>