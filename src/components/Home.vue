<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="card">
					<div v-if="user.loggedIn">
						<div class="card-header">Welcome, {{user.data.displayName}}</div>
						<div class="card-body">
							<div class="alert alert-success" role="alert">
								You are logged in!
								<div class="my-4">
										<button  @click.prevent="signOut" class="btn btn-primary">Log Out</button>
								</div>
							</div>
						</div>
					</div>
					<div v-else class="alert alert-danger" role="alert">
						You are not logged in!
					</div>
				</div>

				<div v-for="p in posts" :key="p.id" class="card my-3">
				<img :src=p.imgURL class="card-img-top">
				<div class="card-body">
					<h5 class="card-title">{{p.title}}</h5>
					<p class="card-text">{{p.caption}}</p>
				</div>
				</div>


			</div>
		</div>
	</div>
</template>

<script>
import { store } from "../store";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { auth, colRefPosts } from '../firebase';
import { getDocs, doc, deleteDoc } from "firebase/firestore";

export default {
	name: "HomeComponent",
	data(){
		return {
			posts: [],
		};
	},
	methods:{
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
	},
	setup() {
		const userStore = store;
		const router = useRouter();

		auth.onAuthStateChanged(user => {
			userStore.dispatch("fetchUser", user);
		});

		const user = computed(() => {
			return userStore.getters.user;
		});

		const signOut = async () => {
			await userStore.dispatch('logOut')
			router.push('/')
		}

		return {user,signOut}
	}
};
</script>