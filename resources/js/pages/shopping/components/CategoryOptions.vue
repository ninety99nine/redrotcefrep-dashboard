<template>

    <div class="flex flex-wrap gap-2">
        <Pill type="primary" size="xs" :showDot="false">Todays Menu</Pill>
        <Pill type="info" size="xs" :showDot="false">Breakfast</Pill>
        <Pill type="info" size="xs" :showDot="false">Lunch</Pill>
        <Pill type="info" size="xs" :showDot="false">Dinner</Pill>
        <Pill type="info" size="xs" :showDot="false">Breakfast</Pill>
        <Pill type="info" size="xs" :showDot="false">Lunch</Pill>
        <Pill type="info" size="xs" :showDot="false">Dinner</Pill>
        <Pill type="info" size="xs" :showDot="false">Breakfast</Pill>
        <Pill type="info" size="xs" :showDot="false">Lunch</Pill>
        <Pill type="info" size="xs" :showDot="false">Dinner</Pill>
    </div>

</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';

    export default {
        inject: ['storeState'],
        components: { Pill },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };

</script>
