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

                    <div class="bg-white mx-4 px-4 rounded-xl py-4">

                        <template v-if="isShowingUssdPopup">

                            <!-- Loader -->
                            <div v-if="isSendingUssdMessage" class="flex justify-center space-x-2">
                                <SpinningLoader></SpinningLoader>
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

                                    <Button :action="startApiSimulationRequest" type="primary" size="xs" class="w-full">
                                        <span>Open Shop</span>
                                    </Button>

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

    import { v4 as uuidv4 } from 'uuid';
    import settings from '@Js/settings.js';
    import Button from '@Partials/buttons/Button.vue';
    import { postApi } from '@Repositories/api-repository.js';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';

    export default {
        inject: ['apiState', 'formState', 'storeState'],
        components: { Button, SpinningLoader },
        props: {
            msisdn: {
                type: String
            },
            initialMessage: {
                type: String
            }
        },
        data() {
            return {
                msg: '',
                content: '',
                requestType: 1,
                sessionId: uuidv4(),
                isShowingUssdPopup: false,
                isSendingUssdMessage: false,
                telcofloLaunchUssdUrl: settings.telcofloLaunchUssdUrl,
            }
        },
        watch: {
            store(newValue) {
                if(newValue) {
                    this.msg = this.initialMessage;
                    this.startApiSimulationRequest();
                }
            }
        },
        computed: {
            store() {
                return this.storeState.store;
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
                this.msg = this.initialMessage;
                this.sessionId = uuidv4();
                this.requestType = 1;
                this.content = '';
            },
            sendUssdMessage() {

                //  Start loader
                this.isSendingUssdMessage = true;

                var data = {
                    msg: this.msg,
                    test_mode: true,
                    msisdn: this.msisdn,
                    session_id: this.sessionId,
                    request_type: this.requestType
                };

                postApi(this.telcofloLaunchUssdUrl, data).then(response => {

                    if(response.status == 200) {

                        this.msg = '';
                        this.content = response.data['msg'];
                        this.requestType = response.data['request_type'];

                        this.focusOnInput();

                    }

                    //  Stop loader
                    this.isSendingUssdMessage = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSendingUssdMessage = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
            focusOnInput() {
                setTimeout(() => {
                    if( this.$refs.ussd_message_input ) this.$refs.ussd_message_input.focus();
                }, 100);
            },
        }
    };

</script>

<style scoped>

    .phone-bg {
        background-size: cover;
        background-position: center;
        background-image: url("/images/phone-wallpaper.jpg");
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
