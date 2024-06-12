<template>

    <div class="relative mx-auto border-gray-500 dark:border-gray-500 bg-gray-500 border-[8px] rounded-[1.8rem] w-min h-min">
        <div class="h-[24px] w-[4px] bg-gray-500 dark:bg-gray-500 absolute -start-[12px] top-[58px] rounded-s-sm"></div>
        <div class="h-[34px] w-[4px] bg-gray-500 dark:bg-gray-500 absolute -start-[12px] top-[100px] rounded-s-sm"></div>
        <div class="h-[34px] w-[4px] bg-gray-500 dark:bg-gray-500 absolute -start-[12px] top-[144px] rounded-s-sm"></div>
        <div class="h-[48px] w-[4px] bg-gray-500 dark:bg-gray-500 absolute -end-[12px] top-[114px] rounded-e-sm"></div>
        <div class="rounded-[1.5rem] overflow-hidden w-[220px] h-[455px] bg-white dark:bg-gray-500">

            <div class="relative flex items-center w-full h-full pb-40 phone-bg">

                <div class="absolute z-10 top-0 left-0 right-0 bottom-0 phone-blur-effect"></div>

                <div class="relative z-20 w-full">

                    <div class="bg-white mx-4 px-4 rounded-xl py-4 rise-up-animation">

                        <template v-if="isShowingUssdPopup">

                            <!-- Loader -->
                            <div v-if="isSendingUssdMessage" class="flex justify-center space-x-2">
                                <SpiningLoader></SpiningLoader>
                                <span class="text-xs">Running...</span>
                            </div>

                            <template v-else>

                            <!-- Ussd Message -->
                            <p class="text-xs whitespace-pre-wrap">{{ content }}</p>

                            <!-- Ussd Reply Input -->
                            <input type="text" v-model="msg" ref="ussd_message_input" class="ussd_message_input" @keypress.enter="startApiSimulationRequest()" @keyup.esc="stopUssdSimulator()" />

                            <!-- Cancel / Send Buttons -->
                            <div class="flex justify-center items-center space-x-6 mt-2">
                                <p @click="stopUssdSimulator" class="text-xs cursor-pointer hover:opacity-50">Cancel</p>
                                <p>|</p>
                                <p @click="sendUssdMessage" class="text-xs cursor-pointer hover:opacity-50">Send</p>
                            </div>

                            </template>

                        </template>

                        <slot v-else>
                            <div>
                                <div class="text-xs text-center">
                                    <div class="text-2xl">🤩</div>
                                    <div>Let's visit your store</div>
                                </div>

                                <div class="flex justify-end mt-4">

                                    <PrimaryButton :action="startApiSimulationRequest" class="w-40" size="xs" type="success">
                                        <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path fill-rule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" clip-rule="evenodd" />
                                            <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
                                        </svg>

                                        <span class="mr-2">Open Shop</span>
                                    </PrimaryButton>

                                </div>

                            </div>
                        </slot>

                    </div>

                </div>

            </div>


        </div>
    </div>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useApiState } from '@Stores/api-store.js';
    import { postApi } from '@Repositories/api-repository.js';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';

    export default {
        mixins: [FormMixin],
        components: { PrimaryButton, SpiningLoader },
        props: {
            initialMessage: {
                type: String,
                default : ''
            }
        },
        data() {
            return {
                msg: '',
                content: '',
                requestType: 1,
                sessionId: null,
                apiState: useApiState(),
                isShowingUssdPopup: false,
                isSendingUssdMessage: false
            }
        },
        methods: {
            startApiSimulationRequest() {
                if(!this.isSendingUssdMessage) {
                    this.isShowingUssdPopup = true;
                    this.sendUssdMessage();
                }
            },
            stopUssdSimulator() {
                this.isShowingUssdPopup = false;
                this.resetUssdSimulator();
            },
            resetUssdSimulator() {
                this.sessionId = null;
                this.requestType = 1;
                this.content = '';
                this.msg = '';
            },
            sendUssdMessage() {

                //  Start loader
                this.isSendingUssdMessage = true;

                var data = {
                    msg: this.msg,
                    sessionId: this.sessionId,
                    requestType: this.requestType
                };

                postApi(this.apiState.apiHome['_links']['launchUssd'], data).then(response => {

                    if(response.status == 200) {

                        this.msg = '';
                        this.content = response.data['body']['msg'];
                        this.sessionId = response.data['body']['sessionId'];
                        this.requestType = response.data['body']['requestType'];

                        this.focusOnInput();

                    }

                    //  Stop loader
                    this.isSendingUssdMessage = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSendingUssdMessage = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            focusOnInput() {
                setTimeout(() => {
                    if( this.$refs.ussd_message_input ) this.$refs.ussd_message_input.focus();
                }, 100);
            },
        },
        created() {
            if(this.initialMessage != '') {
                this.msg = this.initialMessage;
            }
        }
    };

</script>

<style scoped>

    .phone-bg {
        background-size: cover;
        background-position: center;
        background-image: url("../../images/phone-wallpaper.jpg");
    }

    .ussd_message_input {
        padding: 0;
        width: 100%;
        border: none;
        border-radius: 0;
        box-shadow: none;
        font-size: 0.75rem;
        line-height: 0.8rem;
        background: transparent;
        box-shadow:none !important;
        padding: 4px 0;
        border-bottom: 2px solid #11d8b3 !important;
    }

</style>
