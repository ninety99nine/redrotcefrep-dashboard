<template>

    <!-- Subscribe Modal -->
    <BasicModal :onShow="generatePaymentShortcode">

        <template #content>
            <div class="flex items-center space-x-2 border-b border-dashed pb-4 mb-4">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
                    <path fill-rule="evenodd" d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z" clip-rule="evenodd" />
                </svg>
                <span class="text-lg font-bold">Subscribe</span>
            </div>
            <p class="text-justify">Dial to subscribe for <span class="font-bold">{{ store.name }}</span>. This will reopen your store and allow customers to place orders</p>

            <!-- Payment Shortcode Skeleton-->
            <div v-if="isGeneratingPaymentShortcode" class="flex justify-center my-4">
                <ShineEffect>
                    <div class="flex items-center space-x-2 mb-4">
                        <span class="text-gray-300 text-4xl inline-block h-8">*</span>
                        <SquareSkeleton v-for="(item, index) in 3" :key="index" size="w-8 h-8"></SquareSkeleton>
                        <span class="text-gray-300 text-4xl inline-block h-8">*</span>
                        <SquareSkeleton v-for="(item, index) in 3" :key="index" size="w-8 h-8"></SquareSkeleton>
                        <span class="text-gray-300 text-2xl inline-block">#</span>
                    </div>
                    <div class="text-center text-gray-500">creating shortcode</div>
                </ShineEffect>
            </div>

            <template v-else>

                <!-- Payment Shortcode-->
                <p v-if="paymentShortcode" class="font-bold text-4xl text-center mt-4 mb-8">{{ paymentShortcode._attributes.dial.code }}</p>

                <!-- Payment Shortcode Countdown -->
                <div class="flex justify-center">
                    <Countdown v-if="paymentShortcode" :time="paymentShortcode.expiresAt" textClass="text-yellow-500 font-bold underline decoration-dashed underline-offset-4">

                        <template #suffix="props">
                            <span v-if="!props.hasExpired" class="text-sm mr-1">Expires in</span>
                        </template>

                        <div class="space-y-4">

                            <div class="flex items-center space-x-2 text-yellow-500">
                                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                </svg>
                                <span class="font-bold text-sm">Payment shortcode expired</span>
                                <MoreInfoPopover title="Payment shortcode expired" placement="top">
                                    <template #description>
                                        <hr>
                                        <p class="mb-2">The Payment shortcode is used to subscribe to your store.</p>
                                        <p>In this case the shortcode has expired for security reasons, therefore you should generate a new payment shortcode to subscribe for <span class="font-bold underline decoration-dashed underline-offset-4">{{ store.name }}</span></p>
                                    </template>
                                </MoreInfoPopover>
                            </div>

                            <PrimaryButton @click="generatePaymentShortcode" :loading="isGeneratingPaymentShortcode" type="light" size="sm">
                                <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                                <span>Renew Shortcode</span>
                            </PrimaryButton>

                        </div>

                    </Countdown>
                </div>
            </template>

        </template>

        <template #trigger="triggerProps">

            <!-- Subscribe Button - Triggers Modal -->
            <slot name="trigger" :showModal="triggerProps.showModal">
                <PrimaryButton ref="storeSubscribeButton" @click="triggerProps.showModal" size="xs" type="success">
                    Subscribe
                </PrimaryButton>
            </slot>

        </template>

    </BasicModal>

</template>


<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import { postApi } from '@Repositories/api-repository.js';
    import Countdown from '@Partials/countdowns/Countdown.vue';
    import BasicModal from '../../partials/modals/BasicModal.vue';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import SquareSkeleton from '@Partials/skeletons/SquareSkeleton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';

    export default {
        mixins: [FormMixin],
        components: { Countdown, BasicModal, ShineEffect, PrimaryButton, SquareSkeleton, MoreInfoPopover },
        data() {
            return {
                paymentShortcode: null,
                storeState: useStoreState(),
                isGeneratingPaymentShortcode: false
            };
        },
        computed: {
            store() {
                return this.storeState.store;
            }
        },
        methods: {
            generatePaymentShortcode() {

                //  Start loader
                this.isGeneratingPaymentShortcode = true;

                postApi(this.store._links.generatePaymentShortcode).then(response => {

                    if(response.status == 200) {
                        this.paymentShortcode = response.data;
                    }

                    //  Stop loader
                    this.isGeneratingPaymentShortcode = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isGeneratingPaymentShortcode = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
        }
    };
</script>
