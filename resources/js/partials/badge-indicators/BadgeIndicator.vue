<template>
    <!-- Component Reference: https://flowbite.com/docs/components/indicators/#badge-indicator -->
    <span :class="badgeClasses">
        <StatusDot v-if="showDot" :type="dotType"></StatusDot>
        {{ text }}
    </span>
</template>

<script>
    import StatusDot from '@Partials/status-dots/StatusDot.vue';
    export default {
        props: {
            text: {
                type: [String, Number],
                default: 'Status'
            },
            showDot: {
                type: Boolean,
                default: true
            },
            type: {
                type: String,
                default: 'danger',
                validator: value => ['info', 'warning', 'primary', 'danger', 'success'].includes(value)
            }
        },
        computed: {
            badgeClasses() {
                const typeClassMap = {
                    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
                    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
                    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                    info: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                };

                return `inline-flex items-center ${typeClassMap[this.type]} text-xs font-medium px-2.5 py-0.5 rounded-full`;
            },
            dotType() {
                return this.type;
            }
        },
        components: { StatusDot }
    };
</script>
