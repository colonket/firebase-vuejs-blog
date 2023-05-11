<template>
  <div>
    <navbar />
    <main class="py-4">
      <router-view />
    </main>
  </div>
</template>

<script>
import navbar from './components/Navbar.vue'
export default {
  components:{
    navbar
  }
};
</script>

