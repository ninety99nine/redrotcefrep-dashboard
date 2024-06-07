<template>
    <div :class="[width, height, 'bg-gray-200 rounded-full dark:bg-gray-700']"></div>
</template>

<script>
export default {
    props: {
        width: {
            type: String,
            default: 'w-full'
        },
        height: {
            type: String,
            default: 'h-2'
        }
    }
};
</script>
