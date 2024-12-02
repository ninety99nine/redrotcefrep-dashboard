<template>

    <div>

        <!-- Input Label -->
        <InputLabel v-if="label != ''" :_for="uniqueId" :labelPopoverTitle="labelPopoverTitle" :labelPopoverDescription="labelPopoverDescription" >
            {{ label }}
        </InputLabel>

        <div :class="[{ 'mt-2' : label != '' }, 'flex items-center rounded-md border-0 shadow-sm ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-blue-700 sm:text-sm sm:leading-6 text-gray-900']">

            <!-- Prepend Slot -->
            <div v-if="$slots.prepend">
                <slot name="prepend"></slot>
            </div>

            <!-- Input Field -->
            <input v-model="localModelValue" :id="uniqueId" :name="uniqueId" :ref="$attrs['ref']" type="text" :autocomplete="autocomplete" :required="required" :placeholder="placeholder" :maxlength="maxlength" :minlength="minlength" class="w-full rounded-md border-0 focus:ring-0 py-1.5 px-3 sm:text-sm placeholder:text-gray-400">

            <!-- Suffix Slot -->
            <div v-if="$slots.suffix">
                <slot name="suffix"></slot>
            </div>

        </div>

        <!-- Input Error Message -->
        <InputErrorMessage :errorText="errorText"></InputErrorMessage>

    </div>

</template>

<script>

  import { UtilsMixin } from '@Mixins/UtilsMixin.js';
  import InputLabel from '@Partials/input-labels/InputLabel.vue';
  import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

  export default {
    props: {
        modelValue: {
            type: String
        },
        label: {
            type: String,
            default: ''
        },
        labelPopoverTitle: {
            type: String
        },
        labelPopoverDescription: {
            type: String
        },
        autocomplete: {
            type: String
        },
        placeholder: {
            type: String,
            default: ''
        },
        maxlength: {
            type: String,
            default: null
        },
        minlength: {
            type: String,
            default: null
        },
        required: {
            type: Boolean,
            default: true
        },
        errorText: {
            type: String
        }
    },
    mixins: [UtilsMixin],
    components: { InputLabel, InputErrorMessage },
    data() {
      return {
        localModelValue: this.modelValue,
        uniqueId: this.generateUniqueId('text')
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
    methods: {
      updateValue(newValue) {
        this.localModelValue = newValue;
      }
    }
  };
</script>
