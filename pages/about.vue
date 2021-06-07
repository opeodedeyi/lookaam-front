<template>
    <div class="about-body">
        <div class="about-body-one">
            <p class="about-body-one-title">OUR GOAL</p>
            <p class="about-body-one-explaination">"OUR GOAL IS TO PROVIDE YOU WITH THE MOST CREATIVE AND BEAUTIFUL SETTINGS FOR YOUR VIDEOSHOOT OR EVENTS."</p>
        </div>
        <div class="about-body-two"></div>
    </div>
</template>


<style scoped>
.about-body {
    padding: 70px 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
}

.about-body-one {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    max-width: 600px;
}

.about-body-one-title {
    font-size: 1.6rem;
    font-weight: 500;
}

.about-body-one-explaination {
    margin-top: 1.4rem;
    font-size: 1.4rem;
    font-weight: 300;
    text-align: center;
}

@media only screen and (max-width: 999.9px) {
    .about-body {
        padding: 30px 20px;
    }

    .about-body-one-explaination {
        margin-top: 1.4rem;
        font-size: 1.1rem;
    }
}
</style>