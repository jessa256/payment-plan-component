<template>
  <div class="test-component">
    <h3>Test Component Works!</h3>
    <p>If you can see this, the component is loading correctly.</p>
    <button @click="showAlert">Click Me</button>
  </div>
</template>

<script>
export default {
  name: 'TestComponent',
  props: {
    content: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    showAlert: function() {
      alert('Component is working!')
    }
  }
}
</script>

<style scoped>
.test-component {
  padding: 20px;
  border: 2px solid #007bff;
  border-radius: 8px;
  background: #f8f9fa;
  text-align: center;
}

button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>