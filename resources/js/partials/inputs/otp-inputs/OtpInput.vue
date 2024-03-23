<template>

    <div>

        <div class="flex justify-center space-x-3">
            <input
                class="block w-12 h-12 text-center border border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                v-for="(input, index) in otpDigits" :key="index" ref="otpInputs" v-model="otpDigits[index]"
                v-on:keydown.backspace.prevent="onBackspace(index)"
                @input="onInput(index)"
                @focus="onFocus(index)"
                maxlength="2"
                type="text"
                autofocus
            />
        </div>

        <!-- Input Error Message -->
        <InputErrorMessage :errorText="errorText" class="flex justify-center mt-2"></InputErrorMessage>

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
      errorText: {
        type: String
      },
      length: {
        type: Number,
        default: 6
      },
    },
    mixins: [UtilsMixin],
    components: { InputLabel, InputErrorMessage },
    data() {
      return {
        otpDigits: Array(this.length).fill(''),
        uniqueId: this.generateUniqueId('mobile_number')
      };
    },
    watch: {
        modelValue(newValue, oldValue) {
            if(newValue != this.otpDigits.join('')) {
                this.updateValue(newValue);
            }
        },
        otpDigits: {
            handler(newDigits) {
                const otp = newDigits.join('');
                this.$emit('update:modelValue', otp);
            },
            deep: true
        }
    },
    methods: {
        updateValue(newValue) {

            // Reset otpDigits to all empty strings
            this.otpDigits = Array(this.length).fill('');

            // Ensure only digits are entered
            newValue = newValue.replace(/\D/g, '');

            // Iterate over the characters in newValue
            for (let index = 0; index < newValue.length; index++) {

                // Update otpDigits only if index is within bounds
                if (index < this.length) {
                    this.otpDigits[index] = newValue.charAt(index);
                } else {
                    // Break the loop if index exceeds the length of otpDigits
                    break;
                }
            }
        },
        onFocus(index) {

            // Focus on the first empty input if we focus on any other further input
            for (let i = 0; i < this.length; i++) {
                if(i < index && this.otpDigits[i].length == 0) {
                    this.$refs.otpInputs[i].focus();
                }
            }

        },
        onInput(index) {

            // Ensure only digits are entered
            var value = this.otpDigits[index].replace(/\D/g, '');

            if(value.length == 1) {

                this.otpDigits[index] = value.charAt(0)

            }else if(value.length == 2) {

                this.otpDigits[index] = value.charAt(1)

            }else{

                this.otpDigits[index] = value;

            }

            // Move focus to the next input field after typing a digit
            if (this.otpDigits[index].length === 1 && index < (this.otpDigits.length - 1)) {
                this.$refs.otpInputs[index + 1].focus();
            }
        },
        onBackspace(index) {

            this.otpDigits[index] = '';

            // Move focus to the previous input field on backspace if the current input is empty
            if (index > 0) {
                this.$refs.otpInputs[index - 1].focus();
            }

        }
    },
  };
  </script>
