<template>

    <!-- Select Input -->
    <SelectInput
        width="w-full"
        v-model="localModelValue"
        :label="configSchemaEntity.label"
        :placeholder="configSchemaEntity.placeholder"
        :description="configSchemaEntity.description"
        :secondaryLabel="configSchemaEntity.optional ? '(optional)' : null"
        :learnMoreLink="configSchemaEntity.learnMore ? configSchemaEntity.learnMore.href : null"
        :learnMoreLabel="configSchemaEntity.learnMore ? configSchemaEntity.learnMore.label : null">
        <option v-for="(option, optionIndex) in configSchemaEntity.options" :value="option.value" :key="optionIndex">
            {{ option.label }}
        </option>
    </SelectInput>

</template>

<script>

    import SelectInput from '@Partials/inputs/SelectInput.vue';

    export default {
        components: { SelectInput },
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
