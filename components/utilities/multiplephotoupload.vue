<template>
    <form>
        <div class="file" @dragover.prevent="addDragOvFeedback" @dragleave.prevent="removeDragOvFeedback" @drop.prevent="drop($event)">
            <input type="file" name="file" id="file" class="file-input" accept="image/*" @change="onFilePicked" multiple>
            <label  for="file" class="file-button">
                <img class="file-button-image" src="~/assets/svg/upload.svg" alt="" /><span>upload photos</span>
            </label>
            <div class="file-gallery" @drop.prevent="drop($event)">
                <app-mini-card uploaded cardImage="https://www.ndtv.com/education/cache-static/media/presets/625X400/article_images/2021/4/27/iit-madras-3d-house.webp" @remove-image="removeSingleImage"></app-mini-card>
                <app-mini-card cardImage="https://www.ndtv.com/education/cache-static/media/presets/625X400/article_images/2021/4/27/iit-madras-3d-house.webp"></app-mini-card>
                <app-mini-card cardImage="https://www.ndtv.com/education/cache-static/media/presets/625X400/article_images/2021/4/27/iit-madras-3d-house.webp"></app-mini-card>
            </div>
        </div>
    </form>
</template>


<script>
import minicard from "@/components/card/minicard.vue";

export default {
    components: {
        'app-mini-card': minicard
    },
    data() {
        return {
            img: []
        }
    },
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
            e.preventDefault();
            e.stopPropagation();
            e.target.classList.add('solid');
        },
        removeDragOvFeedback(e) {
            e.preventDefault();
            e.stopPropagation();
            e.target.classList.remove('solid');
        },
        drop(e) {
            e.preventDefault();
            e.stopPropagation();
            e.target.classList.remove('solid');
            const files = e.dataTransfer.files;
            this.handleFiles(files);
        },
        onFilePicked(e) {
            e.preventDefault();
            e.stopPropagation();
            const files = e.target.files;
            this.handleFiles(files);
        },
        handleFiles(files) {
            const Files = Array.from(files);
            var imageType = /image.*/;
            Files.forEach(file => {
                console.log(file.type);
            });
            console.log(Files, "loaded files");
        },
        removeSingleImage(imageObjId) {
            console.log(imageObjId);
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
    padding: 10px;
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
    margin-top: 10px;
    border: none !important;
    display: grid;
    grid-template-columns: repeat(6, minmax(auto, 100px));
    gap: 10px;
}

/* Large screens */
@media only screen and (min-width: 1000px) {
    .file {
        padding: 20px;
    }

    .file-gallery {
        margin-top: 20px;
        gap: 20px;
    }
}
</style>