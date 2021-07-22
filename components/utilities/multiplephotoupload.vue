<template>
    <div>
        <div class="file" @dragover.prevent="addDragOvFeedback" @dragleave.prevent="removeDragOvFeedback" @drop.prevent="drop($event)">
            <input type="file" name="file" id="file" class="file-input" accept="image/*" @change="onFilePicked" multiple>
            <label  for="file" class="file-button">
                <img class="file-button-image" src="~/assets/svg/upload.svg" alt="" /><span>upload photos</span>
            </label>
            <div class="file-gallery" @drop.prevent="drop($event)">
                <app-mini-card v-for="(item, index) in uploading" :key="index" :cardImage="item"></app-mini-card>
                <!-- <app-mini-card v-for="(uploadedItem, uploadedIndex) in uploaded" :key="uploadedIndex" uploaded :cardImage="uploadedItem" @remove-image="removeSingleImage"></app-mini-card> -->
            </div>
        </div>
    </div>
</template>


<script>
import minicard from "@/components/card/minicard.vue";
import S3 from "aws-s3";

export default {
    components: {
        'app-mini-card': minicard
    },
    computed: {
    },
    data() {
        return {
            uploading: [],
            uploaded: []
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
            const config = {
                bucketName: process.env.AWS_BUCKET_NAME,
                dirName: 'photos', /* optional */
                region: process.env.AWS_REGION,
                accessKeyId: process.env.AWS_ID,
                secretAccessKey: process.env.AWS_SECRET,
                // s3Url: process.env.AWS_URL,
            }

            const S3Client = new S3(config)
            S3Client
            .uploadFile(file, this.getRandomName(10))
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })

            // save image to API

            // remove from uploading
            // const upload = this.uploading
            // const newUpload = upload.filter((uploadingImage) => {
            //     uploadingImage != result
            // })
            // this.uploading = newUpload
            // add to uploaded the actual image i get from aws and can be deletable
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
                
                // convert files, upload to aws, send to backend
                this.saveToBackend(webpFile, result)
            }
        },
        handleFiles(files) {
            const Files = Array.from(files);
            Files.forEach(file => {
                // check if image is a valid image
                if (file.type.includes('image')) {
                    // display the image
                    return this.readFiles(file)
                }
                return
            });
            // console.log(Files, "loaded files");
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