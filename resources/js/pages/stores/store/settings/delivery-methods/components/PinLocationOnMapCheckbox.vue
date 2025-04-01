<template>

    <Checkbox
        size="xs"
        :disabled="disabled"
        v-model="pinLocationOnMap"
        :errorText="formState.getFormError('pinLocationOnMap')">
        <div class="space-y-1 mt-0.5">
            <div class="flex items-center space-x-1 font-bold text-sm mx-2">
                <span>Capture address location on map</span>
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
            </div>
            <p v-if="disabled" class="text-sm text-green-500 mx-2">
                The address location on the map will be captured to support delivery fee by
                <template v-if="this.form.feeType == 'fee by distance'">distance</template>
                <template v-else-if="this.form.feeType == 'fee by postal code'">postal code</template>
            </p>
            <p v-else class="text-sm text-gray-500 mx-2">Ask customers to show their address on the map for better accuracy</p>
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
        },
        data() {
            return {
                pinLocationOnMap: null
            }
        },
        watch: {
            'form.feeType'(newVal) {
                if(newVal == 'fee by distance' ||  newVal == 'fee by postal code') {
                    this.pinLocationOnMap = true;
                }else{
                    this.pinLocationOnMap = this.form.pinLocationOnMap;
                }
            },
            'form.pinLocationOnMap'(newVal) {
                if(!this.disabled) this.form.pinLocationOnMap = newVal;
                if(newVal) this.form.askForAnAddress = true;
            }
        },
        computed: {
            disabled() {
                return this.form.feeType == 'fee by distance' ||  this.form.feeType == 'fee by postal code';
            }
        },
        created() {
            this.pinLocationOnMap = this.form.pinLocationOnMap || this.form.feeType == 'fee by distance' ||  this.form.feeType == 'fee by postal code'
        }
    };

</script>
