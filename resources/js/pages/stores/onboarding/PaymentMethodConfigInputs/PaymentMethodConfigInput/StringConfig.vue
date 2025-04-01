<template>

    <!-- Text Input -->
    <CustomInput
        type="text"
        v-model="localModelValue"
        :label="configSchemaEntity.label"
        :placeholder="configSchemaEntity.placeholder"
        :description="configSchemaEntity.description"
        :secondaryLabel="configSchemaEntity.optional ? '(optional)' : null"
        :externalLinkUrl="configSchemaEntity.learnMore ? configSchemaEntity.learnMore.href : null"
        :externalLinkName="configSchemaEntity.learnMore ? configSchemaEntity.learnMore.label : null">

        <template #prefix>
                <span class="leading-4 text-gray-400 text-sm">
                    {{ configSchemaEntity.prefix }}
                </span>
        </template>

    </CustomInput>

</template>

<script>

    import CustomInput from '@Partials/inputs/CustomInput.vue';

    export default {
        components: { CustomInput },
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
