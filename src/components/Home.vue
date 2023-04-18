<template>
    <div class="hero is-fullheight">
		<div class="hero-body is-justify-content-center is-align-items-center">
			<div v-if="user.loggedIn">
				<div class="">Welcome, {{user.data.displayName}}</div>
				<div class="message alert-success" role="alert">
					You are logged in!
				</div>
			</div>
			<div v-else>
				<div class="message is-danger" role="alert">
					<h2>You are not logged in!</h2>
				</div>
			</div>
		</div>
    </div>
</template>
  
<script>
import { store } from "../store";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { auth } from '../firebase';

export default {
name: "HomeComponent",

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