import { reactive } from 'vue';


export const authStore = reactive({
 
  registeredUser: {
    email: 'test@example.com',
    password: 'password'
  },

  currentUser: null
});


export function registerUser(email, password) {
  authStore.registeredUser.email = email;
  authStore.registeredUser.password = password;
}

export function loginUser(email) {
  authStore.currentUser = { email: email };
}


export function logoutUser() {
  authStore.currentUser = null;
}
