<template>
    <div>
      <h1>File Upload</h1>
      <form @submit.prevent="uploadFile">
        <input type="file" @change="handleFileChange" />
        <button type="submit">Upload</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedFile: null
      }
    },
    methods: {
      handleFileChange(event) {
        this.selectedFile = event.target.files[0]
      },
      async uploadFile() {
        if (!this.selectedFile) return
  
        const formData = new FormData()
        formData.append('file', this.selectedFile)
  
        try {
          $fetch('/api/postItemRequest', {
            method: 'POST',
            body: formData
          })
          alert('File uploaded successfully!')
        } catch (error) {
          console.error('Error uploading file:', error)
          alert('Failed to upload file.')
        }
      }
    }
  }
  </script>
  
  <style scoped>
  form {
    margin-top: 20px;
  }
  </style>
  