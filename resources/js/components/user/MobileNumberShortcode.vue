<template>

    <!-- Mobile Number Shortcode Modal -->
    <BasicModal>

        <template #content>
            <div class="flex justify-center items-center space-x-2 border-b border-dashed pb-4 mb-4">

                <!-- Store Icon -->
                <svg class="w-20 h-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                </svg>

            </div>

            <!-- Dial Instruction -->
            <div class="text-center">
                <span class="text-justify">Dial to see your store in action</span>
                <p class="font-bold text-4xl text-center mt-4 mb-8">{{ mobileNumberShortcode }}</p>
            </div>
        </template>

        <template #trigger="triggerProps">

            <!-- Mobile Number Shortcode - Triggers Modal -->
            <slot name="trigger" :showModal="triggerProps.showModal">
                <span @click="triggerProps.showModal" class="hover:opacity-80 active:opacity-50 active:scale-90 underline decoration-dashed underline-offset-4 cursor-pointer">
                    {{ mobileNumberShortcode }}
                </span>
            </slot>

        </template>

    </BasicModal>

</template>


<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useAuthState } from '@Stores/auth-store.js';
    import BasicModal from '@Partials/modals/BasicModal.vue';

    export default {
        mixins: [FormMixin],
        components: { BasicModal },
        data() {
            return {
                authState: useAuthState(),
            };
        },
        computed: {
            mobileNumberShortcode() {
                return this.authState.user._attributes.mobileNumberShortcode;
            }
        }
    };
</script>
