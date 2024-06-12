<template>
    <!--
        Component Referece: https://flowbite.com/docs/components/modal/
     -->

    <!-- Trigger -->
    <slot name="trigger" :showModal="showModal" :hideModal="hideModal"></slot>

    <!-- Modal -->
    <div :id="modalUniqueId" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow">

                <!-- Close Modal Icon Button -->
                <button @click="hideModal" type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>

                <div class="p-4 md:p-5">

                    <!-- Modal Content -->
                    <slot name="content"></slot>

                    <div class="flex justify-end space-x-2">

                        <!-- No Button -->
                        <PrimaryButton @click="hideModal" :type="declineType">{{ declineText }}</PrimaryButton>

                        <!-- Yes Button -->
                        <PrimaryButton @click="() => approveAction(hideModal)" :type="approveType" :disabled="approveDisabled" :loading="isLoading">{{ approveText }}</PrimaryButton>

                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';

    export default {
        mixins: [UtilsMixin],
        components: { PrimaryButton },
        props: {
            isLoading: {
                type: Boolean,
                default: false
            },
            declineText: {
                type: String,
                default: 'Cancel'
            },
            approveText: {
                type: String,
                default: 'Yes'
            },
            declineType: {
                type: String,
                default: 'dark'
            },
            approveType: {
                type: String,
                default: 'danger'
            },
            approveDisabled: {
                type: Boolean,
                default: false
            },
            approveAction: {
                type: Function,
                default: () => {}
            },
            autoHide: {
                type: Boolean,
                default: true
            },
            placement: {
                type: String,
                default: 'center',
                validator: value => [
                    'top-left', 'top-center', 'top-right',
                    'center-left', 'center', 'center-right',
                    'bottom-left', 'bottom-center', 'bottom-right'
                ].includes(value)
            },
            /**
             *  Use the backdrop=static to prevent the modal from closing when clicking outside of it.
             *  This can be used with situations where you want to force the user to choose an
             *  option such as a cookie notice or when taking a survey.
             */
            backdrop: {
                type: String,
                default: 'dynamic',
                validator: value => ['static', 'dynamic'].includes(value)
            },
            backdropClasses: {
                type: String,
                default: ''
            },
            onToggle: {
                type: Function,
                default: () => {}
            },
            onShow: {
                type: Function,
                default: () => {}
            },
            onHide: {
                type: Function,
                default: () => {}
            }
        },
        data() {
            return {
                modal: null,
                modalUniqueId: this.generateUniqueId('modal')
            }
        },
        watch: {
            isLoading(newValue, oldValue) {

                if(this.autoHide && oldValue == true && newValue == false) {

                    //  Since we are done loading, let automatically close the Modal
                    this.hideModal();

                }
            }
        },
        methods: {
            showModal() {
                this.modal.show();
            },
            hideModal() {
                this.modal.hide();
            }
        },
        mounted() {
            initFlowbite();

            const $targetEl = document.getElementById(this.modalUniqueId);
            const options = {
                placement: this.placement,
                backdrop: this.backdrop,
                onToggle: this.onToggle,
                onShow: this.onShow,
                onHide: this.onHide
            };

            if (this.backdropClasses) {
                options.backdropClasses = this.backdropClasses;
            }

            if ($targetEl) {
                this.modal = new Modal($targetEl, options);
            }
        }
    };
</script>
