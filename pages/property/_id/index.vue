<template>
    <div class="property-details-container">
        property {{ $route.params.id }}
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.property-details-container {
    padding: 0 50px;
}

@media only screen and (max-width: 999.9px) {
    .property-details-container {
        padding: 0 20px;
    }
}
</style>