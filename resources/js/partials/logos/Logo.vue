<template>
    <img :class="height" src="/images/logo-black-transparent.png" alt="Perfect Order">
</template>

<script>
export default {
    props: {
        height: {
            type: String,
            default: 'h-20'
        }
    }
};
</script>
