<template>

<nav id='topnavbar' class="navbar" role="navigation" aria-label="main navigation" >
    <div class="navbar-brand">
        <a class="navbar-item" href="/">
            <h2>Home</h2>
        </a>
    </div>
    <div class="navbar-end">
        <div class="navbar-item">
            <div class="buttons">
                <div v-if="user.loggedIn">
                    <button  @click.prevent="signOut" class="button is-light">Log Out</button>
                </div>
                <div v-else>
                    <a class="button is-primary" href="/register">
                        <strong>Sign Up</strong>
                    </a>
                    <a class="button is-light" href="/login">
                        Log In
                    </a>
                </div>
            </div>
        </div>
    </div>

</nav>

</template>

<script>
import { store } from "../store";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { auth } from '../firebase';

export default {
    name: "NavbarComponent",

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