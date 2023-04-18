<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="is-8">
          <div class="card">
            <div v-if="user.loggedIn">
              <div class="card-header">Welcome, {{user.data.displayName}}</div>
              <div class="card-body">
                <div class="message alert-success" role="alert">
                You are logged in!
                <div class="my-4">
                <button  @click.prevent="signOut" class="btn btn-primary">Log Out</button>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="p-4">
			<div class="message is-danger" role="alert">
				<h2>You are not logged in!</h2>
			</div>

			<br>
			<span>Already a user?</span>
			<br>
			<a href="/login">Login here</a>
			
			<br>

			<br>
			<span>Don't have an account yet?</span>
			<br>
			<a href="/register">Register an account here</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  //import { useStore } from "vuex";
  import { store } from "../store";
  import { useRouter } from "vue-router";
  import { computed } from "vue";
  import { auth } from '../firebase';
  
  
  export default {
    name: "HomeComponent",
  
    setup() {
  
        const storeThing = store;
        const router = useRouter();
    
        auth.onAuthStateChanged(user => {
        storeThing.dispatch("fetchUser", user);
        });
    
        const user = computed(() => {
			return storeThing.getters.user;
        });
    
        const signOut = async () => {
            await storeThing.dispatch('logOut')
            router.push('/')
        }
    
        return {user,signOut}
   }
  
  
  
  };
  </script>