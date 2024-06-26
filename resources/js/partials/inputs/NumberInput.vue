<template>

    <div>

        <!-- Input Label -->
        <InputLabel v-if="label != ''" :_for="uniqueId" :labelPopoverTitle="labelPopoverTitle" :labelPopoverDescription="labelPopoverDescription" >
            {{ label }}
        </InputLabel>

        <div class="mt-2">

            <div class="flex">

                <!-- Input Field -->
                <input v-if="size == 'lg'" v-model="localModelValue" :id="uniqueId" :name="uniqueId" type="number" :min="nonNegative ? 0 : null" :autocomplete="_autocomplete" :required="_required" :placeholder="_placeholder" :class="[$slots.suffix ? 'rounded-l-md' : 'rounded-md', 'block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 px-3']">
                <input v-else-if="size == 'sm'" v-model="localModelValue" :id="uniqueId" :name="uniqueId" type="number" :min="nonNegative ? 0 : null" :autocomplete="_autocomplete" :required="_required" :placeholder="_placeholder" :class="[$slots.suffix ? 'rounded-l-md' : 'rounded-md', 'block w-full border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-700 text-xs sm:leading-6 px-3']">

                <!-- More Info Popover -->
                <MoreInfoPopover v-if="label == '' && (labelPopoverTitle || labelPopoverDescription)" :title="labelPopoverTitle" :description="labelPopoverDescription" placement="top" class="ml-2"></MoreInfoPopover>

                <!-- Suffix -->
                <div v-if="$slots.suffix" class="flex items-center px-3 bg-gray-100 rounded-r-lg border text-xs">
                    <slot name="suffix"></slot>
                </div>

            </div>

            <!-- Input Error Message -->
            <InputErrorMessage :errorText="errorText"></InputErrorMessage>

        </div>

    </div>

</template>

<script>

    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import InputLabel from '@Partials/input-labels/InputLabel.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

  export default {
    mixins: [UtilsMixin],
    components: { InputLabel, MoreInfoPopover, InputErrorMessage },
    props: {
        modelValue: {
            type: String
        },
        nonNegative: {
            type: Boolean,
            default: true
        },
        label: {
            type: String,
            default: 'Label'
        },
        labelPopoverTitle: {
            type: String
        },
        labelPopoverDescription: {
            type: String
        },
        _autocomplete: {
            type: String
        },
        _placeholder: {
            type: String,
            default: ''
        },
        _required: {
            type: Boolean,
            default: true
        },
        errorText: {
            type: String
        },
        size: {
            type: String,
            default: 'lg',
            options: ['lg', 'sm']
        },
    },
    data() {
      return {
        localModelValue: this.modelValue,
        uniqueId: this.generateUniqueId('number')
      };
    },
    watch: {
      modelValue(newValue, oldValue) {
        this.updateValue(newValue);
      },
      localModelValue(newValue, oldValue) {
        if(newValue) {

        }

        this.$emit('update:modelValue', newValue.toString());
      }
    },
    methods: {
      updateValue(newValue) {
        if(this.nonNegative && newValue < 0) newValue = 0;
        this.localModelValue = newValue;
      }
    }
  };
</script>
