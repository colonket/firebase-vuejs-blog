<template>
	             
	<div class="hero is-fullheight">
		<div class="hero-body is-justify-content-center is-align-items-center">
			<div v-if="error" class="message is-danger">{{error}}</div>
			<form action="#" @submit.prevent="Register">
				<div class="columns is-flex is-flex-direction-column box">
					<div class="column">
						<input 
							id="name"
							type="name"
							class="input is-primary"
							name="name"
							value
							required
							autofocus
							v-model="name"
							placeholder="Display Name"
						/>
					</div>
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
						<button class="button is-primary is-fullwidth" type="submit">Register</button>
					</div>
					<div class="has-text-centered">
						<p class="is-size-7"> Already have an account? <a href="/login" class="has-text-primary">Log in</a>
						</p>
					</div>
				</div>
			</form>
		</div>
	</div>
  
  </template>
  
  
  <script>
  import { ref } from 'vue'
  //import { useStore } from 'vuex'
  import { store } from '../store'
  import { useRouter } from 'vue-router'
  
  export default {
    name: "RegisterComponent",
   setup() {
      const name = ref('')
      const email = ref('')
      const password = ref('')
      const error = ref(null)
  
      const storeRef = store;
      const router = useRouter()
  
      const Register = async () => {
        try {
          await storeRef.dispatch('register', {
            email: email.value,
            password: password.value,
            name: name.value
          })
          router.push('/')
        }
        catch (err) {
          error.value = err.message
              }
      }
  
      return { Register, name,email, password, error }
    }
  };
  </script>