<template>

    <div @click="() => navigateToStorefront()" class="flex justify-center items-center space-x-2 bg-white/75 border border-white px-4 py-2 rounded-full cursor-pointer hover:opacity-90 hover:px-6 active:opacity-80 active:scale-90 transition-all duration-300">

        <!-- Return Icon -->
        <svg class="text-black w-4 h-4 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
        </svg>

        <!-- Shop -->
        <span class="font-bold text-xs whitespace-nowrap">Shop</span>

    </div>

</template>

<script>

export default {
    methods: {
        navigateToStorefront() {
            this.$router.push({ name: 'storefront' });
        }
    }
};
</script>
