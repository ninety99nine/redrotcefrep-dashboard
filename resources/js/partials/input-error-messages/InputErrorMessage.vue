<template>

    <span v-if="errorText" :class="['font-medium text-red-500 text-xs', margin]">
      {{ errorText }}
    </span>

</template>

<script>
  export default {
    props: {
        errorText: {
            type: String
        },
        margin: {
            type: String,
            default: 'mt-1',
        }
    }
  };
</script>
