<template>

    <div v-if="hasErrors" class="bg-red-50 space-y-4 p-4">
        <div :class="['flex space-x-2 items-center', { 'border-b border-dashed border-gray-300 pb-2' : !hasGeneralError }]">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span class="text-sm">{{ getFormError('general') ?? 'Fix this' }}</span>
        </div>
        <div v-if="!hasGeneralError" class="space-y-2">
            <div v-for="(formError, formErrorIndex) in formErrors" :key="formErrorIndex" class="px-2 border-l-4 border-red-300">
                <p class="text-xs">{{ index == null ? formError : Object.values(formError)[0] }}</p>
            </div>
        </div>
    </div>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';

    export default {
        mixins: [FormMixin],
        props: {
            index: {
                type: [Number, null],
                default: null
            }
        },
        computed: {

        }
    };

</script>
