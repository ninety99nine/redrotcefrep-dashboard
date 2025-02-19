<template>
    <Button type="skeleton" v-bind="$props">
        <slot></slot>
    </Button>
</template>

<script>

    import Button from '@Partials/buttons/Button.vue';

    export default {
        components: { Button }
    };

</script>
