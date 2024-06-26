<script setup lang="ts">
const { status, data, signOut, signIn } = useAuth()
</script>

<template>
    <div>
      <navbar />
      <div style="padding-left: 10px; padding-right: 10px;">
        <slot />
      </div>
    </div>
  </template>
  
  