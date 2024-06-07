<template>
    <div :class="['absolute top-0 left-0 right-0 bottom-0 z-10', type == 'white' ? 'bg-white/50' : 'bg-black/50']">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <SpiningLoader></SpiningLoader>
        </div>
    </div>
</template>

  <script>

    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';

    export default {
        components: { SpiningLoader },
        props: {
            type: {
                type: String,
                default: 'white',
                options: ['white', 'black']
            }
        },
        computed: {
            iconClass() {
                let classes = ['leading-none'];

                if(this.size == 'xs') {
                    classes.push('text-sm');
                }else if(this.size == 'sm') {
                    classes.push('text-sm');
                }else if(this.size == 'base') {
                    classes.push('text-xl');
                }else if(this.size == 'lg') {
                    classes.push('text-xl');
                }

                return classes;
            }
        }
    };

  </script>
