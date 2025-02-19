<template>
    <button
        @click="action"
        :class="buttonClasses">

        <!-- Spinning Loader -->
        <SpinningLoader v-if="loading" type="light"></SpinningLoader>

        <slot v-else></slot>

    </button>
</template>

<script>

import SpinningLoader from "@Partials/loaders/SpinningLoader.vue";

export default {
    components: { SpinningLoader },
    props: {
        action: {
            type: [Function, null],
            default: null
        },
        type: {
            type: String,
            default: 'primary',
            validator: (value) => [
                'light', 'primary', 'success', 'warning', 'danger',
                'dark', 'info', 'outline', 'gradient', 'glass',
                'skeleton'
            ].includes(value)
        },
        disabled: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'md',
            validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value)
        },
        spacing: {
            type: String,
            default: 'space-x-2',
        }
    },
    computed: {
        buttonClasses() {

            var classes = [];
            const baseClasses = [this.spacing, 'group flex justify-center items-center font-semibold rounded-lg transition-all duration-250 active:scale-95'];

            const sizeClasses = {
                xs: "py-1.5 px-3 text-xs",
                sm: "py-1.5 px-4 text-sm",
                md: "py-2 px-5 text-base",
                lg: "py-2.5 px-6 text-lg"
            };

            const typeClasses = {
                light: "border border-gray-300 bg-gray-100 hover:bg-gray-300",
                primary: "bg-blue-500 hover:bg-blue-700 text-white",
                success: "bg-green-500 hover:bg-green-700 text-white",
                warning: "bg-yellow-500 hover:bg-yellow-700 text-white",
                danger: "bg-red-500 hover:bg-red-700 text-white",
                dark: "border border-gray-700 bg-gray-900 hover:bg-black text-white",
                info: "bg-cyan-500 hover:bg-cyan-700 text-white",
                outline: "border border-gray-500 bg-transparent hover:bg-gray-200 text-gray-700",
                gradient: "bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white",
                glass: "border border-white/20 bg-white/30 backdrop-blur-lg hover:bg-white/40 text-gray-900",
                disabled: "bg-gray-100 text-gray-300"
            };

            classes.push(baseClasses);
            classes.push(sizeClasses[this.size]);
            classes.push(typeClasses[this.disabled ? 'disabled' : this.type]);
            classes.push(this.disabled ? 'cursor-not-allowed' : 'cursor-pointer')

            return classes;
        }
    }
};
</script>
