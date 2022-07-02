<template>
  <ul class="error-messages">
    <div v-for="fieldErrorKey in Object.keys(errors)" :key="fieldErrorKey">
      <li v-for="errorMessage in errors[fieldErrorKey]" :key="errorMessage">
        {{ fieldErrorKey + " " + errorMessage }}
      </li>
    </div>
  </ul>
</template>

<script>
export default {
  name: "ListError",
  props: {
    errors: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>