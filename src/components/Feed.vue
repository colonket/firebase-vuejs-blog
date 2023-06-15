<template>
    <div v-for="p in posts" :key="p.id" class="card my-2 mx-auto">
        <img :src=p.imgURL class="card-img-top">
        <div class="card-body">
            <h5 class="card-title text-center">{{p.title}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{formatDate(p.date)}}</h6>
            <p class="card-text">{{p.desc}}</p>
        </div>
    </div>
</template>

<script>
import { colRefPosts } from '../firebase';
import { getDocs, doc, deleteDoc } from "firebase/firestore";
export default {
	name: "FeedComponent",
	data(){
		return {
			posts: [],
		};
	},
	methods:{
        formatDate(date){
            date = Date.parse(date);
            date = new Date(date);
            date = new Date(date).toISOString().replace(/T/, ' ').replace(/\..+/, '');
            return date;
        },
		async fetchPosts(){
			let postsSnapshot = await getDocs(colRefPosts);
			let posts = [];
			postsSnapshot.forEach(p=>{
				let pData = p.data();
				pData.id = p.id;
				posts.push(pData);
			});
			//console.log(posts);
			this.posts = posts;
		},
	},
	created(){
		this.fetchPosts();
    }
}
</script>