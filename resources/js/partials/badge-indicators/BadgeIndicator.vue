<template>

    <!--
        Component Referece: https://flowbite.com/docs/components/indicators/#badge-indicator
     -->
    <span v-if="active" class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
        <StatusDot type="success"></StatusDot>
        {{ text }}
    </span>

    <template v-else>

        <span v-if="inactiveType == 'danger'" class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            <StatusDot type="danger"></StatusDot>
            {{ text }}
        </span>

        <span v-else-if="inactiveType == 'warning'" class="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
            <StatusDot type="warning"></StatusDot>
            {{ text }}
        </span>

        <span v-else class="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-gray-300">
            <StatusDot type="info"></StatusDot>
            {{ text }}
        </span>

    </template>

</template>

<script>
    import StatusDot from '@Partials/status-dots/StatusDot.vue';
    export default {
        props: {
            active: {
                type: Boolean,
                default: true
            },
            text: {
                type: String,
                default: 'Status'
            },
            showDot: {
                type: Boolean,
                default: true
            },
            inactiveType: {
                type: String,
                default: 'danger',
                options: ['info', 'warning', 'danger']
            }
        },

    components: { StatusDot },
    };
</script>
