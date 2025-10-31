<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { registerUser } from '../store.js'; 


const email = ref('');
const password = ref('');
const error = ref('');
const message = ref('');
const isLoading = ref(false);

const router = useRouter();


const handleSignUp = async () => {
  error.value = ''; 
  message.value = '';


  if (!email.value || !password.value) {
    error.value = "Please fill in both email and password fields.";
    return;
  }
  if (password.value.length < 6) {
    error.value = "Password must be at least 6 characters long.";
    return;
  }

  isLoading.value = true;
  
  try {
    message.value = "Account created locally! Redirecting to login...";
    

    registerUser(email.value, password.value); 

  
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    

    setTimeout(() => {
        router.push('/login'); 
    }, 500);

  } catch (err) {
    console.error("Sign Up Error:", err);
    error.value = `Sign up failed. Please try again.`;
    message.value = ''; 

  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
 
<div class="signup-container">
<div class="signup-card">
<h1 class="card-title">Create Your Account</h1>

  <div v-if="error" class="error-message">
    {{ error }}
  </div>
  <div v-if="message" class="success-message">
    {{ message }}
  </div>
  
  <form @submit.prevent="handleSignUp" class="form-spacing">
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
      <span v-if="isLoading">Signing Up...</span>
      <span v-else>Sign Up</span>
    </button>
  </form>
</div>


</div>

</template>

<style scoped>
.signup-container {
min-height: 100vh;
display: flex;
align-items: center;
justify-content: center;
background-color: #111827;
color: white;
}

.signup-card {
background-color: #1f2937;
padding: 2rem;
border-radius: 0.5rem;
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
width: 100%;
max-width: 28rem;
}

.card-title {
font-size: 1.875rem;
font-weight: 700;
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
font-size: 0.875rem;
font-weight: 700;
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
border-color: aquamarine;
box-shadow: 0 0 0 3px aquamarine;
}

.password-focus:focus {
border-color: blue;
box-shadow: 0 0 0 3px blue;
}

.submit-button {
width: 100%;
padding: 0.75rem;
background-color: #2563eb;
border-radius: 0.5rem;
font-weight: 700;
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
</style>
