<template>
    <form enctype="multipart/form-data" method="post">
        <div class="file">
            <input type="file" name="file" id="file" accept="image/*" multiple>
        </div>
    </form>
</template>


<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        objId: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.file {
    width: 100%;
    min-height: 300px;
    background-color: var(--color-gray);
    border-radius: 20px;
    padding: 20px;
    margin-top: 1.5rem;
    border: 0.3px dashed var(--color-gray-darker);
}
</style>