<template>

    <Logo height="h-24" class="mx-auto mb-8"></Logo>

</template>

<script>

    import Logo from '@Partials/logos/Logo.vue';

    export default {
        inject: ['storeState'],
        components: {
            Logo
        },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };

</script>
