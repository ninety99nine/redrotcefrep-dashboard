<template>
    <span v-if="errorText" class="font-medium mt-1 text-red-500 text-xs">
      {{ errorText }}
    </span>
  </template>

  <script>
  export default {
    props: {
      errorText: {
        type: String
      }
    }
  };
  </script>
