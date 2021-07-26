import Vue from 'vue'
import S3 from "aws-s3";

export default ({ $config: { bucketName, dirName, region, accessKeyId, secretAccessKey } }) => {
    Vue.mixin({
        methods:{
            async uploadToS3(file) {
                const config = {
                    bucketName,
                    dirName,
                    region,
                    accessKeyId,
                    secretAccessKey,
                }
                console.log(bucketName, dirName, region, accessKeyId, secretAccessKey);

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
}