<script setup lang="ts">
const { status, data, signOut, signIn } = useAuth()
</script>

<template>
    <div>
      <h1>objective 3d services</h1>
      <h3>name might be changed</h3>
      <div style="padding-left: 10px; padding-right: 10px;">
        <slot />
      </div>
    </div>
  </template>
  
  