<template>
    <div>
        <h2>board!</h2>
        <ul><li v-for="item in itemresponse.body"><NuxtLink :to="'/item/' + item.id">{{ item }}</NuxtLink></li></ul>
    </div>
</template>

<script setup lang="ts">
const fetchData = async () => {
  const response = await useFetch('/api/getItems')
  return response.data
}

const itemresponse = await fetchData()
</script>