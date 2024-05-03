<template>

    <div class="px-16 pt-8">

        <div class="flex min-h-full flex-col justify-center">

            <div class="sm:mx-auto sm:w-full sm:max-w-lg p-4 border border-gray-200 rounded-lg shadow sm:p-6">

                <!-- Profile Photo -->
                <StoreLogo :store="store" class="mx-auto" width="w-40" height="h-40"></StoreLogo>

                <!-- Profile Form -->
                <form class="mt-10" action="#" method="POST">

                    <div class="space-y-4">

                        <!-- General Error Info Alert -->
                        <WarningAlert v-if="getFormError('general')">
                            {{ getFormError('general') }}
                        </WarningAlert>

                        <!-- Text Heading -->
                        <div class="flex items-center space-x-2 my-6 text-sm text-gray-500">
                            <span class="text-2xl text-gray-400">#</span>
                            <span class="whitespace-nowrap">Basic Settings</span>
                            <div class="w-full border"></div>
                        </div>

                        <!-- Online Toggle Switch -->
                        <ToogleSwitch v-model="online" size="md"
                            labelPopoverTitle="What Is This?"
                            labelPopoverDescription="Turn on so that your store is online (Made available to customers). Turn off so that your store is offline (Not available to customers)">
                            Online
                        </ToogleSwitch>

                        <!-- Description Textarea -->
                        <TextareaInput v-if="!online" v-model="offlineMessage"
                            label="Offline Message" _placeholder="Closed for the holidays"
                            :_rows="2" :errorText="getFormError('offlineMessage')" @keydown.enter="updateStore"
                            labelPopoverTitle="What Is This?"
                            labelPopoverDescription="The message to show to customers who visit your store while its offline (Not available to customers)">
                        </TextareaInput>

                        <!-- Name Input -->
                        <TextInput v-model="name"
                            label="Name" _placeholder="Baby Cakes 🧁"
                            :errorText="getFormError('name')" @keydown.enter="updateStore"
                            labelPopoverTitle="What Is This?"
                            labelPopoverDescription="The name of your store e.g Baby Cakes 🧁">
                        </TextInput>

                        <!-- Description Textarea -->
                        <TextareaInput v-model="description"
                            label="Description" _placeholder="The sweetest cakes in the world 🍰" :_rows="2"
                            :errorText="getFormError('description')" @keydown.enter="updateStore"
                            labelPopoverTitle="What Is This?"
                            labelPopoverDescription="A short and sweet description of your store e.g The sweetest cakes in the world 🍰">
                        </TextareaInput>

                        <!-- Mobile Number Input -->
                        <MobileNumberInput v-model="mobileNumber"
                            :errorText="getFormError('mobileNumber')" @keydown.enter="updateStore"
                            labelPopoverTitle="What Is This?"
                            labelPopoverDescription="The mobile number that will be used by customers as the primary contact number of your store">
                        </MobileNumberInput>

                    </div>

                    <!-- Text Heading -->
                    <div class="flex items-center space-x-2 my-6 text-sm text-gray-500">
                        <span class="text-2xl text-gray-400">#</span>
                        <span class="whitespace-nowrap">Delivery / Pickup Settings</span>
                        <div class="w-full border"></div>
                    </div>

                    <div class="space-y-4">

                        <!-- Allow Delivery Toggle Switch -->
                        <ToogleSwitch v-model="allowDelivery" size="md"
                            labelPopoverTitle="What Is This?"
                            labelPopoverDescription="Turn on so that your store supports delivery (Customers need to provide delivery information). Turn off so that your store does not support delivery (Customers do not need to provide delivery information).">

                            <div class="flex items-center space-x-2">
                                <span>Allow Delivery</span>
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                </svg>
                            </div>

                        </ToogleSwitch>

                        <!-- Delivery Settings -->
                        <template v-if="allowDelivery">

                            <!-- Delivery Note Textarea -->
                            <TextareaInput v-model="deliveryNote"
                                label="Delivery Note" _placeholder="We deliver only on weekends 🍰" :_rows="2"
                                :errorText="getFormError('deliveryNote')" @keydown.enter="updateStore"
                                labelPopoverTitle="What Is This?"
                                labelPopoverDescription="Delivery related message to show to customers before placing their order e.g We deliver only on weekends 🍰">
                            </TextareaInput>

                            <!-- Allow Free Delivery Toggle Switch -->
                            <ToogleSwitch v-model="allowFreeDelivery" size="md"
                                labelPopoverTitle="What Is This?"
                                labelPopoverDescription="Turn on so that your store supports free delivery on all destinations (Customers will not be charged delivery fees on any destination). Turn off so that your store does not support free delivery for all destinations">
                                Allow Free Delivery
                            </ToogleSwitch>

                            <!-- Info Alert -->
                            <InfoAlert v-if="allowFreeDelivery">
                                Delivery to all destinations is <span class="font-bold">Free</span>
                            </InfoAlert>

                            <!-- Delivery Flat Fee Money Input -->
                            <MoneyInput v-else v-model="deliveryFlatFee"
                                label="Flat Fee" :errorText="getFormError('deliveryFlatFee')" @keydown.enter="updateStore"
                                labelPopoverTitle="What Is This?"
                                labelPopoverDescription="Set the delivery flat fee for all delivery destinations. This means that the same fee set here will be used as the delivery fee for all delivery destinations.">
                            </MoneyInput>

                            <!-- Info Alert -->
                            <InfoAlert v-if="!allowFreeDelivery && isValidMoney(deliveryFlatFee) && deliveryFlatFee != '0'" class="flex space-x-2">
                                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                </svg>
                                <span>Delivery to all destinations is charged <span class="font-bold">P{{ twoDecimalPlaces(deliveryFlatFee) }}</span></span>
                            </InfoAlert>

                            <!-- Delivery Destination Tags -->
                            <InputTags :key="deliveryDestinationNames"  :tags="deliveryDestinationNames" @onTagsChanged="addDeliveryDestinations"
                                label="Delivery destinations" :errorText="getFormError('deliveryDestinations')"
                                labelPopoverTitle="What Is This?"
                                labelPopoverDescription="These are the delivery destinations that customers are allowed to choose from when placing an order e.g Gaborone, Phakalane, Tlokweng. Press comma , or press Enter ⏎ after typing a location so that your option is captured."
                            />

                            <!-- Delivery Destinations Table -->
                            <div v-if="deliveryDestinationNames.length" class="border rounded-lg p-2">
                                <table class="w-full text-xs">
                                    <thead>
                                        <tr class="bg-gray-200">
                                            <td class="py-2 px-2">Destination</td>
                                            <td class="py-2 px-2">Delivery Fee</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(deliveryDestination, index) in deliveryDestinations" :key="index" class="border-t">
                                            <td class="p-2">

                                                <!-- Delivery Destination Physical Address -->
                                                <div class="flex items-center space-x-1">
                                                    <svg class="w-3 h-3 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                    </svg>

                                                    <!-- Name Input -->
                                                    <TextInput v-model="deliveryDestinations[index].name"
                                                        label="" _placeholder="Phakalane"
                                                        :errorText="getFormError('deliveryDestinations'+index+'Name')" @keydown.enter="updateStore"
                                                        labelPopoverTitle="What Is This?"
                                                        labelPopoverDescription="The name of your delivery location e.g Phakalane">
                                                    </TextInput>
                                                </div>

                                            </td>
                                            <td class="p-2">

                                                <!-- Free Delivery -->
                                                <div v-if="allowFreeDelivery" class="flex items-center space-x-2">

                                                    <span class="text-xs text-green-500 font-bold">Free Delivery</span>

                                                    <!-- More Info Popover -->
                                                    <MoreInfoPopover
                                                        placement="top"
                                                        title="Why Free Delivery?"
                                                        description="Delivery to this destination is Free because you turned on the Allow Free Delivery option above. This option applies Free delivery to all your destinations.">
                                                    </MoreInfoPopover>

                                                </div>

                                                <!-- Cost -->
                                                <span v-else-if="deliveryFlatFee != '0'" class="text-xs text-green-500 font-bold">P{{ twoDecimalPlaces(deliveryFlatFee) }} (Flat Free)</span>

                                                <div v-else class="w-full">

                                                    <!-- Cancelled Cost -->
                                                    <p v-if="deliveryDestination.allowFreeDelivery" class="line-through text-xs text-gray-400">P{{ twoDecimalPlaces(deliveryDestination.cost) }}</p>

                                                    <!-- Delivery Flat Fee Money Input -->
                                                    <MoneyInput v-else v-model="deliveryDestination.cost"
                                                        label="" size="sm" :errorText="getFormError('deliveryDestinations'+index+'Cost')" @keydown.enter="updateStore"
                                                        labelPopoverTitle="What Is This?"
                                                        :labelPopoverDescription="'Set the delivery flat fee for '+deliveryDestination.name+'. This means that delivery to '+deliveryDestination.name+' is will be charged P'+twoDecimalPlaces(deliveryDestination.cost)+'.'">
                                                    </MoneyInput>

                                                    <!-- Allow Free Delivery Toggle Switch -->
                                                    <ToogleSwitch v-model="deliveryDestination.allowFreeDelivery" size="sm"
                                                        labelPopoverTitle="What Is This?"
                                                        :labelPopoverDescription="'Turn on so that your store supports free delivery to '+deliveryDestination.name+'. Turn off so that your store does not support free delivery to '+deliveryDestination.name+'.'"
                                                        class="mt-2">Allow Free Delivery
                                                    </ToogleSwitch>

                                                </div>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </template>

                        <!-- Allow Pickup Toggle Switch -->
                        <ToogleSwitch v-model="allowPickup" size="md"
                            labelPopoverTitle="What Is This?"
                            labelPopoverDescription="Turn on so that your store supports pickups (Customers need to pickup their orders at your physical locations). Turn off so that your store does not support pickups (Customers do not need to pickup their orders at your physical locations).">

                            <span>Allow Pickup</span>

                        </ToogleSwitch>

                        <!-- Pickup Settings -->
                        <template v-if="allowPickup">

                            <!-- Pickup Note Textarea -->
                            <TextareaInput v-model="pickupNote" label="Pickup Note" _placeholder="Pickups are only before 6pm" :_rows="2" :errorText="getFormError('pickupNote')" @keydown.enter="updateStore"
                                labelPopoverTitle="What Is This?"
                                labelPopoverDescription="Pickup related message to show to customers before placing their order e.g Pickups are only before 6pm">
                            </TextareaInput>

                            <!-- Pickup Destination Tags -->
                            <InputTags :tags="pickupDestinationNames" @onTagsChanged="addPickupDestinations" label="Pickup destinations"
                                labelPopoverTitle="What Is This?" :errorText="getFormError('pickupDestinations')"
                                labelPopoverDescription="These are the pickup destinations that customers are allowed to choose from when collecting their order from your physical locations e.g Gaborone, Phakalane, Tlokweng. Press comma , or press Enter ⏎ after typing a location so that your option is captured."
                            />

                            <!-- Pickup Destinations Table -->
                            <div v-if="pickupDestinationNames.length" class="border rounded-lg p-2">
                                <table class="w-full text-xs">
                                    <thead>
                                        <tr class="bg-gray-200">
                                            <td class="py-2 px-2">Destination</td>
                                            <td class="py-2 px-2">Address</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(pickupDestination, index) in pickupDestinations" :key="index" class="border-t">
                                            <td class="p-2">

                                                <!-- Pickup Destination Name -->
                                                <div class="flex items-center space-x-1">
                                                    <svg class="w-3 h-3 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                    </svg>

                                                    <!-- Name Input -->
                                                    <TextInput v-model="pickupDestinations[index].name"
                                                        label="" _placeholder="Phakalane"
                                                        :errorText="getFormError('pickupDestinations'+index+'Name')" @keydown.enter="updateStore"
                                                        labelPopoverTitle="What Is This?"
                                                        labelPopoverDescription="The name of your pickup location e.g Phakalane">
                                                    </TextInput>

                                                </div>

                                            </td>
                                            <td class="p-2">

                                                <!-- Pickup Destination Address Input -->
                                                <TextareaInput
                                                    labelPopoverTitle="What Is This?"
                                                    v-model="pickupDestination.address"
                                                    _placeholder="CBD, Plot 123, Office 1" :_rows="1"
                                                    :errorText="getFormError('pickupDestinations'+index+'Address')" @keydown.enter="updateStore"
                                                    labelPopoverDescription="Pickup location address e.g CBD, Plot 123, Office 1">
                                                </TextareaInput>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </template>

                    </div>

                    <!-- Text Heading -->
                    <div class="flex items-center space-x-2 my-6 text-sm text-gray-500">
                        <span class="text-2xl text-gray-400">#</span>
                        <span class="whitespace-nowrap">Payment Settings</span>
                        <div class="w-full border"></div>
                    </div>

                    <!-- Spining Loader -->
                    <div v-if="isLoadingAvailablePaymentMethods || isLoadingSupportedPaymentMethods" class="flex justify-center">
                        <SpiningLoader></SpiningLoader>
                    </div>

                    <template v-if="!isLoadingAvailablePaymentMethods && !isLoadingSupportedPaymentMethods">

                        <!-- Payment Method Tags -->
                        <SelectInputTags :tags="selectedPaymentMethodOptions" :selectableTags="availablePaymentMethodOptions" @onTagsChanged="addSupportedPaymentMethods" label="Payment Methods"
                            labelPopoverTitle="What Is This?" :errorText="getFormError('supportedPaymentMethods')"
                            labelPopoverDescription="These are the payment methods supported by your store"
                        />

                        <template v-if="selectedPaymentMethodOptions.length">

                            <!-- Info Alert -->
                            <InfoAlert class="flex space-x-2 mt-4">
                                <span>Add instructions to help customers understand how they can pay for their orders using the payment methods you offer</span>
                            </InfoAlert>

                            <div class="border rounded-lg p-2">

                                <table class="w-full text-xs">
                                    <thead>
                                        <tr class="bg-gray-200">
                                            <td class="py-2 px-2">Payment Method</td>
                                            <td class="py-2 px-2">Instruction</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(supportedPaymentMethod, index) in supportedPaymentMethods" :key="index" class="border-t">
                                            <td class="p-2">

                                                <!-- Supported Payment Method Name -->
                                                <div class="flex items-center space-x-1">
                                                    <svg :class="['w-3 h-3', supportedPaymentMethod.active ? 'text-green-400' : 'text-gray-400']" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                                    </svg>

                                                    <!-- Name Input -->
                                                    <span :class="{ 'text-gray-400': !supportedPaymentMethod.active }">{{ supportedPaymentMethod.name }}</span>

                                                </div>

                                            </td>
                                            <td class="p-2">

                                                <!-- Supported Payment Method Active Toggle Switch -->
                                                <ToogleSwitch v-model="supportedPaymentMethods[index].active" size="sm"
                                                    labelPopoverTitle="What Is This?"
                                                    :labelPopoverDescription="'Turn on so that your store supports payment using '+supportedPaymentMethod.name+'. Turn off so that your store does not support payment using '+supportedPaymentMethod.name+'.'"
                                                    class="mt-2">Active
                                                </ToogleSwitch>

                                                <!-- Supported Payment Method Instruction -->
                                                <TextareaInput
                                                    labelPopoverTitle="What Is This?"
                                                    v-model="supportedPaymentMethods[index].instruction"
                                                    :_placeholder="'How to pay using '+supportedPaymentMethod.name" :_rows="1"
                                                    :errorText="getFormError('pickupDestinations'+index+'Instruction')"
                                                    :labelPopoverDescription="'Short and sweet instructions for how your customers can pay using '+supportedPaymentMethod.name">
                                                </TextareaInput>

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>

                        </template>

                    </template>

                    <div class="space-y-4 mt-8">

                        <!-- Perfect Pay Enabled Toggle Switch -->
                        <ToogleSwitch v-model="perfectPayEnabled" size="md"
                            labelPopoverTitle="What Is This?"
                            labelPopoverDescription="Turn on so that your store supports Perfect Pay payments (Perfect Order receives payments on your behalf and settles your preffered banking account based on your agreed settlement cycle)">

                            <span>Enable Perfect Pay</span>

                        </ToogleSwitch>

                        <template v-if="!perfectPayEnabled">

                            <!-- Orange Money Payment Enabled Toggle Switch -->
                            <ToogleSwitch v-model="orangeMoneyPaymentEnabled" size="md"
                                labelPopoverTitle="What Is This?"
                                labelPopoverDescription="Turn on so that your store supports Orange Money payments (Payments are sent directly to your Orange Money merchant wallet)">

                                <span>Enable Orange Money Payments</span>

                            </ToogleSwitch>

                            <!-- Orange Money Merchant Code Input -->
                            <PasswordInput v-if="orangeMoneyPaymentEnabled" v-model="orangeMoneyMerchantCode"
                                label="Orange Money Merchant Code" _placeholder="xxxxxx"
                                :showForgotPassword="false" :errorText="getFormError('orangeMoneyMerchantCode')"
                                @keydown.enter="updateStore" labelPopoverTitle="What Is This?"
                                labelPopoverDescription="The Orange Money merchant code used to identify your settlement wallet">
                            </PasswordInput>

                            <!-- DPO Payment Enabled Toggle Switch -->
                            <ToogleSwitch v-model="dpoPaymentEnabled" size="md"
                                labelPopoverTitle="What Is This?"
                                labelPopoverDescription="Turn on so that your store supports Direct Pay Online payments (Payments are sent directly to your DPO settlement account)">

                                <span>Enable DPO Payments</span>

                            </ToogleSwitch>

                            <!-- DPO Company Token Input -->
                            <PasswordInput v-if="dpoPaymentEnabled" v-model="dpoCompanyToken"
                                label="DPO Company Token" _placeholder="xxxxxxxxxxxxxxxxxx"
                                :showForgotPassword="false" :errorText="getFormError('dpoCompanyToken')"
                                @keydown.enter="updateStore" labelPopoverTitle="What Is This?"
                                labelPopoverDescription="The DPO Company Token used to identify your settlement account">
                            </PasswordInput>

                        </template>

                    </div>

                    <!-- Text Heading -->
                    <div class="flex items-center space-x-2 my-6 text-sm text-gray-500">
                        <span class="text-2xl text-gray-400">#</span>
                        <span class="whitespace-nowrap">Deposit Settings</span>
                        <div class="w-full border"></div>
                    </div>

                    <!-- Allow Deposit Toggle Switch -->
                    <ToogleSwitch v-model="allowDepositPayments" size="md"
                        labelPopoverTitle="What Is This?"
                        labelPopoverDescription="Turn on so that your store supports deposits (Customers can choose to pay a deposit instead of an upfront full payment)">
                        <span>Allow Deposit</span>
                    </ToogleSwitch>

                    <div v-if="allowDepositPayments" class="mt-4">

                        <!-- Spining Loader -->
                        <div v-if="isLoadingAvailableDepositPercentages" class="flex justify-center">
                            <SpiningLoader></SpiningLoader>
                        </div>

                        <!-- Supported Deposit Percentage Tags -->
                        <SelectInputTags v-else :tags="selectedDepositPercentageOptions" :selectableTags="availableDepositPercentageOptions" @onTagsChanged="addDepositPercentages" label="Deposit Percentages"
                            labelPopoverTitle="What Is This?" :errorText="getFormError('depositPercentages')"
                            labelPopoverDescription="These are the percetages that customers can choose from when making a deposit payment instead of a full payment"
                        />

                    </div>

                    <!-- Text Heading -->
                    <div class="flex items-center space-x-2 my-6 text-sm text-gray-500">
                        <span class="text-2xl text-gray-400">#</span>
                        <span class="whitespace-nowrap">Installment Settings</span>
                        <div class="w-full border"></div>
                    </div>

                    <!-- Allow Installment Toggle Switch -->
                    <ToogleSwitch v-model="allowInstallmentPayments" size="md"
                        labelPopoverTitle="What Is This?"
                        labelPopoverDescription="Turn on so that your store supports installments (Customers can choose to pay using split payments e.g 25% installaments until payment is cleared)">
                        <span>Allow Installments</span>
                    </ToogleSwitch>

                    <div v-if="allowInstallmentPayments" class="mt-4">

                        <!-- Spining Loader -->
                        <div v-if="isLoadingAvailableInstallmentPercentages" class="flex justify-center">
                            <SpiningLoader></SpiningLoader>
                        </div>

                        <!-- Supported Installment Percentage Tags -->
                        <SelectInputTags v-else :tags="selectedInstallmentPercentageOptions" :selectableTags="availableInstallmentPercentageOptions" @onTagsChanged="addInstallmentPercentages" label="Installment Percentages"
                            labelPopoverTitle="What Is This?" :errorText="getFormError('installmentPercentages')"
                            labelPopoverDescription="These are the percetages that customers can choose from when making a installment payment instead of a full payment"
                        />

                    </div>

                    <!--
                        Note: the hasErrors() method is part of the FormMixin methods
                    -->
                    <WarningAlert v-if="hasErrors" class="flex items-center space-x-2 mt-4">
                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <span>Check your fields</span>
                    </WarningAlert>

                    <div class="px-20 mt-8">

                        <!-- Save Changes Button -->
                        <PrimaryButton :action="updateStore" :loading="isSubmitting">
                            Save Changes
                        </PrimaryButton>

                    </div>

                </form>

            </div>

        </div>

    </div>

