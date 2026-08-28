<template>
  <div class="error">

    <img loading="lazy"
      src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXV4MDlidjhxamZrdDZpY3ZuODJ2ZWwwOThxczE0OWV5NGwwNTlwYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/U3pIDK3jNyKAvyCsmc/giphy.gif"
      alt="funny gif">
    <h3>Not Found</h3>
  </div>
</template>

<style scoped>
@reference '@/style.css';

.error {
  @apply flex flex-col items-center h-screen justify-center
}

h3 {
  @apply text-8xl text-center max-sm:text-6xl
}
</style>
