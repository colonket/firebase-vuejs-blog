import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Home from './components/Home.vue';
import Upload from './components/Upload.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/upload',
        name: 'Upload',
        component: Upload
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
