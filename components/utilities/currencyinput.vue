<template>
    <div class="normal-form">
        <label :for="name" v-if="hasSlot" class="mb1">
            <slot></slot>
            <span v-if="mustFill" class="label-required">*</span>
            <span v-else-if="isBold" class="label-bold">(optional)</span>
        </label>

        <!-- country name dropdown input (AFRICA) -->
        <select id="country" :name="name" :value="value"  @input="$emit('input', $event.target.value)" >
            <option value="GHS">Ghana GH₵</option>
            <option value="NGN">Nigeria ₦</option>
            <option value="USD">United States $</option>
            <option value="ZAR">South Africa R</option>
        </select>
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
        value: {
            type: String,
            default: ''
        },
        hasSlot: {
            type: Boolean,
            required: false,
            default: false
        }
    }
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

select {
    font-family: 'Jost';
}

.normal-form select {
    font-size: .95rem;
    color: var(--color-dark);
    padding: 9.2px 35px 9.2px 16px;
    border: none;
    border-radius: 20px;
    outline: none;
    background: url('~assets/svg/selectarrow.svg') no-repeat var(--color-gray);
    background-position: right 16px top 50%;
    -webkit-appearance: none;
    cursor: pointer;
}

option {
    background-color: var(--color-gray);
    color: var(--color-dark);
}

option:hover {
    background-color: var(--color-dark);
    color: var(--color-white);
}

.label-required {
    color: var(--color-danger);
}

.label-bold {
    font-weight: 500;
}
</style>