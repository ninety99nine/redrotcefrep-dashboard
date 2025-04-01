<template>

    <Checkbox
        size="xs"
        :disabled="disabled"
        v-model="askForAnAddress"
        :errorText="formState.getFormError('askForAnAddress')">
        <div class="space-y-1 mt-0.5">
            <div class="flex items-center space-x-1 font-bold text-sm mx-2">
                <span>Capture address information</span>
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                </svg>
            </div>
            <p v-if="disabled" class="text-sm text-green-500 mx-2">
                The address information will be captured to support delivery fee by
                <template v-if="this.form.feeType == 'fee by distance'">distance</template>
                <template v-else-if="this.form.feeType == 'fee by postal code'">postal code</template>
            </p>
            <p v-else class="text-sm text-gray-500 mx-2">Ask customers to provide their address information for delivery</p>
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
                askForAnAddress: null
            }
        },
        watch: {
            'form.feeType'(newVal) {
                if(newVal == 'fee by distance' ||  newVal == 'fee by postal code') {
                    this.askForAnAddress = true;
                }else{
                    this.askForAnAddress = this.form.askForAnAddress;
                }
            },
            'askForAnAddress'(newVal) {
                if(!this.disabled) this.form.askForAnAddress = newVal;
                if(!newVal) this.form.pinLocationOnMap = false;
            }
        },
        computed: {
            disabled() {
                return this.form.feeType == 'fee by distance' ||  this.form.feeType == 'fee by postal code';
            }
        },
        created() {
            this.askForAnAddress = this.form.askForAnAddress || this.form.feeType == 'fee by distance' ||  this.form.feeType == 'fee by postal code'
        }
    };

</script>
