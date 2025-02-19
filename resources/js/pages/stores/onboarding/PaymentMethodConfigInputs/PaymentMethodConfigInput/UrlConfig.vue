<template>

    <!-- Url Input -->
    <TextInput
        v-model="localModelValue"
        :label="configSchemaEntity.label"
        :description="configSchemaEntity.description"
        :placeholder="configSchemaEntity.placeholder"
        :secondaryLabel="configSchemaEntity.optional ? '(optional)' : null"
        :learnMoreLink="configSchemaEntity.learnMore ? configSchemaEntity.learnMore.href : null"
        :learnMoreLabel="configSchemaEntity.learnMore ? configSchemaEntity.learnMore.label : null">
        <template #prepend v-if="configSchemaEntity.prefix">
            <div class="flex items-center space-x-1 py-1.5 pl-2 pr-4 rounded-l-md bg-gray-50 text-gray-500 border-r whitespace-nowrap">
                <span>{{ configSchemaEntity.prefix }}</span>
            </div>
        </template>
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
