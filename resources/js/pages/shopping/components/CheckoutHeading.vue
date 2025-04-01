<template>

    <h2 class="text-2xl md:text-3xl font-bold text-center mb-4" :style="'color:'+storeForm.textColor+';'">
        Checkout
    </h2>

</template>

<script>

    export default {
        inject: ['storeState'],
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };

</script>
