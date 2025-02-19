<template>

    <div class="animated-border-blue bg-white space-y-4 py-4 px-4 shadow-sm rounded-xl flex flex-col items-center">

        <h1 class="flex items-center space-x-2 text-sm text-gray-700 font-bold">
            <span class="text-xl">💪</span>
            <span class="mt-1">Build Your Team</span>
        </h1>

        <p class="text-xs text-center text-gray-600">
            Invite others to help manage your store. Collaborate by adding team members to help you grow your business.
        </p>

        <Button type="primary" size="xs">
            <span>+</span>
            <span>Add Team</span>
        </Button>

    </div>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';

    export default {
        components: {
            Button
        }
    };

</script>
