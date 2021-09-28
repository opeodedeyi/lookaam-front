<template>
    <div class="normal-form" :class="{ maxxx: overlay }">
        <label :for="name" v-if="hasSlot" class="mb1">
            <slot></slot>
            <span v-if="mustFill" class="label-required">*</span>
            <span v-else-if="isBold" class="label-bold">(optional)</span>
        </label>

        <!-- Type of place dropdown input -->
        <select id="topinput" :name="name" :value="value" @input="$emit('input', $event.target.value)" >
            <option value="studio">Studio</option>
            <option value="house">House</option>
            <option value="field">Field</option>
            <option value="room">Room</option>
            <option value="restaurant">Restaurant</option>
            <option value="school">School</option>
            <option value="church">Church</option>
            <option value="beach">Beach</option>
            <option value="warehouse">Warehouse</option>
            <option value="road">Road</option>
            <option value="rooftop">Rooftop</option>
            <option value="others">Others</option>
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
        overlay: {
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

.maxxx {
    max-width: 260px;
}

.maxxx label {
    font-weight: 500;
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