<template>
  <main dir="rtl">
    <p>السلام عليكم ورحمة الله وبركاته,</p>
    <p>أنا أخوكم العبد الفقير ... اسير على الطريق المنير!</p>
    <p>أبني مشروعي الكبير ... وأخوض في الكود العسير.</p>
    <p>اسمي فضل مبرمج ومطور Vue.js وبايثون , احب تطوير الواجهة الأمامية وتعلم الآلة.</p>
    <p>هذا المشروع حسبةً لله , لمعرفة أوقات الصلاة بشكل تقريبي لا إجزامي.</p>
    <p class="account-text">حساباتي: </p>
    <div class="account">
      <div class="linkedin">
        <LinkImg name="Fadhl Al-Fadhili" link="https://www.linkedin.com/in/fadhl-alfadhili/">
          <LinkedinIcon />
        </LinkImg>
      </div>
      <div class="github">
        <LinkImg name="Fadhl0" link="https://github.com/Fadhl0">
          <GithubIcon />
        </LinkImg>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import GithubIcon from './__Icons__/GithubIcon.vue';
import LinkedinIcon from './__Icons__/LinkedinIcon.vue';
import LinkImg from './LinkImg.vue';
</script>

<style scoped>
@reference "../assets/main.css";

main {
  @apply flex justify-end flex-col gap-1.5 text-right text-gray-100 p-1;
}

p {
  @apply w-fit
}

.account-text {
  @apply mt-6
}

.account {
  @apply flex gap-4
}

.linkedin, .github {
  @apply text-gold-400 hover:underline hover:text-gold-400/70
}
</style>
