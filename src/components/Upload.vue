<template>
<div>
    <div >
        <p>Upload an image to Firebase:</p>
        <input type="file" @change="previewImage" accept="image/*" >                
    </div>
    <div v-if="imageData!=null">                     
        <button @click="onUpload">Upload</button>
        <br>
        <img class="preview" :src="picture">
    </div>   
</div>
</template>

<script>
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
export default {
    name: "UploadComponent",
    data(){
        return{
            imageData: null,
            picture: null,
        }
    },
    methods: {
        previewImage(event){
            this.picture=null;
            this.imageData = event.target.files[0];
        },
        onUpload(){
            this.picture=null;
            const storage = getStorage();
            const imgPath = `images/${this.imageData.name}`
            const imgRef = ref(storage, imgPath);
            uploadBytes(imgRef, this.imageData).then(
                (snapshot) => {
                    console.log('Uploaded a blob or file!');
                    getDownloadURL(imgRef).then((url)=>{
                        console.log(url);
                        this.picture=url;
                    }).catch((e)=>console.log(e.message))
                }, e=>{console.log(e.message)},
            );
        },
    }
}
</script>