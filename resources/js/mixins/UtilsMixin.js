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
        }
    }
  };
