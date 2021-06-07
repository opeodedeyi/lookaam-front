<template>
    <header>
        <logo/>
        <photwo/>
    </header>
</template>

<script>
import logo from "@/components/utilities/logo";
import photwo from "@/components/header/hu/photwo";

export default {
    components: {
        logo,
        photwo
    }
}
</script>

<style scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--color-white);
    width: 100%;
    height: 5rem;
    padding: 0 50px;
    z-index: 99;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-content: center;
    align-items: center;
}

/* Small screens */
@media only screen and (max-width: 999.9px) {
    header {
        padding: 0 20px;
    }
}
</style>
