<template>
    <div class="flex-c-full p-t-b">
        <input v-if="isChecked" type="checkbox" :name="name" checked :id="name" class="hidecheckbox">
        <input v-else type="checkbox" :name="name" :id="name" class="hidecheckbox">
        <label :for="name" class="general-title p-b s-btw ptr"><p class="sub-title">{{ title }}</p> <div class="arrow-show-all f-c-a"><p>show all</p><img src="~/assets/svg/selectarrow.svg" alt=""></div> <div class="arrow-hide-all f-c-a"><p>hide all</p><img src="~/assets/svg/selectarrowup.svg" alt=""></div></label>
        <div class="collapsed-item">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        isChecked: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

<style scoped>
/* checkbox hack */
/* margin and padding styling starting */
.p-t-b {
    padding: 1.4rem 0;
}
.p-b {
    padding-bottom: .7rem;
}

.s-btw {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
}

.f-c-a {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.f-c-a img {
    height: 1rem;
}

.f-c-a p {
    font-size: .9rem;
    padding-right: 7px;
}

.flex-c-full {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.ptr {
    cursor: pointer;
}
/* margin and padding styling ending */

.sub-title {
    font-weight: 500;
}

.hidecheckbox {
    display: none;
}

.collapsed-item {
    display: none;
    width: 100%;
}

.arrow-show-all {
    display: flex;
}

.arrow-hide-all {
    display: none;
}

.arrow-show-all p,
.arrow-hide-all p {
    font-weight: 500;
}

.hidecheckbox:checked + label + .collapsed-item {
    display: flex;
}

.hidecheckbox:checked + label .arrow-show-all {
    display: none;
}

.hidecheckbox:checked + label .arrow-hide-all {
    display: flex;
}
/* checkbox hack */
</style>