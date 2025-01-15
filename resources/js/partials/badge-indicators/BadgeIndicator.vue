<template>

    <span :class="badgeClasses" @click.stop.prevent="action">
        <StatusDot v-if="showDot" :type="dotType"></StatusDot>
        <slot></slot>
        {{ text }}
    </span>

</template>

<script>
    /**
     * Component Reference: https://flowbite.com/docs/components/indicators/#badge-indicator
     */
    import StatusDot from '@Partials/status-dots/StatusDot.vue';
    export default {
        props: {
            text: {
                type: [String, Number],
                default: ''
            },
            showDot: {
                type: Boolean,
                default: true
            },
            type: {
                type: String,
                default: 'danger',
                validator: value => ['info', 'warning', 'primary', 'danger', 'success'].includes(value)
            },
            size: {
                type: String,
                default: 'px-2.5 py-0.5'
            },
            clickable: {
                type: Boolean,
                default: false
            },
            action: {
                type: Function,
                default: null
            },
        },
        computed: {
            badgeClasses() {
                // Map types to their respective classes
                const typeClassMap = {
                    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
                    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
                    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                    info: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                };

                // Class for clickable badges
                const clickableClass = 'cursor-pointer shadow border hover:bg-opacity-90 hover:scale-95 hover:shadow-sm active:scale-90 transition-all';

                // Map border colors to types when clickable
                const borderClassMap = {
                    success: 'hover:border-green-400 active:bg-green-200 border-green-500',
                    danger: 'hover:border-red-400 active:bg-red-200 border-red-500',
                    warning: 'hover:border-yellow-400 active:bg-yellow-200 border-yellow-500',
                    primary: 'hover:border-blue-400 active:bg-blue-200 border-blue-500',
                    info: 'hover:border-gray-400 active:bg-gray-200 border-gray-500'
                };

                // Base classes for all badges
                const baseClasses = `inline-flex items-center text-xs font-medium ${this.size} rounded-full whitespace-nowrap`;

                // Apply type-specific classes
                let classes = `${baseClasses} ${typeClassMap[this.type]}`;

                // If the badge is clickable, add the clickable classes and type-specific border classes
                if(this.clickable) {
                    classes += ` ${clickableClass} ${borderClassMap[this.type]}`;
                }

                return classes;
            },
            dotType() {
                return this.type;
            }
        },
        components: { StatusDot }
    };
</script>
