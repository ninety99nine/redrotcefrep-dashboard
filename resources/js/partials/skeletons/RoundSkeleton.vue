<template>
    <div :class="[size, color, 'rounded-full']"></div>
</template>

<script>
export default {
    props: {
        size: {
            type: String,
            default: 'w-12 h-12'
        },
        color: {
            type: String,
            default: 'bg-gray-200'
        },
    }
};
</script>
