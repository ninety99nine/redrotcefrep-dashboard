<template>

    <Checkbox
        size="xs"
        v-model="form.sameDayDelivery"
        :errorText="formState.getFormError('sameDayDelivery')">
        <div class="mt-0.5 mx-2">
            <p class="font-bold text-sm mb-1">Same day delivery</p>
            <p class="text-sm text-gray-500 max-w-96">Customers must place orders for delivery on the same day</p>
        </div>
    </Checkbox>

</template>

<script>

    import Checkbox from '@Partials/checkboxes/Checkbox.vue';

    export default {
        inject: ['formState'],
        components: { Checkbox },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
