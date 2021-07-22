import Vue from 'vue'

Vue.mixin({
    methods:{
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
        webpConvert(file) {
            return new Promise((resolve) => {
                // convert image
                let src = URL.createObjectURL(file)
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d')
        
                let userImage = new Image();
                userImage.src = src
        
                userImage.onload = async function() {
                    canvas.width = userImage.width;
                    canvas.height = userImage.height;
                    ctx.drawImage(userImage, 0, 0);
        
                    let webpImage = canvas.toDataURL("image/webp");
                    return resolve(webpImage);
                }
            });
        },
        dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);
        
            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        
            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
        
            return new Blob([ia], {type:mimeString});
        },
        async convertToWebp(file) {
            let webpimage = await this.webpConvert(file)
            let webpblob = await this.dataURItoBlob(webpimage);
            var webpFile = new File( [webpblob], `${this.getRandomName(20)}.webp`, { type: 'image/webp' } );
            return webpFile
        }
    }
})
