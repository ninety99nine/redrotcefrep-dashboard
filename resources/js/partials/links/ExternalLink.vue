<template>

    <span class="text-sm text-gray-500">

      <!-- Render prefix slot if provided -->
      <slot name="prefix"></slot>

      <a :href="url" target="_blank" class="font-semibold text-blue-700 hover:text-blue-500">
        <slot></slot>
      </a>

    </span>

</template>

  <script>
  export default {
    props: {
        url: {
            type: String
        },
        prefix: {
            type: String
        }
    }
  };
  </script>
