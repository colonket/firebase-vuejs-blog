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
                    @change="prepareImage"
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
            title: this.getTimeStamp(),
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
    created(){
    },
    methods: {
        getTimeStamp(){
            const today = new Date();
            const timestamp = today.toISOString();
            return timestamp;
        },
        prepareImage(event){
            this.imgData = event.target.files[0];
        },
        async createPost(){
            if(!this.imgData){
                console.log("No file selected!");
                return 1;
            }

            this.title=this.getTimeStamp();

            const storage = getStorage();

            this.imgURL=null;
            let uuid = self.crypto.randomUUID();
            const imgFileType = this.imgData.name.split('.')[1];
            const imgRef = ref(storage, `img/${uuid}.${imgFileType}`);

            await uploadBytes(imgRef, this.imgData).then(
                (snapshot) => {
                    console.log('Uploaded a blob or file!');
                }, e=>{console.log(e.message)},
            );

            await getDownloadURL(imgRef).then((url)=>{
                this.imgURL=url;
                console.log("Got download url! -> ",url);
            }).catch((e)=>console.log(e.message))

            const postData = {
                title: this.title,
                caption: this.caption,
                imgURL: this.imgURL
            }
            console.log("Prepared post data json! -> ",postData);

            const addedDoc = await addDoc(colRefPosts, postData);
            console.log("Document added! -> ",addedDoc);
            this.$router.push('/');
        }
    }
}
</script>