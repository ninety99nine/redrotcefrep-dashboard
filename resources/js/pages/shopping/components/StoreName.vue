<template>

    <h2 :class="[size, 'font-bold text-center mb-4']" :style="'color:'+storeForm.textColor+';'">
        {{ storeForm.name }}
    </h2>

</template>

<script>

    export default {
        inject: ['storeState'],
        props: {
            size: {
                type: String,
                default: 'text-xl sm:text-2xl md:text-3xl'
            }
        },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };

</script>
