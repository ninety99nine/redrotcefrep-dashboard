<template>
    <button type="submit" @click.prevent="action" :disabled="disabled" :class="[disabled ? 'bg-black/50 cursor-not-allowed' : 'bg-black hover:bg-black/80 cursor-pointer', 'flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700']">
        <span class="text-xl block -mt-1.5">&#10229;</span>
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
            }
        }
    };

  </script>
