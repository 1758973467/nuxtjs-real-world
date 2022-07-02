<template>
  <ul class="error-messages">
    <div v-for="fieldErrorKey in Object.keys(errors)" :key="fieldErrorKey">
      <template v-if="Array.isArray(errors[fieldErrorKey])">
        <li v-for="errorMessage in errors[fieldErrorKey]" :key="errorMessage">
          {{ fieldErrorKey + " " + errorMessage }}
        </li>
      </template>
      <template v-else>
        {{ fieldErrorKey + " " + errors[fieldErrorKey] }}
      </template>
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