<template>
    <div class="inline-form">
        <label :for="name">
            <slot></slot>
        </label>

        <!-- checkbox input -->
        <div v-if="controlType === 'checkbox'" class="checkbox bounce">
            <input type="checkbox" :checked="isChecked" :name="name" :id="name" :value="value" @change="updateInput">
            <svg viewBox="0 0 21 21">
                <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
            </svg>
        </div>
        
    </div>
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
        controlType: {
            type: String,
            required: false,
            default: 'checkbox'
        },
        value: {
            type: String,
            required: true
        },
        modelValue: {
            default: "" 
        },
        trueValue: {
            type: Boolean,
            default: true 
        },
        falseValue: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isChecked() {
        if (this.modelValue instanceof Array) {
            return this.modelValue.includes(this.value)
        }
        // Note that `true-value` and `false-value` are camelCase in the JS
        return this.modelValue === this.trueValue
        }
    },
    methods: {
    updateInput(event) {
        let isChecked = event.target.checked
            if (this.modelValue instanceof Array) {
                let newValue = [...this.modelValue]
                if (isChecked) {
                newValue.push(this.value)
                } else {
                newValue.splice(newValue.indexOf(this.value), 1)
                }
                this.$emit('change', newValue)
            } else {
                this.$emit('change', isChecked ? this.trueValue : this.falseValue)
            }
        }
    }
}
</script>

<style scoped>
.inline-form {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: .4rem;
}

.checkbox {
  position: relative;
}

.checkbox input,
.checkbox svg {
  width: 16px;
  height: 16px;
  display: block;
}

.checkbox input {
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  outline: none;
  background: var(--color-white);
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  border-radius: 4px;
  transition: box-shadow 0.3s;
  box-shadow: inset 0 0 0 var(--s, 1px) var(--b, var(--color-company));
}

.checkbox input:hover {
  --s: 2px;
  --b: var(--color-company2);
}

.checkbox input:checked {
  --b: var(--color-company);
}

.checkbox svg {
  pointer-events: none;
  fill: none;
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: var(--stroke, var(--color-company));
  position: absolute;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  transform: scale(var(--scale, 1)) translateZ(0);
}

.checkbox.bounce {
    --stroke: var(--color-white);
}

.checkbox.bounce input:checked {
    --s: 9px;
}

.checkbox.bounce input:checked + svg {
    -webkit-animation: bounce 0.1s linear forwards 0.2s;
    animation: bounce 0.1s linear forwards 0.2s;
}

.checkbox.bounce svg {
  --scale: 0;
}

@-webkit-keyframes bounce {
    50% {
        transform: scale(1.2);
    }
    75% {
        transform: scale(0.9);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes bounce {
    50% {
        transform: scale(1.2);
    }
    75% {
        transform: scale(0.9);
    }
    100% {
        transform: scale(1);
    }
}
</style>