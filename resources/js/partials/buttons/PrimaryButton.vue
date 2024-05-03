<template>
    <button type="submit" @click.prevent="action" :disabled="disabled" :class="[disabled ? 'bg-black/50 cursor-not-allowed' : 'bg-black hover:bg-black/80 cursor-pointer', 'flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700']">

        <!-- Spining Loader -->
        <SpiningLoader v-if="loading" class="my-1"></SpiningLoader>
        <slot v-else></slot>

    </button>
</template>

  <script>

    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';

    export default {
        components: { SpiningLoader },
        props: {
            action: {
                type: Function
            },
            disabled: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            }
        }
    };

  </script>
