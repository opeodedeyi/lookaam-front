<template>
    <div class="normal-form">
        <label :for="name" v-if="hasSlot" class="mb1">
            <slot></slot>
            <span v-if="mustFill" class="label-required">*</span>
            <span v-else-if="isBold" class="label-bold">(optional)</span>
        </label>

        <select id="country" :name="name" :value="value"  @input="$emit('input', $event.target.value)" >
            <option>select country</option>
            <option value="213">Algeria (213)</option>
            <option value="244">Angola (244)</option>
            <option value="229">Benin (229)</option>
            <option value="267">Botswana (267)</option>
            <option value="226">Burkina Faso (226)</option>
            <option value="257">Burundi (257)</option>
            <option value="237">Cameroon (237)</option>
            <option value="238">Cape Verde (238)</option>
            <option value="236">Central African Republic (236)</option>
            <option value="235">Chad (235)</option>
            <option value="269">Comoros (269)</option>
            <option value="242">Congo (242)</option>
            <option value="242">Congo, Democratic Republic of the Congo (242)</option>
            <option value="225">Cote D'Ivoire (225)</option>
            <option value="253">Djibouti (253)</option>
            <option value="20">Egypt (20)</option>
            <option value="240">Equatorial Guinea (240)</option>
            <option value="291">Eritrea (291)</option>
            <option value="251">Ethiopia (251)</option>
            <option value="241">Gabon (241)</option>
            <option value="220">Gambia (220)</option>
            <option value="233">Ghana (233)</option>
            <option value="224">Guinea (224)</option>
            <option value="245">Guinea-Bissau (245)</option>
            <option value="254">Kenya (254)</option>
            <option value="266">Lesotho (266)</option>
            <option value="231">Liberia (231)</option>
            <option value="218">Libyan Arab Jamahiriya (218)</option>
            <option value="261">Madagascar (261)</option>
            <option value="265">Malawi (265)</option>
            <option value="223">Mali (223)</option>
            <option value="222">Mauritania (222)</option>
            <option value="230">Mauritius (230)</option>
            <option value="269">Mayotte (269)</option>
            <option value="212">Morocco (212)</option>
            <option value="258">Mozambique (258)</option>
            <option value="264">Namibia (264)</option>
            <option value="227">Niger (227)</option>
            <option value="234">Nigeria (234)</option>
            <option value="262">Reunion (262)</option>
            <option value="250">Rwanda (250)</option>
            <option value="290">Saint Helena (290)</option>
            <option value="239">Sao Tome and Principe (239)</option>
            <option value="221">Senegal (221)</option>
            <option value="248">Seychelles (248)</option>
            <option value="232">Sierra Leone (232)</option>
            <option value="252">Somalia (252)</option>
            <option value="27">South Africa (27)</option>
            <option value="211">South Sudan (211)</option>
            <option value="249">Sudan (249)</option>
            <option value="268">Swaziland (268)</option>
            <option value="255">Tanzania(255)</option>
            <option value="228">Togo (228)</option>
            <option value="216">Tunisia (216)</option>
            <option value="256">Uganda (256)</option>
            <option value="212">Western Sahara (212)</option>
            <option value="260">Zambia (260)</option>
            <option value="263">Zimbabwe (263)</option>
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