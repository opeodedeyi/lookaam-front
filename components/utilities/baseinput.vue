<template>
  <div class="input-layout">
    <label :for="name">{{ label }}</label>
    <input type="text" :name="name" :placeholder="placeholder">
  </div>
</template>


<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: false,
            default: "text goes here"
        },
        label: {
            type: String,
            required: true
        },
    }
}
</script>

<style scoped>
.input-layout {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.input-layout label,
.input-layout input {
    width: 100%;
}
</style>