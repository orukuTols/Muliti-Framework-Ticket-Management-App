<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authStore, loginUser } from '../store.js';

const email = ref('');
const password = ref('');
const error = ref('');
const message = ref('');
const isLoading = ref(false);

const router = useRouter();

const handleLogIn = async () => {
  error.value = '';
  message.value = '';

  if (!email.value || !password.value) {
    error.value = "Please fill in both email and password fields.";
    return;
  }

  isLoading.value = true;
  await new Promise(resolve => setTimeout(resolve, 1500));

  const registeredEmail = authStore.registeredUser.email;
  const registeredPassword = authStore.registeredUser.password;
  
  if (email.value === registeredEmail && password.value === registeredPassword) {
    loginUser(email.value);
    message.value = "Login successful! Redirecting to dashboard...";
    console.log(`Simulated Login successful for: ${email.value}`);
    
    setTimeout(() => {
        router.push('/tickets'); 
    }, 500);

  } else {
    error.value = "Invalid email or password. Please check your credentials.";
  }
  
  isLoading.value = false;
};
</script>

<template>

<div class="login-container">
<div class="login-card">
<h1 class="card-title">Log-in to Your Account</h1>

  <div v-if="error" class="error-message">
    {{ error }}
  </div>
  <div v-if="message" class="success-message">
    {{ message }}
  </div>
  
  <form @submit.prevent="handleLogIn" class="form-spacing">
    <div>
      <label for="email" class="label-style">Email:</label>
      <input
        id="email"
        type="email"
        v-model="email"
        required
        class="input-style"
        :disabled="isLoading"
      />
    </div>
    
    <div>
      <label for="password" class="label-style">Password:</label>
      <input
        id="password"
        type="password"
        v-model="password"
        required
        class="input-style password-focus"
        :disabled="isLoading"
      />
    </div>
    
    <button
      type="submit"
      class="submit-button" 
      :disabled="isLoading"
    >
      <span v-if="isLoading">Logging In...</span>
      <span v-else>Log In</span>
    </button>

    <p class="text-center mt-2 text-sm text-gray-400">
        Don't have an account? 
        <router-link to="/signUp" class="link-text">Sign up here</router-link>
      </p>
  </form>
</div>


</div>

</template>

<style scoped>
.login-container {
min-height: 100vh;
display: flex;
align-items: center;
justify-content: center;
background-color: #111827;
color: white;
}

.login-card {
background-color: #1f2937;
padding: 2rem;
border-radius: 0.5rem;
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
width: 100%;
max-width: 27rem;
font-weight: bold;
font-style: italic;
}

.card-title {
font-size: xx-large;
font-weight: bold;
font-style: italic;
font-family: 'Courier New', Courier, monospace;
margin-bottom: 1.5rem;
color: #fbbf24;
text-align: center;
}

.error-message {
color: #ef4444;
margin-bottom: 1rem;
text-align: center;
border: 1px solid #ef4444; 
padding: 0.5rem;
border-radius: 0.25rem;
font-weight: 700;
font-style: italic;
}

.success-message {
color: #10b981;
margin-bottom: 1rem;
text-align: center;
border: 1px solid #10b981;
padding: 0.5rem;
border-radius: 0.25rem;
font-weight: 700;
font-style: italic;
}

.form-spacing {
display: flex;
flex-direction: column;
gap: 1rem;
}

.label-style {
display: block;
color: #f59e0b;
font-size: large;
font-weight: bold;
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
font-style: italic;
margin-bottom: 0.25rem;
}

.input-style {
width: 100%;
padding: 0.75rem;
border-radius: 0.25rem;
background-color: #374151;
border: 1px solid #4b5563;
color: white;
outline: none;
}

.input-style:focus {
border-color: #60a5fa;
box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.5);
}

.password-focus:focus {
border-color: #fbbf24;
box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.5);
}

.submit-button {
width: 100%;
padding: 0.75rem;
background-color: #2563eb;
border-radius: 0.5rem;
font-weight: bold;
font-family: 'Courier New', Courier, monospace;
font-size: x-large;
transition: background-color 0.3s;
color: white;
border: none;
cursor: pointer;

}

.submit-button:hover {
background-color: #1d4ed8;
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}


.link-text {
  color: #f59e0b;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s;
}

.link-text:hover {
  color: #fbbf24;
  text-decoration: underline;
}
</style>
