<template>
    <button v-if="!link" :class="[size, mode]">
        <slot/>
    </button>
    <nuxt-link v-else :to="to" :class="[size, mode]">
        <slot/>
    </nuxt-link>
</template>

<script>
export default {
    props: {
        size: {
            type: String,
            required: false,
            default: "small"
        },
        mode: {
            type: String,
            required: false,
            default: "normal"
        },
        link: {
            type: Boolean,
            required: false,
            default: false
        },
        to: {
            type: String,
            required: false,
            default: '/'
        }
    }
}
</script>

<style scoped>
    .button,
    a {
        text-decoration: none;
        border-radius: 20px;
        cursor: pointer;
        text-decoration: none;
        font-weight: 500;
    }

    .button:hover,
    a:hover {
        background-color: var(--color-company2);
        text-decoration: none;
    }

    .small {
        padding: 8.4px 40px;
    }

    .medium {
        padding: 8.4px 50px;
    }

    .large {
        padding: 8.4px 70px;
    }

    .normal {
        background-color: var(--color-company);
        color: var(--color-white);
    }

    .normal:hover {
        background-color: var(--color-company2);
    }

    .inverse {
        background-color: var(--color-white);
        color: var(--color-company2);
    }

    .inverse:hover {
        background-color: var(--color-company);
    }
</style>