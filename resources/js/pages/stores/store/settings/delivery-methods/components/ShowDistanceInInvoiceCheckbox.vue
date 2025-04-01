<template>

    <Checkbox
        size="xs"
        v-model="form.showDistanceOnInvoice"
        :errorText="formState.getFormError('showDistanceOnInvoice')">
        <div class="space-y-1 mt-0.5">
            <p class="font-bold text-sm mx-2">Show distance on invoice</p>
            <p class="text-sm text-gray-500 mx-2">The calculated delivery distance will appear on the invoice</p>
        </div>
    </Checkbox>

</template>

<script>

    import Alert from '@Partials/alerts/Alert.vue';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import Pill from '@Partials/pills/Pill.vue';

    export default {
        inject: ['formState'],
        components: { Alert, Checkbox, Pill },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
