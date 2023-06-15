<template>
	<div class="container">
		<div class="row justify-content-center mx-auto">
			<div class="col-md-8">
				<feed/>
			</div>
		</div>
	</div>
</template>

<script>
import { store } from "../store";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { auth, colRefPosts } from '../firebase';
import feed from "./Feed.vue";

export default {
	name: "HomeComponent",
	components:{
		feed
	},
	data(){
		return {
		};
	},
	methods:{
	},
	created(){
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