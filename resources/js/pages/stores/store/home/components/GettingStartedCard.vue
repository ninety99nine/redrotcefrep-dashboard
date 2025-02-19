<template>

    <div class="animated-border-blue bg-white space-y-4 py-4 px-4 shadow-sm rounded-xl flex flex-col items-center">

        <div class="w-full flex items-center justify-between">

            <h1 class="flex items-center space-x-2 text-sm text-gray-700 font-bold">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                </svg>
                <span>Getting Started</span>
            </h1>

            <Button type="primary" size="xs">
                <span>Let’s Go</span>
            </Button>

        </div>

        <p class="text-xs text-gray-600">
            Get the basics out of the way by following these simple steps 👌
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
