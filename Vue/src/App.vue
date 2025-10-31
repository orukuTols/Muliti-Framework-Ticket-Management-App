<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Footer from './components/Footer.vue';

const currentUser = ref(null);
const userEmailPrefix = ref('user'); 

const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};

const handleLogout = () => {
  currentUser.value = null;
  userEmailPrefix.value = 'user';
  router.push('/');
};

</script>

<template>
  <div id="app-wrapper">
    <nav class="navbar">
      
      <div class="title-container">
        <router-link to="/" class="title-link">
          Tolu's Tickets
        </router-link>
      </div>

      <div class="link-container">
        
        <template v-if="currentUser">
          
          <span class="welcome-text">
            Welcome, {{ userEmailPrefix }}
          </span>
          
          <button 
            @click="handleLogout" 
            class="logout-button"
          >
            Logout
          </button>
        </template>
        
        <template v-else>
          
          <router-link 
            to="/login"
            class="auth-link login-link"
          >
            Login
          </router-link>
          
          <router-link 
            to="/signUp"
            class="auth-link signup-link" 
          >
            Sign-Up
          </router-link>
        </template>

      </div>
      
    </nav>

    <main class="container mx-auto">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
      <Footer/>
    </main>
  </div>
</template>

<style>
html, body, #app {
  margin: 0 !important;
  padding: 0 !important;
  background-color: rgb(10, 10, 78);
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>


<style scoped>
.navbar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  background-color: black;
  
 
}

@media (min-width: 640px) {
  .navbar {
    padding: 10px; 
  }
}

.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: color 0.2s;
  grid-column: span 3 / span 3; 


}

@media (min-width: 800px) {
  .title-container {
    grid-column: span 2 / span 2; 
    justify-content: flex-start; 
  }
}

.title-link {
  font-size: 1.875rem; 
  font-weight: bold;
 font-family: 'Courier New', Courier, monospace;
  text-decoration: none; 
  color: #F59E0B;
 
  transition: color 0.2s;
  padding-top: 10px;
}

.title-link:hover {
  color: #FCD34D;
}

.link-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 20px;
  grid-column: span 3 / span 3; 
  color: white;
}

@media (min-width: 640px) {

    .title-link {
        font-size: xx-large;
    }


}

@media (min-width: 800px) {

    .title-container {
margin-left:100px;

    }

  .link-container {
    grid-column: span 1 / span 1; 
    justify-content: flex-end; 

  }
}

.welcome-text {
    font-size: 0.875rem; 
    color: #9CA3AF;
    display: none;
}

@media (min-width: 640px) {
    .welcome-text {
        display: inline;
    }
}

.logout-button { 
    background-color: #DC2626;
    padding: 0.25rem 0.75rem;
    border-radius: 0.25rem;
    transition: all 0.2s ease-in-out; 
    color: white; 
    border: none;
    cursor: pointer;
}

.logout-button:hover {
    background-color: #B91C1C;
}

.auth-link {
  font-size: x-large; 
  font-weight: bold;
  font-style:italic; 
  padding: 0.5rem 1rem; 
  border-radius: 0.375rem; 
  border: 1px solid transparent;
  transition: all 0.3s; 
  text-decoration: none;
  cursor: pointer;
}

.login-link {
  background-color: white;
  color: #1D4ED8;
}

.login-link:hover {
  background-color: transparent; 
  border-color: #1E40AF;
}

.signup-link {
  background-color: white;
  color: #1D4ED8;
}

.signup-link:hover {
  background-color: transparent; 
  color: #EF4444;
  border-color: #991B1B;
}

</style>
