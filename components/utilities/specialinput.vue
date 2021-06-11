<template>
    <div class="normal-form">
        <label :for="name" v-if="hasSlot" class="mb1">
            <slot></slot>
            <span v-if="mustFill" class="label-required">*</span>
            <span v-else-if="isBold" class="label-bold">(optional)</span>
        </label>

        <!-- text input -->
        <input 
            v-if="controlType === 'input' && inputType ==='text'" 
            type="text" 
            :name="name" 
            :placeholder="placeholder" 
            :value="value" 
            @input="$emit('input', $event.target.value) ">
        <!-- number input -->
        <input 
            v-if="controlType === 'input' && inputType ==='number'" 
            type="number" 
            :name="name" 
            :placeholder="placeholder" 
            :value="value" 
            min="0"
            @input="$emit('input', $event.target.value) ">
    </div>
</template>


<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: false,
            default: "text goes here"
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
        controlType: {
            type: String,
            required: false,
            default: 'input'
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

input {
    font-family: 'Jost';
}

.normal-form input {
    font-size: .95rem;
    color: var(--color-dark);
    padding: 9.2px 16px;
    background-color: var(--color-gray);
    border: none;
    border-radius: 20px;
    outline: none;
}

.normal-form textarea {
    font-size: .95rem;
    color: var(--color-dark);
    padding: 9.2px 16px 30px;
    background-color: var(--color-gray);
    border: none;
    border-radius: 20px;
    outline: none;
}

.label-required {
    color: var(--color-danger);
}

.label-bold {
    font-weight: 500;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

</style>