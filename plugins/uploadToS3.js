import Vue from 'vue'
import S3 from "aws-s3";

export default ({ $config: { bucketName, dirName, dirName2, region, accessKeyId, secretAccessKey } }) => {
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

                const S3Client = new S3(config)
                let uploadedData = S3Client.uploadFile(file, this.getRandomName(30))
                return uploadedData
            },
            async uploadAvatarToS3(file) {
                const config = {
                    bucketName,
                    dirName: dirName2,
                    region,
                    accessKeyId,
                    secretAccessKey,
                }

                const S3Client = new S3(config)
                let uploadedData = S3Client.uploadFile(file, this.getRandomName(30))
                return uploadedData
            }
        }
    })
}