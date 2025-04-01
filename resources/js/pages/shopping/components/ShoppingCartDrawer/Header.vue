<template>

    <div class="flex justify-between items-center border-b shadow-sm p-4" :style="'background:'+storeForm.bgColor+';'">

        <div class="flex items-center space-x-2">

            <!-- Shopping Bag Icon -->
            <svg class="w-5 h-5 md:w-6 md:h-6" :style="'color:'+storeForm.textColor+';'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clip-rule="evenodd" />
            </svg>

            <!-- Heading -->
            <h2 class="text-lg md:text-xl font-bold" :style="'color:'+storeForm.textColor+';'">
                Cart
            </h2>

        </div>

        <!-- Close Icon -->
        <svg
            @click="closeShoppingCartDrawer"
            class="w-6 h-6 text-white cursor-pointer hover:opacity-90 active:opacity-80 active:scale-90 transition-all"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>

    </div>

</template>

<script>

    export default {
        inject: ['storeState', 'shoppingCartState'],
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        },
        methods: {
            closeShoppingCartDrawer() {
                return this.shoppingCartState.closeShoppingCartDrawer();
            }
        }
    };

</script>
