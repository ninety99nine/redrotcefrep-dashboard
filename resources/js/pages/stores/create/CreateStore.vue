<template>

    <div>

        <div class="max-w-lg mx-auto pt-20 mb-8">

            <!-- Quick Start Guide (Heading) -->
            <h1 class="text-lg font-bold">Create Your Store</h1>

            <!-- Quick Start Guide (Instructions) -->
            <p class="text-sm text-gray-500">
                <span class="mr-2">It only takes a minute to create one</span>
                <span class="text-lg">🙌</span>
            </p>

        </div>

        <div class="max-w-lg mx-auto border border-gray-200 rounded-lg shadow p-6">

            <!-- Profile Form -->
            <form action="#" method="POST">

                <div class="space-y-4">

                    <!-- General Error Info Alert -->
                    <Alert v-if="getFormError('general')" type="warning">
                        {{ getFormError('general') }}
                    </Alert>

                    <!-- Name Input -->
                    <TextInput v-model="name"
                        label="Name"
                        _placeholder="Baby Cakes 🧁"
                        _autocomplete="organization"
                        :errorText="getFormError('name')" @keydown.enter="createStore"
                        labelPopoverTitle="What Is This?"
                        labelPopoverDescription="The name of your store e.g Baby Cakes 🧁">
                    </TextInput>

                    <!-- Description Textarea -->
                    <TextareaInput v-model="description"
                        label="Description" _placeholder="The sweetest cakes in the world 🍰" :_rows="2"
                        :errorText="getFormError('description')" @keydown.enter="createStore"
                        labelPopoverTitle="What Is This?"
                        labelPopoverDescription="A short and sweet description of your store e.g The sweetest cakes in the world 🍰">
                    </TextareaInput>

                    <!-- Mobile Number Input -->
                    <MobileNumberInput v-model="mobileNumber"
                        :errorText="getFormError('mobileNumber')" @keydown.enter="createStore"
                        labelPopoverTitle="What Is This?"
                        labelPopoverDescription="The mobile number that will be used by customers as the primary contact number of your store">
                    </MobileNumberInput>

                </div>

                <div class="px-20 mt-8">

                    <!-- Create Store Button -->
                    <PrimaryButton :action="createStore" :loading="isSubmitting" class="w-full">
                        Create Store
                    </PrimaryButton>

                </div>

            </form>

        </div>
    </div>

</template>

<script>

    import { initFlowbite } from "flowbite";
    import Alert from '@Partials/alerts/Alert.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useAuthState } from '@Stores/auth-store.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import TextareaInput from '@Partials/inputs/TextareaInput.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import { createStore } from '@Repositories/store-repository.js';
    import { useNotificationState } from '@Stores/notification-store.js';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: {
            Alert, TextInput, TextareaInput, PrimaryButton, MobileNumberInput,
        },
        data() {
            return {
                name: '',
                description: '',
                mobileNumber: '',
                isSubmitting: false,
                authState: useAuthState(),
                notificationState: useNotificationState(),
            }
        },
        methods: {
            createStore() {

                /**
                 *  Note: the hideFormErrors() method is part of the FormMixin methods
                 */
                this.hideFormErrors();

                /**
                 *  Note: the setFormError() method is part of the FormMixin methods
                 */
                if(this.name.trim() == '') {

                    this.setFormError('name', 'Enter store name');

                }else if(this.mobileNumber.trim() == '') {

                    this.setFormError('mobileNumber', 'Enter store mobile number');

                }else {

                    let data = {
                        name: this.name,
                        description: this.description,
                        mobileNumber: this.mobileNumber,
                    }

                    if(typeof this.description === 'string' && this.description.trim() == '') {
                        data['description'] = null;
                    }

                    //  Start loader
                    this.isSubmitting = true;

                    createStore(data).then(response => {

                        if(response.status == 201) {

                            //  Stop loader
                            this.isSubmitting = false;

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Store created!');

                            //  Navigate to dashboard
                            this.$router.replace({ name: 'dashboard', query: { createdStore: true } });

                        }

                    }).catch(errorException => {

                        this.isSubmitting = false;

                        /**
                         *  Note: the setServerFormErrors() method is part of the FormMixin methods
                         */
                        this.setServerFormErrors(errorException);

                    });

                }
            }
        },
        mounted() {

            /**
             *  Flowbite javascript will not work unless we deliberately
             *  Initialize Flowbite on mount of the Vue component.
             *
             *  Reference: https://stackoverflow.com/questions/76043935/flowbite-is-not-working-with-inertia-laravel-app
             */
            initFlowbite();

        },
        created() {
            this.mobileNumber = this.authState.user.mobileNumber.withExtension;
        }
    };

</script>
