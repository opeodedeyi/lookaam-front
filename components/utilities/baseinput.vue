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
            maxlength="50"
            :name="name" 
            :placeholder="placeholder" 
            :value="value" 
            @input="$emit('input', $event.target.value) ">
        <!-- email input -->
        <input 
            v-if="controlType === 'input' && inputType ==='email'" 
            type="email" 
            :name="name" 
            :placeholder="placeholder" 
            :value="value" 
            @input="$emit('input', $event.target.value) ">
        <!-- number input -->
        <input 
            v-if="controlType === 'input' && inputType ==='number'" 
            type="number" 
            maxlength="12"
            :name="name" 
            :placeholder="placeholder" 
            :value="value" 
            min="0"
            @input="$emit('input', $event.target.value) ">
        <!-- textarea input -->
        <div class="textarea" v-if="controlType === 'textarea'">
            <textarea  
                :name="name" 
                :placeholder="placeholder" 
                :maxlength="maxLength"
                :value="value"
                @input="$emit('input', $event.target.value) ">
            </textarea>
            <div class="textarea-count">{{ countLeft }}</div>
        </div>
        <!-- time input -->
        <input 
            v-if="controlType === 'input' && inputType ==='time'" 
            type="time"
            :name="name" 
            :value="value" 
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
        maxLength: {
            type: Number,
            required: false,
            default: 300
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
    },
    computed: {
        countLeft() {
            if (this.value===null) {
                return this.maxLength
            }
            return this.maxLength-this.value.length
        }
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

input,
textarea {
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

input[type=time] {
    width: 140px;
    background: url('~assets/svg/clock.svg') no-repeat var(--color-gray);
    background-position: right 16px top 50%;
    -webkit-appearance: none;
}

input[type="time"]::-webkit-calendar-picker-indicator {
    background: url('~assets/svg/clock.svg') no-repeat var(--color-gray);
    background-position: right 5px top 50%;
    background-size: 15px;
}

input:-internal-autofill-selected {
    appearance: menulist-button;
    background-color: var(--color-gray);
    background-image: none !important;
    color: var(--color-dark);
}

.normal-form .textarea {
    widows: 100%;
    font-size: .95rem;
    color: var(--color-dark);
    padding: 10px 16px;
    background-color: var(--color-gray);
    border: none;
    border-radius: 20px;
    outline: none;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
}

.textarea-count {
    height: 20px;
    width: 100%;
    color: var(--color-company);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    font-size: .8rem;
}

textarea {
    height: 150px;
    width: 100%;
    font-size: .95rem;
    color: var(--color-dark);
    background-color: var(--color-gray);
    border: none;
    outline: none;
    resize: none;
    overflow: hidden;
}

.label-required {
    color: var(--color-danger);
}

.label-bold {
    font-weight: 500;
}

/* below is to hide arrows for number input */
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
/* above is to hide arrows for number input */

</style>