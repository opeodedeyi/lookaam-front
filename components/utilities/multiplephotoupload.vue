<template>
    <form enctype="multipart/form-data">
        <div class="file" @dragenter="addDragOvFeedback" @dragover="addDragOvFeedback" @dragend="removeDragOvFeedback" @dragleave="removeDragOvFeedback" @drop="dropDragEvent">
            <input type="file" name="file" id="file" class="file-input" accept="image/*" multiple>
            <label  for="file" class="file-button">
                <img class="file-button-image" src="~/assets/svg/upload.svg" alt="" /><span>upload photos</span>
            </label>
            <div class="file-gallery"></div>
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
    },
    methods: {
        addDragOvFeedback(e) {
            e.target.classList.add('solid');
        },
        removeDragOvFeedback(e) {
            e.target.classList.remove('solid');
        },
        dropDragEvent(e) {
            e.target.classList.remove('solid');
        }
    },
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
    border: 3px dashed var(--color-gray-darker);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}

.solid {
    border: 4px solid var(--color-gray-darker);
}

.file-input {
    display: none;
}

.file-button {
    font-size: .95rem;
    color: var(--color-dark);
    height: 40px;
    width: 190px;
    background-color: var(--color-white);
    border-radius: 20px;
    outline: none;
    border: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.file-button-image {
    margin-right: .5rem;
}

.file-gallery {
    width: 100%;
}
</style>