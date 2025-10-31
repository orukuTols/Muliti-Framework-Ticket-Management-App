import { createRouter, createWebHistory } from 'vue-router';

import LandingPage from '../Views/LandingPage.vue';
import Login from '../Views/Login.vue';
import SignUp from '../Views/SignUp.vue';
import TicketManager from '../Views/TicketManager.vue';


const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage 
  },
  
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  
  {
    path: '/signup',
    name: 'Signup',
    component: SignUp
  },
  
  {
    path: '/tickets',
    name: 'TicketManager',
    component: TicketManager,
  },
  
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: LandingPage
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
