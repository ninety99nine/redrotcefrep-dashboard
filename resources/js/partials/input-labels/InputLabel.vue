<template>
    <label :for="_for" class="block text-sm font-medium leading-6 text-gray-900">
        <slot></slot>
    </label>
</template>

<script>
export default {
  props: {
    _for: {
      type: String,
      required: true,
      validator: validateId   // Custom validator function to validate id format
    }
  }
};

function validateId(id) {
    // Simple validation to check if the id starts with a letter or underscore
    return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(id);
}
</script>
