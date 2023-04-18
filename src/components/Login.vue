<template>
    <div class="hero is-fullheight">
		<div class="hero-body is-justify-content-center is-align-items-center">
			<div v-if="error" class="message is-danger">{{error}}</div>
			<form action="#"  @submit.prevent="Login">
				<div class="columns is-flex is-flex-direction-column box">
					<div class="column">
						<input
							id="email"
							type="email"
							class="input is-primary"
							name="email"
							value
							required
							autofocus
							v-model="email"
							placeholder="Email Address"
						/>
					</div>
					<div class="column">
						<input
							id="password"
							type="password"
							class="input is-primary"
							name="password"
							required
							v-model="password"
							placeholder="Password"
						/>
					</div>
					<div class="column">
						<button class="button is-primary is-fullwidth" type="submit">Login</button>
					</div>
					<div class="has-text-centered">
						<p class="is-size-7"> Don't have an account? <a href="/register" class="has-text-primary">Sign up</a>
						</p>
					</div>
				</div>
			</form>
		</div>
	</div>

</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
name: "LoginComponent",
	setup() {
	const email = ref('')
	const password = ref('')
	const error = ref(null)

	const store = useStore()
	const router = useRouter()

	const Login = async () => {
	try {
		await store.dispatch('logIn', {
		email: email.value,
		password: password.value
		})
		router.push('/')
	}
	catch (err) {
		error.value = err.message
	}
	}
	return { Login, email, password, error }
}
};
</script>