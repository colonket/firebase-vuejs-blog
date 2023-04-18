<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="is-8">
          <div class="card">
            <div class="card-header">Register</div>
            <div class="card-body">
              <div v-if="error" class="message is-danger">{{error}}</div>
              <form action="#" @submit.prevent="Register">
                <div class="field is-grouped row">
                  <label for="name" class="is-4 label has-text-right">Name</label>
  
                  <div class="is-6">
                    <input
                      id="name"
                      type="name"
                      class="control"
                      name="name"
                      value
                      required
                      autofocus
                      v-model="name"
                    />
                  </div>
                </div>
  
                <div class="field is-grouped row">
                  <label for="email" class="is-4 label has-text-right">Email</label>
  
                  <div class="is-6">
                    <input
                      id="email"
                      type="email"
                      class="control"
                      name="email"
                      value
                      required
                      autofocus
                      v-model="email"
                    />
                  </div>
                </div>
  
                <div class="field is-grouped row">
                  <label for="password" class="is-4 label has-text-right">Password</label>
  
                  <div class="is-6">
                    <input
                      id="password"
                      type="password"
                      class="control"
                      name="password"
                      required
                      v-model="password"
                    />
                  </div>
                </div>
  
                <div class="field is-grouped row mb-0">
                  <div class="is-8 offset-md-4">
                    <button type="submit" class="btn btn-primary">Register</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
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