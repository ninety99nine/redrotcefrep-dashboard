<template>

    <div>

        <!-- Input Label -->
        <InputLabel v-if="label != ''" :_for="uniqueId" :labelPopoverTitle="labelPopoverTitle" :labelPopoverDescription="labelPopoverDescription" >
            {{ label }}
        </InputLabel>

        <div :class="{ 'mt-2': label != '' }">

            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                </div>
                <input :value="localModelValue" @changeDate="changeDate" :id="uniqueId" datepicker type="text" placeholder="Select date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>

            <!-- Input Error Message -->
            <InputErrorMessage :errorText="errorText"></InputErrorMessage>

        </div>

    </div>

</template>

<script>
    /**
     * Component Reference: https://flowbite.com/docs/plugins/datepicker/
     */
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import Datepicker from 'flowbite-datepicker/Datepicker';
    import InputLabel from '@Partials/input-labels/InputLabel.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

    export default {
        props: {
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
            modelValue: {
                type: String
            },
            errorText: {
                type: String
            },

            //  Datetime Input Specific Props
            autohide: {
                type: Boolean,
                default: true
            },
            calendarWeeks: {
                type: Boolean,
                default: false
            },
            clearBtn: {
                type: Boolean,
                default: false
            },
            dateDelimiter: {
                type: String,
                default: ','
            },
            datesDisabled: {
                type: Array,
                default: () => []
            },
            daysOfWeekDisabled: {
                type: Array,
                default: () => []
            },
            daysOfWeekHighlighted: {
                type: Array,
                default: () => []
            },
            defaultViewDate: {
                type: [String, Date],
                default: undefined
            },
            disableTouchKeyboard: {
                type: Boolean,
                default: false
            },
            format: {
                type: String,
                default: 'dd M yyyy'
            },
            language: {
                type: String,
                default: 'en'
            },
            maxDate: {
                type: [String, Date],
                default: null
            },
            maxNumberOfDates: {
                type: Number,
                default: 1
            },
            maxView: {
                type: Number,
                default: 3
            },
            minDate: {
                type: [String, Date],
                default: null
            },
            nextArrow: {
                type: String,
                default: '<svg class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>'
            },
            prevArrow: {
                type: String,
                default: '<svg class="w-4 h-4 rtl:rotate-180 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/></svg>'
            },
            orientation: {
                type: String,
                default: 'auto'
            },
            pickLevel: {
                type: Number,
                default: 0
            },
            showDaysOfWeek: {
                type: Boolean,
                default: true
            },
            showOnClick: {
                type: Boolean,
                default: true
            },
            showOnFocus: {
                type: Boolean,
                default: true
            },
            startView: {
                type: Number,
                default: 0
            },
            title: {
                type: String,
                default: ''
            },
            todayBtn: {
                type: Boolean,
                default: false
            },
            todayBtnMode: {
                type: Number,
                default: 0
            },
            todayHighlight: {
                type: Boolean,
                default: true
            },
            updateOnBlur: {
                type: Boolean,
                default: true
            },
            weekStart: {
                type: Number,
                default: 0
            }
        },
        mixins: [UtilsMixin],
        components: { InputLabel, InputErrorMessage },
        data() {
            return {
                datetimePicker: null,
                localModelValue: null,
                uniqueId: this.generateUniqueId('datepicker')
            };
        },
        watch: {
            modelValue(newValue, oldValue) {
                this.updateValue(newValue);
            }
        },
        methods: {
            updateValue(newValue) {

                /**
                 *  The newValue is in the format (20 Dec 2024).
                 *  The datepicker knows this because the format
                 *  property is set to (dd M yyyy). It will
                 *  therefore convert it internally to its
                 *  preferred syntax (20/12/2024).
                 *
                 *  20/12/2024 (The Flowbite datepicker format)
                 */
                this.localModelValue = newValue;

            },
            changeDate(event) {

                var date = event.detail.date;

                /**
                 *  20 Dec 2024 (The Readable datetime format)
                 */
                this.$emit('update:modelValue', this.formattedDate(date));
            }
        },
        mounted() {

            const datepickerEl = document.getElementById(this.uniqueId);

            /**
             *  Reference: https://flowbite.com/docs/plugins/datepicker/#javascript
             */
            this.datetimePicker = new Datepicker(datepickerEl, {

                /**
                 *  Options
                 *
                 *  Refer to this file for more options: node_modules/flowbite-datepicker/js/options/defaultOptions.js
                 */
                title: this.title,
                format: this.format,
                maxDate: this.maxDate,
                maxView: this.maxView,
                minDate: this.minDate,
                clearBtn: this.clearBtn,
                autohide: this.autohide,
                language: this.language,
                todayBtn: this.todayBtn,
                pickLevel: this.pickLevel,
                prevArrow: this.prevArrow,
                nextArrow: this.nextArrow,
                startView: this.startView,
                weekStart: this.weekStart,
                orientation: this.orientation,
                showOnClick: this.showOnClick,
                showOnFocus: this.showOnFocus,
                todayBtnMode: this.todayBtnMode,
                updateOnBlur: this.updateOnBlur,
                calendarWeeks: this.calendarWeeks,
                dateDelimiter: this.dateDelimiter,
                datesDisabled: this.datesDisabled,
                todayHighlight: this.todayHighlight,
                showDaysOfWeek: this.showDaysOfWeek,
                defaultViewDate: this.defaultViewDate,
                maxNumberOfDates: this.maxNumberOfDates,
                daysOfWeekDisabled: this.daysOfWeekDisabled,
                disableTouchKeyboard: this.disableTouchKeyboard,
                daysOfWeekHighlighted: this.daysOfWeekHighlighted
            });

        },
        created() {
            if(this.modelValue) {
                this.updateValue(this.modelValue);
            }
        }
    };

  </script>
