<template>

    <!-- Email Input -->
    <EmailInput
        v-model="localModelValue"
        :label="configSchemaEntity.label"
        :description="configSchemaEntity.description"
        :secondaryLabel="configSchemaEntity.optional ? '(optional)' : null"
        :learnMoreLink="configSchemaEntity.learnMore ? configSchemaEntity.learnMore.href : null"
        :learnMoreLabel="configSchemaEntity.learnMore ? configSchemaEntity.learnMore.label : null">
    </EmailInput>

</template>

<script>

    import EmailInput from '@Partials/inputs/EmailInput.vue';

    export default {
        components: { EmailInput },
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
