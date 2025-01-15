<template>

    <Checkbox
        size="xs"
        v-model="form.sameDayDelivery"
        :errorText="getFormError('sameDayDelivery')">
        <div class="mt-0.5 mx-2">
            <p class="font-bold text-sm mb-1">Same day delivery</p>
            <p class="text-sm text-gray-500 max-w-96">Customers must place orders for delivery on the same day</p>
        </div>
    </Checkbox>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';

    export default {
        mixins: [FormMixin],
        components: { Checkbox },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
