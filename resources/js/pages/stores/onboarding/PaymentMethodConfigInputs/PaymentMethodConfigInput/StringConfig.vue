<template>

    <!-- Text Input -->
    <TextInput
        v-model="localModelValue"
        :label="configSchemaEntity.label"
        :placeholder="configSchemaEntity.placeholder"
        :description="configSchemaEntity.description"
        :secondaryLabel="configSchemaEntity.optional ? '(optional)' : null"
        :learnMoreLink="configSchemaEntity.learnMore ? configSchemaEntity.learnMore.href : null"
        :learnMoreLabel="configSchemaEntity.learnMore ? configSchemaEntity.learnMore.label : null">
    </TextInput>

</template>

<script>

    import TextInput from '@Partials/inputs/TextInput.vue';

    export default {
        components: { TextInput },
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
