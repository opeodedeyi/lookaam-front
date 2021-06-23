<template>
    <button v-if="!link" :class="[size, mode]" @click.prevent="onClick">
        <slot/>
        <div v-if="loading" class="loading-spinner"></div>
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
        loading: {
            type: Boolean,
            required: false,
            default: false
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

    .great {
        padding: 8.4px 90px;
    }

    .greater {
        padding: 8.4px 110px;
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

    .loading {
        background-color: var(--color-loading);
        color: var(--color-white);
    }

    .loading:hover {
        background-color: var(--color-loading);
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

    .google {
        background-color: var(--color-gray);
        color: var(--color-dark);
        border: 1px solid var(--color-dark);
    }

    .google:hover {
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



/* animations animations animations animations animations */
@-webkit-keyframes rotate-forever {
    0% {
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@-moz-keyframes rotate-forever {
    0% {
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@keyframes rotate-forever {
    0% {
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

.loading-spinner {
    -webkit-animation-duration: 0.75s;
    -moz-animation-duration: 0.75s;
    animation-duration: 0.75s;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-name: rotate-forever;
    -moz-animation-name: rotate-forever;
    animation-name: rotate-forever;
    -webkit-animation-timing-function: linear;
    -moz-animation-timing-function: linear;
    animation-timing-function: linear;
    height: 16px;
    width: 16px;
    border: 3px solid #ffffff;
    border-right-color: transparent;
    border-radius: 50%;
    margin-left: .5rem;
}
</style>