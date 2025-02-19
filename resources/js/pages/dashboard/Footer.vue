<template>

    <footer class="flex justify-center items-center p-8 m-4 border-t">
        <Logo height="w-8" class="mr-2" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 - {{ currentYear }} Optimum Quality. All Rights Reserved</span>
    </footer>

</template>

<script>

    import Logo from '@Partials/logos/Logo.vue';

    export default {
        components: { Logo },
        data() {
            return {
                currentYear: new Date().getFullYear()   // 2025
            };
        }
    };

</script>
