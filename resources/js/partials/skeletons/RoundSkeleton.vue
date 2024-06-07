<template>
    <div :class="[size, 'bg-gray-200 rounded-full']"></div>
</template>

<script>
export default {
    props: {
        size: {
            type: String,
            default: 'w-12 h-12'
        }
    }
};
</script>
