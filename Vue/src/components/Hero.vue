<script setup>
import { useRouter } from 'vue-router';

const router = useRouter(); 

const navigateTo = (path) => {
  router.push(path);
};

</script>

<template>
  <section class="hero-section">
    <h1 class="hero-title">Your Ticket. Your World.</h1>
    <p class="hero-subtitle">
      Manage, book, and track your tickets easily — all in one place.
    </p>
    <a 
      href="/signUp"
      @click.prevent="navigateTo('/signUp')"
      class="hero-button"
    >
      Get Started
    </a>
  </section>
</template>

<style scoped>
.hero-section {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #374151; 
  padding: 2rem; 
  margin:0;
}

.hero-title {
  font-style: italic;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: bold; 
  margin-bottom: 1rem; 
  font-size: xx-large;
  color: white;
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 3rem; 
  }
}

.hero-subtitle {
   font-size: x-large;
  font-weight: bold;
  font-family: monospace;
  margin-bottom: 2rem; 
  max-width: 28rem; 
  margin-left: auto;
  margin-right: auto;
  font-weight: bold;
  color: #FCD34D; 
  font-style: italic;
}

.hero-button {
  padding: 1rem 1.5rem; 
  background-color: #2563EB; 
  border-radius: 0.5rem; 
    font-size: large;
    font-weight: bold;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-style: italic;
  text-decoration: none; 
  color: white; 
  transition: background-color 0.2s;
}

.hero-button:hover {
  background-color: #1D4ED8; 
}

@media (min-width: 640px) {
  .hero-button {
    font-size: x-large;
  }
}
</style>
