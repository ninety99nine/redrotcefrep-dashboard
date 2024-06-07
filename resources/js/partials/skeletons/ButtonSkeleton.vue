<template>
    <button type="submit" @click.prevent :class="btnClass">
        <slot></slot>
    </button>
</template>

  <script>

    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';

    export default {
        components: { SpiningLoader },
        props: {
            size: {
                type: String,
                default: 'base',
                options: ['xs', 'sm', 'base', 'lg']
            }
        },
        computed: {
            btnClass() {
                let classes = ['flex justify-center items-center rounded-md text-gray-300 bg-gray-100 cursor-default'];

                if(this.size == 'xs') {
                    classes.push('px-3 py-1.5 text-xs');
                }else if(this.size == 'sm') {
                    classes.push('px-3 py-1.5 text-sm');
                }else if(this.size == 'base') {
                    classes.push('px-3 py-1.5 text-base');
                }else if(this.size == 'lg') {
                    classes.push('px-3 py-2.5 text-base');
                }

                return classes;
            }
        }
    };

  </script>
