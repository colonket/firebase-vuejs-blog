<template>
  <div>
    <topnavbar />
    <main class="py-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
  @import 'buefy/dist/buefy.css';
  @import '@/assets/styles.css';
</style>

<script>
import topnavbar from './components/Navbar.vue'
export default {
  components:{
    topnavbar
  }
};
</script>

