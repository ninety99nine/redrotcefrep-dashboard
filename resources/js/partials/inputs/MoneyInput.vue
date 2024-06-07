<template>

    <div>

        <!-- Input Label -->
        <InputLabel v-if="label != ''" :_for="uniqueId" :labelPopoverTitle="labelPopoverTitle" :labelPopoverDescription="labelPopoverDescription" >
            {{ label }}
        </InputLabel>

        <div class="mt-2">

            <!-- Input Field -->
            <div class="flex">
                <div class="flex items-center px-3 bg-gray-100 rounded-l-lg border text-xs">P</div>
                <input v-if="size == 'lg'" v-model="localModelValue" @blur="onBlur" :id="uniqueId" :name="uniqueId" type="number" :autocomplete="_autocomplete" :required="_required" :placeholder="_placeholder" min="0" class="block w-full rounded-r-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6 px-3">
                <input v-else-if="size == 'sm'" v-model="localModelValue" @blur="onBlur" :id="uniqueId" :name="uniqueId" type="number" :autocomplete="_autocomplete" :required="_required" :placeholder="_placeholder" min="0" class="block w-full rounded-r-md border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-700 text-xs sm:leading-6 px-3">

                <!-- More Info Popover -->
                <MoreInfoPopover v-if="label == '' && (labelPopoverTitle || labelPopoverDescription)" :title="labelPopoverTitle" :description="labelPopoverDescription" placement="top" class="ml-2"></MoreInfoPopover>

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
    props: {
        modelValue: {
            type: String
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
    mixins: [UtilsMixin],
    components: { InputLabel, MoreInfoPopover, InputErrorMessage },
    data() {
      return {
        localModelValue: this.modelValue,
        uniqueId: this.generateUniqueId('money')
      };
    },
    watch: {
        modelValue(newValue, oldValue) {
            this.updateValue(newValue);
        },
        localModelValue(newValue, oldValue) {
            /**
             *  Note: the covertToValidMoney() method is part of the UtilsMixin methods
             */
            var value = this.covertToValidMoney(newValue);
            this.notifyParent(value);
        }
    },
    methods: {
        updateValue(newValue) {
            this.localModelValue = newValue;
        },
        onBlur(event) {
            /**
             *  Note: the covertToValidMoney() method is part of the UtilsMixin methods
             */
            var value = this.covertToValidMoney(event.target.value);

            this.localModelValue = value;

            this.notifyParent(value);
        },
        notifyParent(value) {
            this.$emit('update:modelValue', value);
        }
    }
  };
</script>
