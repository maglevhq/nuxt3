<script setup type="ts">
useHead({
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  charset: 'utf-8',
  script: [
    {
      src: 'http://localhost:3000/maglev/live-preview-client.js',
      body: true
    },
    {
      src: 'https://cdn.tailwindcss.com',
      body: true
    }
  ],
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css'
    }
  ]
})
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
