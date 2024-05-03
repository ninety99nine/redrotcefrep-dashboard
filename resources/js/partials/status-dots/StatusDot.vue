<template>

    <span v-if="type == 'success'" :class="[{'animate-pulse': animate}, 'w-2 h-2 me-1 bg-green-500 rounded-full']"></span>
    <span v-else-if="type == 'info'" :class="[{'animate-pulse': animate}, 'w-2 h-2 me-1 bg-gray-500 rounded-full']"></span>
    <span v-else-if="type == 'danger'" :class="[{'animate-pulse': animate}, 'w-2 h-2 me-1 bg-red-500 rounded-full']"></span>
    <span v-else-if="type == 'warning'" :class="[{'animate-pulse': animate}, 'w-2 h-2 me-1 bg-yellow-500 rounded-full']"></span>

</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'danger',
            options: ['success', 'warning', 'danger', 'info']
        },
        animate: {
            type: Boolean,
            default: false
        }
    }
};
</script>
