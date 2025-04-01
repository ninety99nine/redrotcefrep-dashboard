<template>

    <p class="text-sm text-center" :style="'color:'+storeForm.textColor+';'">
        {{ storeForm.description }}
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
