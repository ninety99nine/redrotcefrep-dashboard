<template>

    <div v-if="paymentMethod.active">

        <!-- Custom Name Text Input -->
        <TextInput
            class="mt-4"
            label="Custom Name"
            v-model="paymentMethod.customName"
            v-if="paymentMethod.type == 'other'"
            description="Provide your own custom payment name">
        </TextInput>

        <div
            :key="index"
            class="mt-4"
            v-for="(configSchemaEntity, index) in paymentMethod.configSchema">

            <template v-if="checkIfPaymentMethodConfigSchemaEntityPassesCondition(configSchemaEntity, paymentMethod.configs)">

                <StringConfig
                    :configSchemaEntity="configSchemaEntity"
                    v-if="configSchemaEntity.type == 'string'"
                    v-model="paymentMethod.configs[configSchemaEntity.attribute]">
                </StringConfig>

                <MobileNumberConfig
                    :configSchemaEntity="configSchemaEntity"
                    v-else-if="configSchemaEntity.type == 'mobile_number'"
                    v-model="paymentMethod.configs[configSchemaEntity.attribute]">
                </MobileNumberConfig>

                <EmailConfig
                    :configSchemaEntity="configSchemaEntity"
                    v-else-if="configSchemaEntity.type == 'email'"
                    v-model="paymentMethod.configs[configSchemaEntity.attribute]">
                </EmailConfig>

                <UrlConfig
                    :configSchemaEntity="configSchemaEntity"
                    v-else-if="configSchemaEntity.type == 'url'"
                    v-model="paymentMethod.configs[configSchemaEntity.attribute]">
                </UrlConfig>

                <SelectConfig
                    :configSchemaEntity="configSchemaEntity"
                    v-else-if="configSchemaEntity.type == 'select'"
                    v-model="paymentMethod.configs[configSchemaEntity.attribute]">
                </SelectConfig>

                <ImageConfig
                    :paymentMethod="paymentMethod"
                    :configSchemaEntity="configSchemaEntity"
                    v-else-if="configSchemaEntity.type == 'image'"
                    v-model="paymentMethod.configs[configSchemaEntity.attribute]">
                </ImageConfig>

                <ContentConfig
                    :configSchemaEntity="configSchemaEntity"
                    v-else-if="configSchemaEntity.type == 'content'">
                </ContentConfig>

                <!-- Validation Error Message -->
                <p
                    v-if="getPaymentMethodFirstValidationError(configSchemaEntity, paymentMethod.configs)"
                    class="flex space-x-1 text-xs text-yellow-600 font-semibold bg-yellow-100 border border-yellow-300 p-3 rounded-lg shadow-md mt-2">
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                    <span>{{ getPaymentMethodFirstValidationError(configSchemaEntity, paymentMethod.configs) }}</span>
                </p>

            </template>

        </div>

    </div>

</template>

<script>

    import TextInput from '@Partials/inputs/TextInput.vue';
    import { useOnboardingState } from '@Stores/onboarding-store.js';
    import UrlConfig from '@Pages/stores/onboarding/PaymentMethodConfigInputs/PaymentMethodConfigInput/UrlConfig.vue';
    import EmailConfig from '@Pages/stores/onboarding/PaymentMethodConfigInputs/PaymentMethodConfigInput/EmailConfig.vue';
    import ImageConfig from '@Pages/stores/onboarding/PaymentMethodConfigInputs/PaymentMethodConfigInput/ImageConfig.vue';
    import SelectConfig from '@Pages/stores/onboarding/PaymentMethodConfigInputs/PaymentMethodConfigInput/SelectConfig.vue';
    import StringConfig from '@Pages/stores/onboarding/PaymentMethodConfigInputs/PaymentMethodConfigInput/StringConfig.vue';
    import ContentConfig from '@Pages/stores/onboarding/PaymentMethodConfigInputs/PaymentMethodConfigInput/ContentConfig.vue';
    import MobileNumberConfig from '@Pages/stores/onboarding/PaymentMethodConfigInputs/PaymentMethodConfigInput/MobileNumberConfig.vue';

    export default {
        props: {
            paymentMethod: {
                type: Object
            },
            paymentMethodIndex: {
                type: Number
            }
        },
        components: {
            TextInput, UrlConfig, EmailConfig, ImageConfig, SelectConfig,
            StringConfig, ContentConfig, MobileNumberConfig
        },
        data() {
            return {
                onboardingState: useOnboardingState(),
            };
        },
        methods: {
            checkIfPaymentMethodConfigSchemaEntityPassesCondition(configSchemaEntity, configs) {
                return this.onboardingState.checkIfPaymentMethodConfigSchemaEntityPassesCondition(configSchemaEntity, configs);
            },
            getPaymentMethodFirstValidationError(configSchemaEntity, configs) {
                return this.onboardingState.getPaymentMethodFirstValidationError(configSchemaEntity, configs);
            }
        }
    };
  </script>
