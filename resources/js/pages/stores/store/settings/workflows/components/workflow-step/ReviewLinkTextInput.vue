<template>

    <Checkbox
        size="xs"
        v-model="workflowStepForm.settings.useReviewLink"
        :errorText="formState.getFormError('settingsUseReviewLink')">
        <div class="w-full mt-0.5 mx-2">
            <p class="font-bold text-sm mb-1">Use review link</p>
            <p class="text-sm text-gray-500 max-w-96">Provide a link that will be used to take reviews</p>

            <div :class="[workflowStepForm.settings.useReviewLink ? 'h-10 mt-4' : 'h-0 mt-0', 'w-full transition-all duration-500 overflow-hidden']">

                <TextInput
                    class="w-full p-0.5"
                    labelPopoverTitle="What Is This?"
                    v-model="workflowStepForm.settings.reviewLink"
                    :errorText="formState.getFormError('settingsReviewLink')"
                    placeholder="https://paypal.me/baby-cakes"
                    :labelPopoverDescription="'The link that will be used to redirect customers to place a review. If not provided, '+appName+' will use its own review system'">

                    <template #prepend>
                        <div class="py-1.5 px-2 rounded-l-md bg-gray-50 text-gray-500 border-r whitespace-nowrap">
                            <svg class="w-5 h-5 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                            </svg>
                        </div>
                    </template>

                </TextInput>

            </div>
        </div>
    </Checkbox>

</template>

<script>

    import settings from '@Js/settings.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';

    export default {
        inject: ['formState'],
        components: { TextInput, Checkbox },
        props: {
            workflowStepForm: {
                type: Object
            }
        },
        data() {
            return {
                appName: settings.appName
            };
        }
    };

</script>
