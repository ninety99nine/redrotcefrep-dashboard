<template>

    <p :style="'color:'+storeForm.cardHeadingTextColor+';'"
        class="font-bold text-sm sm:text-lg text-black mb-4">
        Categories
    </p>

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
