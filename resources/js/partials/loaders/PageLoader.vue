<template>
    <transition name="fade-loader">
        <div v-if="isVisible" class="absolute top-0 bottom-0 left-0 right-0 inset-0 bg-white bg-opacity-90 z-50">
            <div class="absolute w-full flex justify-center items-center h-screen">
                <SpinningLoader size="custom" customSize="w-8 h-8 border-4"></SpinningLoader>
            </div>
        </div>
    </transition>
</template>

<script>

    import Logo from '@Partials/logos/Logo.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';

    export default {
        inject: ['loaderState'],
        components: { Logo, SpinningLoader },
        computed: {
            isVisible() {
                return this.loaderState.isVisible;
            }
        }
    };

</script>
