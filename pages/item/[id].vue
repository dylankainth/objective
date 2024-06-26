<template>
    <div>
        <h1>Item</h1>
        <p>Item ID: {{ $route.params.id }}</p>
    </div>
</template>

<script setup lang="ts">
const fetchData = async () => {
  const route = useRoute();
  var routeId = route.params.id;

  const response = await useFetch('/api/getItem', {
  query: { id: routeId}
})
  return response.data
}

const itemresponse = await fetchData()
</script>