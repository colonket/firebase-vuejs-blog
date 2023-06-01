<template>
<div class="container">
    <div v-if="user.loggedIn">
        <form @submit.prevent="createPost">
            <div class="form-group">
                <h3>Create a new post</h3>
                <input
                    type="text"
                    class="form-control mb-2"
                    placeholder="Post Title"
                    v-model="title"
                />
                <br>
                <input
                    type="file"
                    class="form-control mb-2"
                    @change="previewImage"
                    accept="image/*"
                >                
                <br>
                <textarea
                    type="text"
                    class="form-control mb-2"
                    placeholder="Caption"
                    v-model="caption"
                />
            </div>
            <div v-if="imgData!=null">                     
                <!--<a class="btn btn-primary" @click="onUpload">Upload</a>-->
                <img class="preview" :src="imgData">
            </div>   
            <button type="submit" class="btn btn-primary">Create Post</button>
        </form>
    </div>
    <div v-else>
        <div class="">
            <h3>You need to be logged in to use this page</h3>
        </div>
    </div>
</div>
</template>

<script>
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { computed } from 'vue';
import { store } from "../store";
import { addDoc } from "firebase/firestore";
import { colRefPosts } from "../firebase";

export default {
    name: "UploadComponent",
    data(){
        return{
            title: null,
            caption: null,
            imgURL: null,
            imgData: null
        }
    },
    setup(){
        const userStore = store;
        const user = computed(() => {
            return userStore.getters.user;
        })
        return {user}
    },
    methods: {
        previewImage(event){
            this.imgURL=null;
            this.imgData = event.target.files[0];
        },
        onUpload(){
        },
        async createPost(){
            this.imgURL=null;
            const storage = getStorage();
            let uuid = self.crypto.randomUUID();
            const imgFileType = this.imgData.name.split('.')[1];
            const imgRef = ref(storage, `img/${uuid}.${imgFileType}`);
            uploadBytes(imgRef, this.imgData).then(
                (snapshot) => {
                    console.log('Uploaded a blob or file!');
                    getDownloadURL(imgRef).then((url)=>{
                        console.log(url);
                        this.imgURL=url;
                    }).catch((e)=>console.log(e.message))
                }, e=>{console.log(e.message)},
            );
            const addedDoc = await addDoc(colRefPosts, this.$data);
            console.log(addedDoc);
            this.$router.push('/');
        }
    }
}
</script>