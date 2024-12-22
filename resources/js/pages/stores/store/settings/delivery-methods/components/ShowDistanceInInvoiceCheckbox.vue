<template>

    <div>

        <Checkbox
            size="xs"
            v-model="form.showDistanceOnInvoice"
            :errorText="getFormError('showDistanceOnInvoice')">
            <div class="space-y-1 mt-0.5">
                <p class="font-bold text-sm mx-2">Show distance in invoice</p>
                <p class="text-sm text-gray-500 mx-2">The calculated delivery distance will appear on the invoice</p>
            </div>
        </Checkbox>

        <Alert v-if="!form.requireLocationOnMap" type="light" class="border border-dashed border-gray-200 mt-4">
            <span class="text-xs text-gray-500 space-x-1">
                <span>💡</span>
                <span>Turn on</span>
                <BadgeIndicator
                    type="primary"
                    :showDot="false"
                    :clickable="true"
                    text="Require location on map"
                    :action="() => enableRequireLocationOnMap()">
                </BadgeIndicator>
                <span>so that distances are calculated more accurately (optional)</span>
            </span>
        </Alert>

    </div>

</template>

<script>

    import Alert from '@Partials/alerts/Alert.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';

    export default {
        mixins: [FormMixin],
        components: { Alert, Checkbox, BadgeIndicator },
        props: {
            form: {
                type: Object
            }
        },
        methods: {
            enableRequireLocationOnMap() {
                this.form.requireLocationOnMap = true;
                this.form.showDistanceOnInvoice = true;
            }
        }
    };

</script>
