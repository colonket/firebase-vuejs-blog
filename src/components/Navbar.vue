<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">Home</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <div v-if="user.loggedIn">
                <form class="d-flex gap-3">
                    <a class="btn btn-danger" @click.prevent="signOut">Log Out</a>
                    <a class="btn btn-secondary" href="/create">Upload</a>
                </form>
            </div>
            <div v-else>
                <form class="d-flex">
                    <a class="btn btn-primary" href="/register">Sign Up</a>
                    <a class="btn" href="/login">Log In</a>
                </form>
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