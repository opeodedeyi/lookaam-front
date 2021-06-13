<template>
    <label :for="name" class="inline-form radio">
        <slot></slot>
        <input type="radio" :name="name" :id="name" class="radio-input" :checked="isChecked" :value="value" @change="$emit('change', $event.target.value)">
        <div class="radio-radio"></div>
    </label>
</template>


<script>
export default {
    model: {
        prop: 'modelValue',
        event: 'change'
    },
    props: {
        name: {
            type: String,
            required: true
        },
        value: {
            type: Boolean,
            default: true
        },
        modelValue: { 
            type: Boolean,
        },
    },
    computed: {
        isChecked() {
            return this.modelValue == this.value
        }
    }
}
</script>

<style scoped>
.inline-form {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    margin-right: 2rem;
}

.radio {
    font-size: 1rem;
    cursor: pointer;
}

.radio-input {
    display: none;
}

.radio-radio {
    height: 20px;
    width: 20px;
    margin-left: 10px;
    border: 2px solid var(--color-company);
    border-radius: 50%;
    box-sizing: border-box;
    padding: 2px;
    cursor: pointer;
}

.radio-radio:hover {
    border-color: var(--color-company2);
}

.radio-radio::after {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    background: var(--color-company);
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.1s;
}

.radio-input:checked + .radio-radio::after {
    transform: scale(1);
}
</style>