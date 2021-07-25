<template>
    <div>
        <div class="file" @dragover.prevent="addDragOvFeedback" @dragleave.prevent="removeDragOvFeedback" @drop.prevent="drop($event)">
            <input type="file" name="file" id="file" class="file-input" accept="image/*" @change="onFilePicked" multiple>
            <label  for="file" class="file-button">
                <img class="file-button-image" src="~/assets/svg/upload.svg" alt="" /><span>upload photos</span>
            </label>
            <div class="file-gallery" @drop.prevent="drop($event)">
                <app-mini-card v-for="(item, index) in uploading" :key="index" :cardImage="item"></app-mini-card>
                <app-mini-card v-for="uploadedItem in uploaded" :key="uploadedItem._id" uploaded :cardImage="uploadedItem.location" @remove-image="removeSingleImage(uploadedItem._id)"></app-mini-card>
            </div>
        </div>
    </div>
</template>


<script>
import minicard from "@/components/card/minicard.vue";

export default {
    name: "multiPhotoUpload",
    components: {
        'app-mini-card': minicard
    },
    computed: {
        config() {
            return{
                bucketName: process.env.AWS_BUCKET_NAME,
                dirName: process.env.AWS_DIR_NAME_1,
                region: process.env.AWS_REGION_1,
                accessKeyId: process.env.AWS_ID,
                secretAccessKey: process.env.AWS_SECRET,
            }
        }
    },
    data() {
        return {
            uploading: [],
            uploaded: [],
            bName: process.env.AWS_BUCKET_NAME,
            dName: process.env.AWS_DIR_NAME_1,
            regOne: process.env.AWS_REGION_1,
            aKeyId: process.env.AWS_ID,
            sAKey: process.env.AWS_SECRET,
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
        },
        propertyPhotos: {
            type: Array,
            required: false
        }
    },
    methods: {
        getRandomName(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters. charAt(Math. floor(Math. random() * 
                charactersLength));
            }
            return result;
        },
        addDragOvFeedback(e) {
            e.preventDefault();
            e.stopPropagation();
            e.target.classList.add('solid');
        },
        totalImageLength(e) {
            return this.uploading.length+this.uploaded.length
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
        async saveToBackend(file, result) {
            console.log(this.config);
            let uploadedResponse = await this.uploadToS3(file, this.bName, this.dName, this.regOne, this.aKeyId, this.sAKey)
            .then(response => {
                return response
            })
            .catch(err => {
                return err
            })

            // save image to API
            await this.$axios.patch(`/place/${this.objId}/photo`, uploadedResponse)
            .then(result => {
                // add to uploaded image to uploaded array
                const uploaded = this.uploaded
                const uploadedImage = result.data.image
                uploaded.push(uploadedImage)
                this.uploaded = uploaded
            })
            .catch(e => {
                console.log(e);
            })

            // remove from uploading
            const upload = this.uploading
            const newUpload = upload.filter((uploadingImage) => {
                uploadingImage != result
            })
            this.uploading = newUpload
        },
        async readFiles(file) {
            let webpFile = await this.convertToWebp(file)
            const reader = new FileReader();
            reader.readAsDataURL(webpFile)
            reader.onload = () => {
                const uploading = this.uploading
                const result = reader.result
                uploading.push(result)
                this.uploading = uploading
                
                // upload to aws, send to backend
                this.saveToBackend(webpFile, result)
            }
        },
        handleFiles(files) {
            const Files = Array.from(files);
            Files.forEach(file => {
                var noOfImages = this.totalImageLength()
                // check if image is a valid image and less than 15
                if (file.type.includes('image') && noOfImages<10) {
                    // display the image
                    return this.readFiles(file)
                }
                return
            });
        },
        getBackendImages() {
            if (this.objId!="null") {
                this.$axios.get(`/place/${this.objId}/photo`)
                .then(result => {
                    let backendImages = result.data
                    backendImages.forEach(obj => {
                        const uploaded = this.uploaded
                        uploaded.push(obj)
                        this.uploaded = uploaded
                    });
                })
                .catch(e => {
                    console.log(e);
                })
            } else {
                return
            }
        },
        removeSingleImage(imageObjId) {
            this.$axios.delete(`/photo/${imageObjId}`)
            .then(result => {
                const olduploaded = this.uploaded
                const newUploaded = olduploaded.filter((item) => {
                    return item._id !== imageObjId
                })
                this.uploaded = newUploaded
            })
            .catch(e => {
                console.log(e);
            })
        }
    },
    mounted() {
        this.getBackendImages();
    }
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
    margin-top: 15px;
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