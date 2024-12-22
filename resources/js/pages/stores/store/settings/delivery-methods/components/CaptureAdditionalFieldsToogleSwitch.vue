<template>

    <Checkbox
        size="xs"
        v-model="form.captureAdditionalFields"
        :errorText="getFormError('captureAdditionalFields')">
        <div class="space-y-1 mt-0.5">
            <p class="font-bold text-sm mx-2">Capture additional fields</p>
            <p class="text-sm text-gray-500 mx-2">Collect extra information from customers before placing an order, such as short answers, selected dates and times, file uploads or map locations</p>
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
