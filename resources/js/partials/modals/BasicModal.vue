<template>
    <slot name="trigger" :showModal="showModal" :hideModal="hideModal"></slot>

    <transition name="modal" mode="out-in">
        <div v-if="isOpen || isClosing" :id="modalUniqueId" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="bg-white rounded-xl relative">

                    <!-- Close Modal Icon Button -->
                    <button @click="hideModal" type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>

                    <div class="p-4 md:p-5">
                        <!-- Modal Content -->
                        <slot name="content" :showModal="showModal" :hideModal="hideModal"></slot>
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { initFlowbite, Modal } from 'flowbite';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';

    export default {
        mixins: [UtilsMixin],
        props: {
            placement: {
                type: String,
                default: 'center',
                validator: value => [
                    'top-left', 'top-center', 'top-right',
                    'center-left', 'center', 'center-right',
                    'bottom-left', 'bottom-center', 'bottom-right'
                ].includes(value)
            },
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
                isOpen: false,
                isClosing: false,
                modalUniqueId: this.generateUniqueId('modal'),
            };
        },
        watch: {
            // Watch for changes to `isOpen` and initialize the modal when it becomes true
            isOpen(newVal) {
                if (newVal) {
                    this.$nextTick(() => {
                        if (!this.isInitialized) this.initializeModal();
                        this.modal.show();
                    });
                } else {
                    this.modal.hide();
                }
            }
        },
        methods: {
            showModal() {
                this.isOpen = true;
                this.isClosing = false;
            },
            hideModal() {
                this.isOpen = false;
                this.isClosing = true;
            },
            initializeModal() {
                // Initialize the modal once the element is rendered
                const $targetEl = document.getElementById(this.modalUniqueId);
                if ($targetEl) {
                    const options = {
                        placement: this.placement,
                        backdrop: this.backdrop,
                        onToggle: this.onToggle,
                        onShow: () => {
                            this.onShow();
                        },
                        onHide: () => {
                            this.isClosing = false;
                            this.onHide();
                        }
                    };

                    if (this.backdropClasses) {
                        options.backdropClasses = this.backdropClasses;
                    }

                    this.modal = new Modal($targetEl, options);
                }
            }
        },
        mounted() {
            initFlowbite();
        }
    };
</script>

<style scoped>
    /* Optional: Add custom transition effects */
    .modal {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
</style>
