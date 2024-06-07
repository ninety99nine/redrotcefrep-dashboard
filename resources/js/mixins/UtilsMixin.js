import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

/**
 *  Import the relativeTime plugin to enable relative time formatting.
 *  This allows us to use the fromNow() to format dates as "ago" or
 *  "in" formats e.g "10 hours ago" or "in 10 hours".
 */
dayjs.extend(relativeTime);

export const UtilsMixin = {
    methods: {

        /**
         *  29 Feb 2024
         */
        formattedDate(date) {
            return dayjs(date).format('DD MMM YYYY');
        },

        /**
         *  29 Feb 2024 08:30
         */
        formattedDatetime(date) {
            return dayjs(date).format('DD MMM YYYY HH:mm');
        },

        /**
         *  02-01-2024 00:00:00
         */
        dateToTimestamp(date) {
            return dayjs(date).unix();
        },

        /**
         *  Past date: 10 hours ago
         *  Future date: in 10 hours
         */
        formattedRelativeDate(date) {
            return dayjs(date).fromNow();
        },

        /**
         *  Return true/false whether the passed date is in the future
         */
        isFutureDate(date) {
            return dayjs(date).isAfter(dayjs());
        },

        capitalize(value) {
            if (!value) return '';
            return value.charAt(0).toUpperCase() + value.slice(1);
        },

        capitalizeAllWords(value) {
            if (!value) return '';
            return value.split(' ').map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }).join(' ');
        },

        generateUniqueId(prefix) {
            return prefix + '_' + this.generateRandomString(8) + Date.now();
        },

        generateRandomString(length) {

            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }

            return result;
        },

        generateRandomNumber(length) {

            let result = '';
            const characters = '0123456789';

            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }

            return result;
        },

        isValidMoney(value) {
            // Regular expression to match valid money format
            const moneyRegex = /^\d+(\.\d{1,2})?$/;

            // Check if the value matches the money format
            return moneyRegex.test(value);
        },

        twoDecimalPlaces(value) {

            // Parse the value as a floating-point number
            let floatValue = parseFloat(value);

            // Check if floatValue is a valid number
            if (!isNaN(floatValue)) {

                // Round the number to two decimal places
                floatValue = Math.round(floatValue * 100) / 100;

                // Convert the rounded number back to a string with two decimal places
                return floatValue.toFixed(2);

            } else {

                // Return value as is
                return value;

            }

        },

        covertToValidMoney(value) {

            // Convert value to string
            value = value.toString();

            // Remove non-numeric characters
            let numericValue = value.replace(/[^0-9.]/g, '');

            if(numericValue == '') {

                // Set to zero
                numericValue = 0;

            }else{

                // Convert to float
                numericValue = parseFloat(numericValue);

            }

            // Ensure the value is not negative
            numericValue = Math.max(0, numericValue);

            // Round the value to two decimal places
            numericValue = Math.round(numericValue * 100) / 100;

            //  Convert to string
            numericValue = numericValue.toFixed(2);

            return numericValue;

        },

    }
  };