</template>

<script>

    import { initFlowbite } from "flowbite";
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import InfoAlert from '@Partials/alerts/InfoAlert.vue';
    import InputTags from '@Partials/inputs/InputTags.vue';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import StoreLogo from '@Components/store/StoreLogo.vue';
    import MoneyInput from '@Partials/inputs/MoneyInput.vue';
    import WarningAlert from '@Partials/alerts/WarningAlert.vue';
    import ProfilePhoto from '@Components/user/ProfilePhoto.vue';
    import PasswordInput from '@Partials/inputs/PasswordInput.vue';
    import TextareaInput from '@Partials/inputs/TextareaInput.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import SelectInputTags from '@Partials/inputs/SelectInputTags.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { useNotificationState } from '@Stores/notification-store.js';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import { updateStore, getAvailablePaymentMethods, getSupportedPaymentMethods, getAvailableDepositPercentages, getAvailableInstallmentPercentages } from '@Repositories/store-repository.js';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: {
            InfoAlert, InputTags, TextInput, TextHeader, StoreLogo, MoneyInput, WarningAlert, PasswordInput,
            TextareaInput, PrimaryButton, SelectInputTags, MoreInfoPopover, ProfilePhoto, ToogleSwitch
        },
        data() {
            return {
                isSubmitting: false,
                changePassword: false,
                changeMobileNumber: false,
                storeState: useStoreState(),
                notificationState: useNotificationState(),

                name: null,
                emoji: null,
                online: null,
                pickupNote: null,
                allowPickup: null,
                description: null,
                mobileNumber: null,
                deliveryNote: null,
                smsSenderName: null,
                allowDelivery: null,
                offlineMessage: null,
                dpoCompanyToken: null,
                deliveryFlatFee: null,
                depositPercentages: [],
                perfectPayEnabled: null,
                dpoPaymentEnabled: null,
                allowFreeDelivery: null,
                pickupDestinations: null,
                deliveryDestinations: [],
                allowDepositPayments: null,
                installmentPercentages: null,
                orangeMoneyMerchantCode: null,
                allowInstallmentPayments: null,
                orangeMoneyPaymentEnabled: null,

                availablePaymentMethods: [],
                supportedPaymentMethods: [],

                availableDepositPercentages: [],
                availableInstallmentPercentages: [],

                isLoadingAvailablePaymentMethods: false,
                isLoadingSupportedPaymentMethods: false,
                isLoadingAvailableDepositPercentages: false,
                isLoadingAvailableInstallmentPercentages: false,
            }
        },
        watch: {
            allowDepositPayments(newValue, oldValue) {
                if(newValue == true && this.availableDepositPercentages.length == 0) {
                    this._getAvailableDepositPercentages();
                }
            },
            allowInstallmentPayments(newValue, oldValue) {
                if(newValue == true && this.availableInstallmentPercentages.length == 0) {
                    this._getAvailableInstallmentPercentages();
                }
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            deliveryDestinationNames() {
                return this.deliveryDestinations.map((deliveryDestination) => deliveryDestination.name);
            },
            pickupDestinationNames() {
                return this.pickupDestinations.map((pickupDestination) => pickupDestination.name);
            },
            selectedPaymentMethodOptions() {
                return this.supportedPaymentMethods.map((paymentMethod) => {
                    return {
                        text: paymentMethod.name,
                        paymentMethod: paymentMethod
                     };
                });
            },
            availablePaymentMethodOptions() {
                return this.availablePaymentMethods.map((paymentMethod) => {
                    return {
                        text: paymentMethod.name,
                        paymentMethod: paymentMethod
                     };
                });
            },
            selectedDepositPercentageOptions() {
                return this.depositPercentages.map((percentage) => {
                    return { text: percentage + '%' };
                });
            },
            availableDepositPercentageOptions() {
                return this.availableDepositPercentages.map((percentage) => {
                    return { text: percentage + '%' };
                });
            },
            selectedInstallmentPercentageOptions() {
                return this.installmentPercentages.map((percentage) => {
                    return { text: percentage + '%' };
                });
            },
            availableInstallmentPercentageOptions() {
                return this.availableInstallmentPercentages.map((percentage) => {
                    return { text: percentage + '%' };
                });
            }
        },
        methods: {
            setStoreDetails() {
                this.name = this.store.name;
                this.emoji = this.store.emoji;
                this.online = this.store.online;
                this.pickupNote = this.store.pickupNote;
                this.allowPickup = this.store.allowPickup;
                this.description = this.store.description;
                this.deliveryNote = this.store.deliveryNote;
                this.smsSenderName = this.store.smsSenderName;
                this.allowDelivery = this.store.allowDelivery;
                this.offlineMessage = this.store.offlineMessage;
                this.dpoCompanyToken = this.store.dpoCompanyToken;
                this.perfectPayEnabled = this.store.perfectPayEnabled;
                this.dpoPaymentEnabled = this.store.dpoPaymentEnabled;
                this.allowFreeDelivery = this.store.allowFreeDelivery;
                this.depositPercentages = this.store.depositPercentages;
                this.pickupDestinations = this.store.pickupDestinations;
                this.mobileNumber = this.store.mobileNumber.withExtension;
                this.deliveryDestinations = this.store.deliveryDestinations.map(function(deliveryDestination) {
                    return {
                        name: deliveryDestination.name,
                        cost: deliveryDestination.cost.amountWithoutCurrency,
                        allowFreeDelivery: deliveryDestination.allowFreeDelivery,
                    };
                });
                this.allowDepositPayments = this.store.allowDepositPayments;
                this.installmentPercentages = this.store.installmentPercentages;
                this.orangeMoneyMerchantCode = this.store.orangeMoneyMerchantCode;
                this.deliveryFlatFee = this.store.deliveryFlatFee.amount.toString();
                this.allowInstallmentPayments = this.store.allowInstallmentPayments;
                this.orangeMoneyPaymentEnabled = this.store.orangeMoneyPaymentEnabled;
            },
            addDeliveryDestinations(deliveryDestinationNames) {

                var newDeliveryDestinations = [];

                for (let index = 0; index < deliveryDestinationNames.length; index++) {

                    var searchedIndex = this.deliveryDestinations.findIndex((deliveryDestination) => deliveryDestination.name == deliveryDestinationNames[index]);

                    if(searchedIndex >= 0) {

                        newDeliveryDestinations.push(this.deliveryDestinations[searchedIndex]);

                    }else{

                        newDeliveryDestinations.push({
                            name: deliveryDestinationNames[index],
                            allowFreeDelivery: true,
                            cost: '0.00'
                        });

                    }

                }

                this.deliveryDestinations = newDeliveryDestinations;
            },
            addPickupDestinations(pickupDestinationNames) {

                var newPickupDestinations = [];

                for (let index = 0; index < pickupDestinationNames.length; index++) {

                    var searchedIndex = this.pickupDestinations.findIndex((pickupDestination) => pickupDestination.name == pickupDestinationNames[index]);

                    if(searchedIndex >= 0) {

                        newPickupDestinations.push(this.pickupDestinations[searchedIndex]);

                    }else{

                        newPickupDestinations.push({
                            name: pickupDestinationNames[index],
                            address: ''
                        });

                    }

                }

                this.pickupDestinations = newPickupDestinations;

            },
            addSupportedPaymentMethods(paymentMethodOptions) {

                var newSupportedPaymentMethods = [];

                for (let index = 0; index < paymentMethodOptions.length; index++) {

                    var searchedIndex = this.supportedPaymentMethods.findIndex((supportedPaymentMethod) => supportedPaymentMethod.id == paymentMethodOptions[index].paymentMethod.id);

                    if(searchedIndex >= 0) {

                        newSupportedPaymentMethods.push(this.supportedPaymentMethods[searchedIndex]);

                    }else{

                        var searchedIndex = this.availablePaymentMethods.findIndex((availablePaymentMethod) => availablePaymentMethod.id == paymentMethodOptions[index].paymentMethod.id);

                        newSupportedPaymentMethods.push(this.availablePaymentMethods[searchedIndex]);

                    }

                }

                this.supportedPaymentMethods = newSupportedPaymentMethods;
            },
            addDepositPercentages(depositPercentageOptions) {

                var newDepositPercentages = [];

                for (let index = 0; index < depositPercentageOptions.length; index++) {

                    newDepositPercentages.push(depositPercentageOptions[index].text.replace("%", ""));

                }

                this.depositPercentages = newDepositPercentages;

            },
            addInstallmentPercentages(installmentPercentageOptions) {

                var newInstallmentPercentages = [];

                for (let index = 0; index < installmentPercentageOptions.length; index++) {

                    newInstallmentPercentages.push(installmentPercentageOptions[index].text.replace("%", ""));

                }

                this.installmentPercentages = newInstallmentPercentages;

            },
            _getAvailablePaymentMethods() {

                this.isLoadingAvailablePaymentMethods = true;

                let params = {
                    //  'search': null,
                    //  'filter': null,
                    //  'page': null
                };

                getAvailablePaymentMethods(this.store, params).then(response => {

                    if(response.status == 200) {

                        //  Stop loader
                        this.isLoadingAvailablePaymentMethods = false;

                        //  Set the available payment methods
                        this.availablePaymentMethods = response.data.data.map((paymentMethod) => {
                            return {
                                active: true,
                                instruction: '',
                                id: paymentMethod.id,
                                name: paymentMethod.name,
                            }
                        });

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingAvailablePaymentMethods = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });
            },
            _getSupportedPaymentMethods() {

                this.isLoadingSupportedPaymentMethods = true;

                let params = {
                    //  'search': null,
                    //  'filter': null,
                    //  'page': null
                };

                getSupportedPaymentMethods(this.store, params).then(response => {

                    if(response.status == 200) {

                        //  Stop loader
                        this.isLoadingSupportedPaymentMethods = false;

                        //  Set the available payment methods
                        this.supportedPaymentMethods = response.data.data.map((paymentMethod) => {
                            return {
                                id: paymentMethod.id,
                                name: paymentMethod.name,
                                active: paymentMethod._attributes.storePaymentMethodAssociation.active,
                                instruction: paymentMethod._attributes.storePaymentMethodAssociation.instruction,
                            }
                        });

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingSupportedPaymentMethods = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });
            },
            _getAvailableDepositPercentages() {

                this.isLoadingAvailableDepositPercentages = true;

                let params = {
                    //  'search': null,
                    //  'filter': null,
                    //  'page': null
                };

                getAvailableDepositPercentages(this.store, params).then(response => {

                    if(response.status == 200) {

                        //  Stop loader
                        this.isLoadingAvailableDepositPercentages = false;

                        //  Set the available deposit percentages
                        this.availableDepositPercentages = response.data['percentages'];

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingAvailableDepositPercentages = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });
            },
            _getAvailableInstallmentPercentages() {

                this.isLoadingAvailableInstallmentPercentages = true;

                let params = {
                    //  'search': null,
                    //  'filter': null,
                    //  'page': null
                };

                getAvailableInstallmentPercentages(this.store, params).then(response => {

                    if(response.status == 200) {

                        //  Stop loader
                        this.isLoadingAvailableInstallmentPercentages = false;

                        //  Set the available installment percentages
                        this.availableInstallmentPercentages = response.data['percentages'];

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingAvailableInstallmentPercentages = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });
            },
            updateStore() {

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
                        emoji: this.emoji,
                        online: this.online,
                        allowPickup: this.allowPickup,
                        description: this.description,
                        mobileNumber: this.mobileNumber,    //
                        smsSenderName: this.smsSenderName,
                        allowDelivery: this.allowDelivery,
                        offlineMessage: this.offlineMessage,
                        deliveryFlatFee: this.deliveryFlatFee,
                        perfectPayEnabled: this.perfectPayEnabled,
                        dpoPaymentEnabled: this.dpoPaymentEnabled,
                        allowFreeDelivery: this.allowFreeDelivery,
                        allowDepositPayments: this.allowDepositPayments,
                        supportedPaymentMethods: this.supportedPaymentMethods,
                        allowInstallmentPayments: this.allowInstallmentPayments,
                        orangeMoneyPaymentEnabled: this.orangeMoneyPaymentEnabled,
                    }

                    if(typeof this.description === 'string' && this.description.trim() == '') {
                        data['description'] = null;
                    }

                    if(this.allowDelivery) {

                        if(typeof this.deliveryNote === 'string' && this.deliveryNote.trim() == '') {
                            data['deliveryNote'] = null;
                        }else{
                            data['deliveryNote'] = this.deliveryNote;
                        }

                        data['deliveryDestinations'] = this.deliveryDestinations;

                    }

                    if(this.allowPickup) {

                        if(typeof this.pickupNote === 'string' && this.pickupNote.trim() == '') {
                            data['pickupNote'] = null;
                        }else{
                            data['pickupNote'] = this.pickupNote;
                        }

                        data['pickupDestinations'] = this.pickupDestinations.map(function(pickupDestination) {

                            if(typeof pickupDestination.address === 'string' && pickupDestination.address.trim() == '') {
                                pickupDestination.address = null;
                            }

                            return pickupDestination;

                        });

                    }

                    if(this.allowFreeDelivery == false) {
                        data['deliveryFlatFee'] = this.deliveryFlatFee;
                    }

                    if(this.perfectPayEnabled == false) {

                        if(this.dpoPaymentEnabled) {
                            data['dpoCompanyToken'] = this.dpoCompanyToken;
                        }

                        if(this.orangeMoneyPaymentEnabled) {
                            data['orangeMoneyMerchantCode'] = this.orangeMoneyMerchantCode;
                        }

                    }

                    if(this.allowDepositPayments) {
                        data['depositPercentages'] = this.depositPercentages;
                    }

                    if(this.allowInstallmentPayments) {
                        data['installmentPercentages'] = this.installmentPercentages;
                    }

                    //  Start loader
                    this.isSubmitting = true;

                    updateStore(this.store, data).then(response => {

                        if(response.status == 200) {

                            //  Stop loader
                            this.isSubmitting = false;

                            /**
                             *  Update the "storeState().store".
                             *
                             *  This will allow the entire app to capture the latest instance
                             *  of this updated store.
                             */
                            this.storeState.store = response.data;

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Store updated');
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
            this.setStoreDetails();
            this._getAvailablePaymentMethods();
            this._getSupportedPaymentMethods();
            this._getAvailableDepositPercentages();
            this._getAvailableInstallmentPercentages();
        }
    };

</script>
