<template>
    <button type="submit" @click.prevent="action" :disabled="disabled" :class="btnClass">

        <!-- Spining Loader -->
        <SpiningLoader v-if="loading" type="light"></SpiningLoader>
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
            },
            size: {
                type: String,
                default: 'base',
                options: ['xs', 'sm', 'base', 'lg']
            },
            type: {
                type: String,
                default: 'dark',
                options: ['dark', 'success', 'light', 'primary', 'warning', 'danger']
            }
        },
        computed: {
            btnClass() {
                let classes = ['flex justify-center items-center rounded-md shadow-sm font-semibold'];
                classes.push(this.disabled ? 'cursor-not-allowed' : 'cursor-pointer');

                if(this.size == 'xs') {
                    classes.push('px-3 py-1.5 text-xs');
                }else if(this.size == 'sm') {
                    classes.push('px-3 py-1.5 text-sm');
                }else if(this.size == 'base') {
                    classes.push('px-3 py-1.5 text-base');
                }else if(this.size == 'lg') {
                    classes.push('px-3 py-2.5 text-base');
                }

                if(this.type == 'dark') {
                    classes.push('text-white', this.disabled ? 'bg-black/50' : 'bg-black hover:bg-black/80 active:bg-black/60');
                }else if(this.type == 'success') {
                    classes.push(['text-white', this.disabled ? 'bg-green-500/50' : 'bg-green-500 hover:bg-green-500/80 active:bg-green-500/60']);
                }else if(this.type == 'light') {
                    classes.push(['text-black border border-gray-300', this.disabled ? 'bg-gray-50' : 'bg-gray-100 hover:bg-gray-50 active:bg-white']);
                }else if(this.type == 'primary') {
                    classes.push(['text-white', this.disabled ? 'bg-blue-600/50' : 'bg-blue-600 hover:bg-blue-600/80 active:bg-blue-600/60']);
                }else if(this.type == 'danger') {
                    classes.push(['text-white', this.disabled ? 'bg-red-600/50' : 'bg-red-600 hover:bg-red-600/80 active:bg-red-600/60']);
                }else if(this.type == 'warning') {
                    classes.push(['text-white', this.disabled ? 'bg-yellow-400/50' : 'bg-yellow-400 hover:bg-yellow-400/80 active:bg-yellow-400/60']);
                }

                return classes;
            }
        }
    };

  </script>
