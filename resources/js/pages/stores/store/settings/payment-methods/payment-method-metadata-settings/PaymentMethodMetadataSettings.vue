<template>

    <div class="space-y-4">

        <template v-if="type == 'dpo'">

            <!-- Company Token Input -->
            <TextInput
                label="Company Token"
                placeholder="123456789"
                labelPopoverTitle="What Is This?"
                v-model="localModelValue.companyToken"
                :errorText="getFormError('companyToken')"
                labelPopoverDescription="The DPO company token that identifies the DPO account used to receive payments">
            </TextInput>

            <!-- Country Select Input -->
            <CountrySelectInput
                width="w-full"
                label="Country"
                labelPopoverTitle="What Is This?"
                v-model="localModelValue.defaultCountryCode"
                labelPopoverDescription="The default country used when the customer wants to pay">
            </CountrySelectInput>

            <!-- Email Payment Request Toggle Switch -->
            <Checkbox
                size="xs"
                class="mt-1"
                v-model="localModelValue.emailPaymentRequest"
                :errorText="getFormError('emailPaymentRequest')">
                <div class="space-y-1 mt-0.5">
                    <p class="font-bold text-sm mx-2">Email Payment Request</p>
                    <p class="text-sm text-gray-500 mx-2">Automatically send a payment request to the customer's email</p>
                </div>
            </Checkbox>

        </template>

        <template v-if="type == 'stripe'">

            <!-- Stripe Secret Token Input -->
            <PasswordInput
                label="Secret Token"
                :showForgotPassword="false"
                v-model="localModelValue.secretToken"
                :errorText="getFormError('secretToken')"
                labelPopoverDescription="The Stripe secret token - Check your Stripe developer dashboard to get your API secret key">
            </PasswordInput>

            <!-- Stripe Public Token Input -->
            <PasswordInput
                label="Public Token"
                :showForgotPassword="false"
                v-model="localModelValue.publicToken"
                :errorText="getFormError('publicToken')"
                labelPopoverDescription="The Stripe public token - Check your Stripe developer dashboard to get your API public key">
            </PasswordInput>

        </template>

        <template v-if="type == 'paypal'">

            <!-- Payment Link Input -->
            <TextInput
                label="Payment Link"
                labelPopoverTitle="What Is This?"
                v-model="localModelValue.paymentLink"
                :errorText="getFormError('paymentLink')"
                placeholder="https://paypal.me/baby-cakes"
                labelPopoverDescription="The PayPal payment link - Check your PayPal developer dashboard to get your payment link">

                <template #prepend>
                    <div class="py-1.5 px-2 rounded-l-md bg-gray-50 text-gray-500 border-r whitespace-nowrap">
                        <svg class="w-5 h-5 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525" />
                        </svg>
                    </div>
                </template>

            </TextInput>

        </template>

    </div>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import PasswordInput from '@Partials/inputs/PasswordInput.vue';
    import CountrySelectInput from '@Partials/inputs/CountrySelectInput.vue';

    export default {
        mixins: [FormMixin],
        components: {
            TextInput, Checkbox, PasswordInput, CountrySelectInput
        },
        props: {
            modelValue: {
                type: Object
            },
            paymentMethod: {
                type: Object
            },
        },
        data() {
            return {
                localModelValue: this.modelValue
            };
        },
        watch: {
            modelValue(newValue, oldValue) {
                this.updateValue(newValue);
            },
            localModelValue(newValue, oldValue) {
                this.$emit('update:modelValue', newValue);
            }
        },
        computed: {
            type() {
                return this.paymentMethod.type.toLowerCase();
            }
        },
        methods: {
            updateValue(newValue) {
                this.localModelValue = newValue;
            }
        }
    };

</script>
