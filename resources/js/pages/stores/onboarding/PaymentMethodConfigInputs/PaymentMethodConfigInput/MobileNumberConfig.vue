<template>

    <!-- Mobile Number Input -->
    <MobileNumberInput
        v-model="localModelValue"
        :label="configSchemaEntity.label"
        :description="configSchemaEntity.description"
        :secondaryLabel="configSchemaEntity.optional ? '(optional)' : null"
        :learnMoreLink="configSchemaEntity.learnMore ? configSchemaEntity.learnMore.href : null"
        :learnMoreLabel="configSchemaEntity.learnMore ? configSchemaEntity.learnMore.label : null">
    </MobileNumberInput>

</template>

<script>

    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';

    export default {
        components: { MobileNumberInput },
        props: {
            modelValue: {
                type: String
            },
            configSchemaEntity: {
                type: Object
            },
        },
        data() {
            return {
                localModelValue: this.modelValue
            };
        },
        watch: {
            modelValue(newValue) {
                this.localModelValue = newValue;
            },
            localModelValue(newValue, oldValue) {
                this.$emit('update:modelValue', newValue);
            }
        }
    };
  </script>

