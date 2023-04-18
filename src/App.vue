<template>
  <div>
    <topnavbar />
    <main class="py-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped src="@/assets/styles.css">
</style>

<script>
import topnavbar from './components/Navbar.vue'
import 'buefy/dist/buefy.css'
export default {
  components:{
    topnavbar
  }
};
</script>