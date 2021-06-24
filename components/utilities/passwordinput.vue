<template>
    <div class="normal-form">
        <label :for="name" v-if="hasSlot" class="mb1">
            <slot></slot>
            <span v-if="mustFill" class="label-required">*</span>
            <span v-else-if="isBold" class="label-bold">(optional)</span>
        </label>
        <!-- password input -->
        <div class="password-input">
            <input  
                :name="name"
                :type="isShown?'password':'text'" 
                :placeholder="placeholder"
                :value="value"
                @input="$emit('input', $event.target.value) ">
            <div class="si" @click="togglepassword">
                <img v-if="isShown" src="~/assets/svg/eye.svg" alt="" />
                <img v-else src="~/assets/svg/eyehide.svg" alt="" />
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            isShown: true,
        }
    },
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
    methods: {
        togglepassword() {
            this.isShown = !this.isShown;
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

.password-input {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    outline: none;
    border: none;
    background-color: var(--color-gray);
    border-radius: 20px;
    height: 40px;
    width: 100%;
    padding: 0 16px;
}

.password-input input {
    font-size: .95rem;
    color: var(--color-dark);
    background-color: var(--color-gray);
    border: none;
    border-radius: 20px;
    outline: none;
    flex-grow: 1;
}

.label-required {
    color: var(--color-danger);
}

.label-bold {
    font-weight: 500;
}

.si {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    cursor: pointer;
}

img {
    height: 1.3rem;
    color: blue;
}
</style>