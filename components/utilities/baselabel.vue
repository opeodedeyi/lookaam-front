<template>
    <label :for="name">
        <slot></slot>
        <span v-if="mustFill" class="label-required">*</span>
        <span v-else-if="isBold" class="label-bold">(optional)</span>
    </label>
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
        }
    }
}
</script>

<style scoped>
.mb2 {
    margin-bottom: .6rem;
}

label {
    font-size: 1rem;
    color: var(--color-dark);
}

.label-required {
    color: var(--color-danger);
}

.label-bold {
    font-weight: 500;
}
</style>