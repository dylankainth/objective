<template>


    <div>
        <h1>Request</h1>
        <h3>Request a 3D model</h3>
        

        <input type="file" @change="uploadFile" />
        <button @click="uploadFile">Upload</button>

    </div>


</template>

<script>
export default {
    methods: {
        uploadFile() {
            
        }
    }
}
</script>