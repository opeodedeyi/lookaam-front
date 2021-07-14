<template>
    <div v-if="uploaded" class="mini-card">
        <img :src="cardImage" alt="ima"  class="mini-card-image"/>
        <div class="mini-card-delete pos" @click="removeImage">
            <cancletwo></cancletwo>
        </div>
    </div>
    <div v-else class="mini-card">
        <img :src="cardImage" alt="ima"  class="mini-card-image"/>
        <div class="mini-card- pos">
            <miniloading></miniloading>
        </div>
    </div>
</template>

<script>
import cancletwo from "@/components/utilities/cancletwo";
import miniloading from "@/components/utilities/miniloading";

export default {
    components: {
        cancletwo,
        miniloading
    },
    props: {
        objId: {
            type: String,
            required: false,
            default: "the default string!"
        },
        uploaded: {
            type: Boolean,
            required: false,
            default: false
        },
        cardImage: {
            type: String,
            required: false,
        }
    },
    methods: {
        removeImage() {
            this.$emit("remove-image", this.objId);
        }
    }
}
</script>

<style scoped>
.mini-card {
    background: rgb(34, 34, 34, 0.5);
    grid-column: span 3;
    height: 140px;
    border-radius: 20px;
    position: relative;
}

.mini-card-image {
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-radius: 20px;
}

.pos {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>