<template>
    <div :class="badgeClasses" @click.stop.prevent="action">
        <StatusDot v-if="showDot" :type="dotType"></StatusDot>
        <slot></slot>
        <svg
            v-if="closableAction"
            @click.stop="closableAction"
            class="w-5 h-5 ml-2 -mr-1 cursor-pointer hover:opacity-70 active:scale-90" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    </div>
</template>

<script>
import StatusDot from '@Partials/status-dots/StatusDot.vue';
export default {
    props: {
        showDot: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'primary',
            validator: value => [
                'light', 'primary', 'success', 'warning', 'danger',
                'dark', 'info', 'outline', 'gradient', 'glass'
            ].includes(value)
        },
        size: {
            type: String,
            default: 'md',
            validator: value => ['xs', 'sm', 'md', 'lg'].includes(value)
        },
        action: {
            type: Function,
            default: null
        },
        closableAction: {
            type: Function,
            default: null
        },
    },
    computed: {
        badgeClasses() {
            const typeClassMap = {
                light: 'bg-gray-50 text-gray-500 border-gray-500 border',
                primary: 'bg-blue-50 text-blue-500 border-blue-500 border',
                success: 'bg-green-50 text-green-500 border-green-500 border',
                warning: 'bg-yellow-50 text-yellow-500 border-yellow-500 border',
                danger: 'bg-red-50 text-red-500 border-red-500 border',
                dark: 'bg-gray-900 text-white border-gray-700 border',
                info: 'bg-cyan-50 text-cyan-500 border-cyan-500 border',
                outline: 'border border-gray-500 bg-transparent text-gray-700',
                gradient: 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white',
                glass: 'border border-white/20 bg-white/80 backdrop-blur-lg text-gray-900'
            };

            const sizeClassMap = {
                xs: 'px-2 py-0.5 text-xs',
                sm: 'px-2.5 py-1 text-sm',
                md: 'px-3 py-1.5 text-base',
                lg: 'px-4 py-2 text-lg'
            };

            const clickClasses = 'cursor-pointer shadow border hover:bg-opacity-90 hover:scale-95 hover:shadow-sm active:scale-90 transition-all';

            const baseClasses = `space-x-20 inline-flex items-center font-medium rounded-full whitespace-nowrap ${sizeClassMap[this.size]}`;
            let classes = `${baseClasses} ${typeClassMap[this.type]}`;

            if (this.action) {
                classes += ` ${clickClasses}`;
            }

            return classes;
        },
        dotType() {
            return this.type;
        }
    },
    components: { StatusDot }
};
</script>
