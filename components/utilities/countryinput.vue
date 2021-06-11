<template>
    <div class="normal-form">
        <label :for="name" v-if="hasSlot" class="mb1">
            <slot></slot>
            <span v-if="mustFill" class="label-required">*</span>
            <span v-else-if="isBold" class="label-bold">(optional)</span>
        </label>

        <!-- country name dropdown input (AFRICA) -->
        <select id="country" :name="name" :value="value"  @input="$emit('input', $event.target.value)" >
            <option value="Algeria">Algeria</option>
            <option value="Angola">Angola</option>
            <option value="Benin">Benin</option>
            <option value="Botswana">Botswana</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Congo, Democratic Republic of the Congo">Congo, Democratic Republic of the Congo</option>
            <option value="Cote D'Ivoire">Cote D'Ivoire</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Egypt">Egypt</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Ghana">Ghana</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-Bissau">Guinea-Bissau</option>
            <option value="Kenya">Kenya</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malawi">Malawi</option>
            <option value="Mali">Mali</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mayotte">Mayotte</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Namibia">Namibia</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Reunion">Reunion</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Saint Helena">Saint Helena</option>
            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
            <option value="Senegal">Senegal</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Sudan">South Sudan</option>
            <option value="Sudan">Sudan</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
            <option value="Togo">Togo</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Uganda">Uganda</option>
            <option value="Western Sahara">Western Sahara</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
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
        inputType: {
            type: String,
            required: false,
            default: "text"
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