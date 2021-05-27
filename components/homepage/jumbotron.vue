<template>
    <div class="J-container">
        <p>Discover your next location for your <span></span></p>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .J-container {
        /* position: relative; */
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

    p span::before {
        content: '';
        animation: profile 7s infinite;
    }

    @keyframes profile {
        0% { content: 'Video Shoot'}
        33% { content: 'Events'}
        66% { content: 'House Party'}
        100% { content: 'Video Shoot'}
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