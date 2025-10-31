<script setup>
</script>

<template>
<footer class="footer-base">
<div class="footer-container">
<div class="footer-card">
<p class="card-title">Create Tickets</p>
<p class="card-text">Submit new tickets instantly for validation and auto-tracking. Start resolving faster.</p>
</div>
<div class="footer-card">
<p class="card-title">View & Manage</p>
<p class="card-text">See your entire workload at a glance. Assign, prioritize, and update any ticket.</p>
</div>
<div class="footer-card">
<p class="card-title">Secure</p>
<p class="card-text">Your data is secured with enterprise standards. Thank you for choosing our platform!</p>
</div>
</div>
<div class="footer-rights">
<p>All rights reserved | Privacy Policy | Terms | Support</p>
</div>
</footer>
</template>

<style scoped>
.footer-base {
background-color: black;
min-height: 40vh;

width: 100%;
border-top: 10vh solid white;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
}

.footer-container {
max-width: 80%;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding-top: 2.5rem;
gap: 2rem;
}

@media (min-width: 640px) {
.footer-container {
    width: 1300px;
display: grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
grid-gap: 50px;
align-items: center;
padding: 2vw;
justify-content: center;
}
}

.footer-card {
padding: 1rem;
background-color: #1f2937;
border-radius: 0.5rem;
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
margin: 0.5rem;
width: 100%;
max-width: 24rem;
transition: transform 0.3s ease;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
}

.footer-card:hover {
transform: translateY(-5px);

border: 2px solid blue;
box-shadow: 10px 20px  purple;
}

@media (min-width: 640px) {
.footer-card {
max-width: none;
}
}

.card-title {
font-size: x-large;
font-weight: bold;
color: #2563eb;
margin-bottom: 0.75rem;
font-family: 'Courier New', Courier, monospace;
}

.card-text {
color: #d1d5db;
font-size: large;
font-weight: bold;

font-family: monospace;
text-align: center;
}

.footer-rights {
text-align: center;
font-weight: 700;
color: white;
font-size: 0.875rem;
margin-top: 3rem;
font-style: italic;
}
</style>