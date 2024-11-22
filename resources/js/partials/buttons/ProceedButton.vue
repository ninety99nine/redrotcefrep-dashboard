<template>
    <PrimaryButton :action="action" :disabled="disabled" :loading="loading" :size="size" :type="type">
        <slot></slot>
        <svg :class="iconClass" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>
    </PrimaryButton>
</template>

  <script>

    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';

    export default {
        components: { PrimaryButton },
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
                default: 'light',
                options: ['dark', 'success', 'light', 'primary', 'warning', 'danger']
            }
        },
        computed: {
            iconClass() {
                let classes = ['leading-none -mt-1'];

                if(this.size == 'base' || this.size == 'lg') {
                    classes.push('w-6 h-6 mt-0.5');
                }else if(this.size == 'sm') {
                    classes.push('w-4 h-4 mt-0.5');
                }else{
                    classes.push('w-4 h-4 mt-0.5');
                }

                return classes;
            }
        }
    };

  </script>
