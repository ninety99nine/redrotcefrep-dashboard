<template>

    <!--
        Component Referece: https://flowbite.com/docs/components/indicators/#badge-indicator
     -->
    <span v-if="active" class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
        <span v-if="showDot" class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
        {{ text }}
    </span>

    <template v-else>

        <span v-if="inactiveType == 'danger'" class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            <span v-if="showDot" class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
            {{ text }}
        </span>

        <span v-else-if="inactiveType == 'warning'" class="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
            <span v-if="showDot" class="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
            {{ text }}
        </span>

        <span v-else class="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-gray-300">
            <span v-if="showDot" class="w-2 h-2 me-1 bg-gray-500 rounded-full"></span>
            {{ text }}
        </span>

    </template>

</template>

<script>
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
    }
};
</script>
