<template>
    <button type="submit" @click.prevent="action" class="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">

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
            loading: {
                type: Boolean,
                default: false
            }
        }
    };

  </script>
