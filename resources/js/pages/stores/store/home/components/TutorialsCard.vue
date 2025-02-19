<template>

    <div class="animated-border-blue bg-white space-y-4 py-4 px-4 shadow-sm rounded-xl flex flex-col items-center">

        <div class="w-full flex items-center justify-between">

            <h1 class="flex items-center space-x-2 text-sm text-gray-700 font-bold">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                <span>Tutorials</span>
            </h1>

            <Button type="primary" size="xs">
                <span>Explore</span>
            </Button>

        </div>

        <p class="text-xs text-gray-600">
            Learn step by step with easy-to-follow tutorials to guide you through the essentials 🎯
        </p>

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
