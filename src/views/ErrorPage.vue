<template>
  <div class="error">
    <p class="code">4<span class="zero">0</span>4</p>
    <h1 class="title">Page Not Found!</h1>
    <router-link :to="{ name: 'Main' }">Go Back</router-link>
  </div>
</template>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  user-select: none;
}

.code {
  font-size: 10rem;
  font-weight: bolder;
  font-family: monospace;
  color: var(--darkMode-text-disable);

  span {
    color: var(--color-active-hover);
  }
}

a {
  text-decoration: none;
  color: var(--color-active);
  background: var(--bg-active-2);
  display: block;
  width: fit-content;
  transition: 0.2s;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 1.5rem;
  cursor: pointer;
  margin-top: 3rem;

  &:hover {
    background: var(--bg-active-hover);
  }
}
</style>
