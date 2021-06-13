<template>
    <div class="normal-form">
        <label :for="name" v-if="hasSlot" class="mb1">
            <slot></slot>
            <span v-if="mustFill" class="label-required">*</span>
            <span v-else-if="isBold" class="label-bold">(optional)</span>
        </label>
        <!-- control input -->
        <div class="control">
            <button type="button" v-if="value>0" class="control-button" @click="decreaseNumber"><img src="~/assets/svg/minus.svg" alt="-"/></button>
            <button type="button" v-else class="control-button" @click="doNothing"></button>
            <div class="control-content">
                {{value}}
            </div>
            <button type="button" v-if="value<40" class="control-button" @click="increaseNumber"><img src="~/assets/svg/plus.svg" alt="+"/></button>
            <button type="button" v-else class="control-button" @click="doNothing"></button>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        mustFill: {
            type: Boolean,
            required: false,
            default: false
        },
        isBold: {
            type: Boolean,
            required: false,
            default: false
        },
        inputType: {
            type: String,
            required: false,
            default: "text"
        },
        value: {
            default: 0
        },
        hasSlot: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        decreaseNumber() {
            this.$emit('input', this.value - 1);
        },
        increaseNumber() {
            this.$emit('input', this.value + 1);
        },
        doNothing() {
            return
        },
    },
}
</script>

<style scoped>
.mb1 {
    margin-bottom: .3rem;
}

.normal-form {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
    margin-bottom: .9rem;
}

.control {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 180px;
}

.control-content {
    height: 40px;
    width: 60px;
    border-radius: 20px;
    border: none;
    color: var(--color-company);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    background-color: var(--color-gray);
}

.control-button {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    border: none;
    color: var(--color-company);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    background-color: var(--color-gray);
    cursor: pointer;
}

.control-button:hover {
    background-color: var(--color-gray-darker);
}

.disabled {
    color: var(--color-gray) !important;
    background-color: var(--color-gray) !important;
    cursor: none !important;
}

.disabled:hover {
    background-color: var(--color-gray) !important;
}

.control-button img {
    height: 25px;
}

.label-required {
    color: var(--color-danger);
}

.label-bold {
    font-weight: 500;
}
</style>