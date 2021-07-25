import Vue from 'vue'
import S3 from "aws-s3";

Vue.mixin({
    methods:{
        async uploadToS3(file, arg1, arg2, arg3, arg4, arg5) {
            const config = {
                bucketName: arg1,
                dirName: arg2,
                region: arg3,
                accessKeyId: arg4,
                secretAccessKey: arg5,
            }
            console.log(arg1, arg2, arg3, arg4, arg5);

            const S3Client = new S3(config)
            let uploadedData = S3Client.uploadFile(file, this.getRandomName(30))
            return uploadedData
        },
        async uploadAvatarToS3(file) {
            const config = {
                bucketName: process.env.AWS_BUCKET_NAME,
                dirName: process.env.AWS_DIR_NAME_2,
                region: process.env.AWS_REGION_1,
                accessKeyId: process.env.AWS_ID,
                secretAccessKey: process.env.AWS_SECRET,
            }

            const S3Client = new S3(config)
            let uploadedData = S3Client.uploadFile(file, this.getRandomName(30))
            return uploadedData
        }
    }
})
