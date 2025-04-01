<template>

    <Button
        size="sm"
        type="outline"
        icon="share-arrow"
        :action="vistStore">
        <span class="text-xs">Shop</span>
    </Button>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';

    export default {
        inject: ['storeState'],
        components: { Button },
        computed: {
            store() {
                return this.storeState.store;
            }
        },
        methods: {
            vistStore() {
                const link = this.store._attributes.webLink;
                window.location.href = link;
            }
        }
    };

</script>
