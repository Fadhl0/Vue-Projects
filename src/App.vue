<script setup lang="ts"></script>

<template>
  <div class="main">
    <RouterView />
  </div>
</template>

<!-- global -->
<style>
:root {
  --darkMode-bg: #1b1b1b;
  --darkMode-text: white;
  --darkMode-bg-2: #131314;
  --darkMode-text-2: #d5d5d5;
  --darkMode-text-disable: #c4c7c5;
  --darkMode-bg-shadow: #1b1b1b8c;

  --color-active: #a8c7fa;
  --color-active-hover: #92bcff;
  --bg-active: #a8c7fa20;
  --profile-color: #f4511e;
  --bg-active-2: #0842a0;
  --bg-active-hover: #174fa7;


  --box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

.main {
  height: 100vh;
  background-color: var(--darkMode-bg);
  color: var(--darkMode-text);
  font-family: "Roboto", sans-serif;
}


/* Chrome, Safari */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background-color: #333537;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #444746;
}

/* FireFox */
@-moz-document url-prefix() {
  html {
    scrollbar-width: thin;
    scrollbar-color: #444746 #333537;
  }
}
</style>
