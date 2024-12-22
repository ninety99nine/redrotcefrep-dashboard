<template>

    <Checkbox
        size="xs"
        v-model="form.requireLocationOnMap"
        :errorText="getFormError('requireLocationOnMap')">
        <div class="space-y-1 mt-0.5">
            <p class="font-bold text-sm mx-2">Require location on map</p>
            <p class="text-sm text-gray-500 mx-2">Customers must pick a location on the map for accurate delivery</p>
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
