<template>

    <div class="pt-24 pb-60 px-20 relative">

        <div class="relative">

            <h1 class="text-2xl text-center font-bold text-gray-800 mb-4">Your Offline Store is Ready!</h1>
            <p class="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
                No Internet? No Problem! Customers Can Still Shop
            </p>

            <div class="flex justify-center space-x-8 mb-8">
            </div>

            <div class="grid grid-cols-2 gap-8">

                <div class="bg-white p-6 shadow-sm rounded-xl">

                    <div class="space-y-4 mb-8">

                        <!-- Mobile Number Input -->
                        <LineSkeleton v-if="isLoadingStore" width="w-32" :shine="true"></LineSkeleton>
                        <MobileNumberInput
                            v-else
                            label="Mobile Number"
                            v-model="storeForm.ussdMobileNumber"
                            :errorText="getFormError('ussdMobileNumber')"
                            :description="ussdMobileNumberWithoutExtension ? `Customers dial *250*${ussdMobileNumberWithoutExtension}# to access your store` : 'Enter your mobile number to create your shortcode'">
                        </MobileNumberInput>

                        <!-- Call To Action Input -->
                        <LineSkeleton v-if="isLoadingStore" width="w-32" :shine="true"></LineSkeleton>
                        <TextInput
                            v-else
                            maxlength="20"
                            label="Call To Action"
                            placeholder="Order pizza"
                            v-model="storeForm.callToAction"
                            :errorText="getFormError('callToAction')"
                            description="The call to action to start the shopping experience on USSD">
                        </TextInput>

                    </div>

                    <div class="space-y-4 mb-8">

                        <h2 class="font-bold text-gray-700">🌍 Where Your Store is Available</h2>
                        <p class="text-sm text-gray-600">Your store can be accessed in these countries using the listed shortcodes:</p>
                        <div class="text-sm overflow-x-auto">
                            <table class="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
                                <thead>
                                    <tr class="bg-gray-100 border-b">
                                        <th class="px-6 py-3 text-left text-gray-600">Country</th>
                                        <th class="px-6 py-3 text-left text-gray-600">Customer's Dial</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(country, index) in (isLoadingStore ? [1,2,3] : countries)" :key="index" class="border-b hover:bg-gray-50">
                                        <td class="space-x-2 px-6 py-3">
                                            <LineSkeleton v-if="isLoadingStore" width="w-32" :shine="true"></LineSkeleton>
                                            <div v-else class="flex items-center space-x-2">
                                                <span class="text-xl">{{ country.flag }}</span>
                                                <span>{{ country.name }}</span>
                                            </div>
                                        </td>
                                        <td class="px-6 py-3">
                                            <LineSkeleton v-if="isLoadingStore" width="w-32" :shine="true"></LineSkeleton>
                                            <span v-else>{{ country.shortcode }}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

                <div class="animated-border-blue p-6 shadow-sm rounded-xl">
                    <div class="space-y-4 mb-8">
                        <h2 class="text-lg font-semibold text-gray-700">Experience Your Offline Store</h2>
                        <p class="text-sm text-gray-600">See your store through your customers' eyes. Use the virtual phone below to explore the shopping journey.</p>

                        <LineSkeleton v-if="isLoadingStore" width="w-32" :shine="true"></LineSkeleton>
                        <div v-else class="flex items-center space-x-2">
                            <span class="text-sm">Customers in</span>
                            <SelectInput
                                v-model="country">
                                <option v-for="(country, index) in countries" :value="country.name" :key="index">
                                    {{ country.name }}
                                </option>
                            </SelectInput>
                        </div>

                    </div>

                    <VirtualPhone msisdn="26772882239" :initialMessage="'*250#'"></VirtualPhone>
                </div>

            </div>

        </div>

        <!-- Clouds Image -->
        <img src="/images/clouds.png" class="absolute top-0">

    </div>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useAuthState } from '@Stores/auth-store.js';
    import { useStoreState } from '@Stores/store-store.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import SelectInput from '@Partials/inputs/SelectInput.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import { parsePhoneNumberFromString } from 'libphonenumber-js';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';
    import VirtualPhone from '@Pages/stores/store/offline/virtual-phone/VirtualPhone.vue';

    export default {
        mixins: [FormMixin],
        components: {
            TextInput, SelectInput, LineSkeleton, MobileNumberInput, VirtualPhone
        },
        data() {
            return {
                country: 'Botswana',
                authState: useAuthState(),
                storeState: useStoreState()
            };
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            storeForm() {
                return this.storeState.storeForm;
            },
            authUser() {
                return this.authState.user;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            },
            countries() {
                return [
                    {
                        flag: '🇧🇼',
                        name: 'Botswana',
                        shortcode: this.ussdMobileNumberWithoutExtension ? `*250*${this.ussdMobileNumberWithoutExtension}#` : '*250#',
                    }
                ]
            },
            ussdMobileNumberWithoutExtension() {
                if(this.storeForm && this.storeForm.ussdMobileNumber) {
                    const phoneNumber = parsePhoneNumberFromString(this.storeForm.ussdMobileNumber);
                    let nationalNumber =  phoneNumber.formatNational();
                    return nationalNumber.replace(/\s+/g, '');
                }
                return '';
            },
        },
    };

</script>
