<template>
    <button v-if="!link" :class="[size, mode]" @click.prevent="onClick">
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
        },
        onClick: {
            type: Function,
            required: false
        }
    }
}
</script>

<style scoped>
    button,
    a {
        text-decoration: none;
        border-radius: 20px;
        cursor: pointer;
        text-decoration: none;
        font-weight: 500;
    }

    button {
        border: none;
        font-size: .9rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    button:hover,
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

    .max {
        width: 100%;
        height: 2.5rem;
    }

    .filter {
        width: 110px;
        height: 2.5rem;
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
        background-color: var(--color-card);
    }

    .outline {
        background-color: var(--color-white);
        color: var(--color-dark);
        border: 1px solid var(--color-dark);
    }

    .outline:hover {
        background-color: var(--color-gray);
    }

    .filter {
        background-color: var(--color-gray);
        color: var(--color-dark);
        border: none;
    }

    .filter:hover {
        background-color: var(--color-gray-darker);
    }

    @media only screen and (max-width: 999.9px) {
        .filter {
            max-width: 73px;
            height: 2rem;
        }

        .filter {
            background: none;
            color: var(--color-dark);
            border: none;
        }

        .filter:hover {
            background: none;
        }
    }
</style>