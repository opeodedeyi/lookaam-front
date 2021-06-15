<template>
    <div class="J-container">
        <p>Discover your next location for your <span class="highlight">{{words[i]}}</span></p>
    </div>
</template>

<script>
export default {
     data() {
        return {
            words: ["Video Shoot", "Events", "House Party"],
            i: 0
        }
    },
    mounted() {
        setInterval(() => {
            if (this.i < this.words.length-1) this.i++
            else this.i = 0
        }, 2000)
    }
}
</script>

<style scoped>
    .J-container {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        color: var(--color-white);
        height: 450px;
        padding: 0 50px;
        background: radial-gradient(50% 50% at 50% 50%, rgba(54, 73, 123, 0.3) 0%, rgba(17, 28, 57, 0.3) 100%), url('~assets/images/bg1.webp');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .J-container p {
        font-size: 2.7rem;
        font-weight: 600;
        max-width: 600px;
        line-height: 4rem;
    }

    .highlight {
        color: var(--color-company);
    }

    /* Small screens */
    @media only screen and (max-width: 760px) {
        .J-container {
            height: 380px;
            padding: 0 20px;
        }

        .J-container p {
            font-size: 2.1rem;
            font-weight: 600;
            width: 90%;
            max-width: 600px;
            line-height: 2.5rem;
        }
    }
</style>