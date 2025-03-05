<template>

    <div class="bg-white shadow-lg border p-8 rounded-lg relative">

        <!-- Loading Backdrop -->
        <BackdropLoader v-if="isLoadingDeliveryMethod || isSubmitting" class="rounded-lg"></BackdropLoader>

        <form class="space-y-4" action="#" method="POST">

            <div class="flex justify-start items-center border-dashed py-6">

                <!-- Back Button -->
                <BackButton class="w-16 mr-4" :action="goBack"></BackButton>

                <div v-if="isLoadingDeliveryMethod" class="flex items-center space-x-2">
                    <LineSkeleton width="w-40" :shine="true"></LineSkeleton>
                    <LineSkeleton width="w-4" :shine="true"></LineSkeleton>
                </div>

                <template v-else>

                    <TextHeader>{{ isCreating ? 'Add Delivery Method' : form.name }}</TextHeader>

                    <!-- More Info Popover -->
                    <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Delivery methods are the ways you get products to your customers, such as home delivery, in-store pickup, or courier services. Configure them to match your store's logistics and customer preferences." placement="top"></MoreInfoPopover>

                </template>

            </div>

            <div :class="[mustSaveChanges || mustCreate ? 'h-20 mb-8' : 'h-0 mb-0 p-0', 'transition-all duration-500 overflow-hidden']">

                <!-- Save Changes Info Alert -->
                <Alert type="warning" class="flex justify-between items-center border border-dashed">

                    <div class="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <span>{{ isEditting ? 'Please save your changes' : 'Create your delivery method' }}</span>
                    </div>

                    <div class="flex items-center space-x-2">

                        <!-- Undo Button -->
                        <UndoButton :action="setFormFields" type="light" size="xs">
                            <span class="ml-1">Undo</span>
                        </UndoButton>

                        <!-- Create / Save Changes Button -->
                        <PrimaryButton :action="() => isEditting ? updateDeliveryMethod() : createStoreDeliveryMethod()" :loading="isSubmitting" type="dark">
                            <span>{{ isEditting ? 'Save Changes' : 'Create' }}</span>
                        </PrimaryButton>

                    </div>

                </Alert>

            </div>

            <!-- Form Error Messages -->
            <FormErrorMessages></FormErrorMessages>

            <!-- Active Toggle Switch -->
            <ActiveToggleSwitch :form="form"></ActiveToggleSwitch>

            <!-- Name Input -->
            <NameTextInput :form="form"></NameTextInput>

            <!-- Description Textarea -->
            <DescriptionTextarea :form="form"></DescriptionTextarea>

            <!-- Qualify On Minimum Grand Total -->
            <QualifyOnMinimumGrandTotal :form="form"></QualifyOnMinimumGrandTotal>

            <!-- Offer Free Delivery On Minimum Grand Total -->
            <OfferFreeDeliveryOnMinimumGrandTotal :form="form"></OfferFreeDeliveryOnMinimumGrandTotal>

            <!-- Set Daily Order Limit Checkbox -->
            <SetDailyOrderLimitCheckbox :form="form"></SetDailyOrderLimitCheckbox>

            <!-- Additional Fields -->
            <AdditionalFields :form="form"></AdditionalFields>

            <!-- Ask For An Address Checkbox -->
            <AskForAnAddressCheckbox :form="form"></AskForAnAddressCheckbox>

            <!-- Pin Location On Map Checkbox -->
            <PinLocationOnMapCheckbox :form="form"></PinLocationOnMapCheckbox>

            <!-- Charge Fee -->
            <ChargeFee :form="form"></ChargeFee>

            <!-- Schedule -->
            <Schedule :form="form"></Schedule>

            <!-- Form Error Messages -->
            <FormErrorMessages></FormErrorMessages>

            <!-- Create / Save Changes Button -->
            <PrimaryButton :action="() => isEditting ? updateDeliveryMethod() : createStoreDeliveryMethod()" :disabled="!mustSaveChanges && !mustCreate" :loading="isSubmitting" type="dark" class="w-full">
                <span>{{ isEditting ? 'Save Changes' : 'Create' }}</span>
            </PrimaryButton>

            <div>

                <!-- Delete Delivery Method -->
                <DeleteDeliveryMethod :form="form" class="mt-16"></DeleteDeliveryMethod>

            </div>

        </form>
    </div>

</template>

<script>

    import isEqual from 'lodash/isEqual';
    import cloneDeep from 'lodash/cloneDeep';
    import Alert from '@Partials/alerts/Alert.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useApiState } from '@Stores/api-store.js';
    import { useStoreState } from '@Stores/store-store.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import BackButton from '@Partials/buttons/BackButton.vue';
    import UndoButton from '@Partials/buttons/UndoButton.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import BackdropLoader from '@Partials/loaders/BackdropLoader.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { getApi, postApi, putApi } from '@Repositories/api-repository.js';
    import { useDeliveryMethodState } from '@Stores/delivery-method-store.js';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';
    import Schedule from '@Pages/stores/store/settings/delivery-methods/components/Schedule.vue';
    import ChargeFee from '@Pages/stores/store/settings/delivery-methods/components/ChargeFee.vue';
    import NameTextInput from '@Pages/stores/store/settings/delivery-methods/components/NameTextInput.vue';
    import AdditionalFields from '@Pages/stores/store/settings/delivery-methods/components/AdditionalFields.vue';
    import ActiveToggleSwitch from '@Pages/stores/store/settings/delivery-methods/components/ActiveToggleSwitch.vue';
    import DescriptionTextarea from '@Pages/stores/store/settings/delivery-methods/components/DescriptionTextarea.vue';
    import DeleteDeliveryMethod from '@Pages/stores/store/settings/delivery-methods/components/DeleteDeliveryMethod.vue';
    import AskForAnAddressCheckbox from '@Pages/stores/store/settings/delivery-methods/components/AskForAnAddressCheckbox.vue';
    import PinLocationOnMapCheckbox from '@Pages/stores/store/settings/delivery-methods/components/PinLocationOnMapCheckbox.vue';
    import QualifyOnMinimumGrandTotal from '@Pages/stores/store/settings/delivery-methods/components/QualifyOnMinimumGrandTotal.vue';
    import SetDailyOrderLimitCheckbox from '@Pages/stores/store/settings/delivery-methods/components/SetDailyOrderLimitCheckbox.vue';
    import OfferFreeDeliveryOnMinimumGrandTotal from '@Pages/stores/store/settings/delivery-methods/components/OfferFreeDeliveryOnMinimumGrandTotal.vue';

    export default {
        mixins: [FormMixin],
        components: {
            Alert, TextHeader, BackButton, UndoButton, PrimaryButton, LineSkeleton, MoreInfoPopover, BackdropLoader,
            FormErrorMessages, Schedule, ChargeFee, NameTextInput, ActiveToggleSwitch, AdditionalFields, DescriptionTextarea,
            DeleteDeliveryMethod, AskForAnAddressCheckbox, PinLocationOnMapCheckbox, QualifyOnMinimumGrandTotal, SetDailyOrderLimitCheckbox,
            OfferFreeDeliveryOnMinimumGrandTotal
        },
        data() {
            return {
                form: {
                    name: '',
                    active: true,
                    weightZones: [],
                    description: '',
                    chargeFee: false,
                    distanceZones: [],
                    setSchedule: false,
                    feeType: 'flat fee',
                    postalCodeZones: [],
                    additionalFields: [],
                    scheduleType: 'date',
                    flatFeeRate: '10.00',
                    dailyOrderLimit: '1000',
                    percentageFeeRate: '10',
                    askForAnAddress: false,
                    pinLocationOnMap: false,
                    setDailyOrderLimit: false,
                    timeSlotIntervalValue: '1',
                    minimumGrandTotal: '100.00',
                    latestDeliveryTimeValue: '7',
                    timeSlotIntervalUnit: 'hour',
                    autoGenerateTimeSlots: false,
                    showDistanceOnInvoice: true,
                    earliestDeliveryTimeValue: '3',
                    captureAdditionalFields: false,
                    earliestDeliveryTimeUnit: 'day',
                    qualifyOnMinimumGrandTotal: false,
                    requireMinimumNoticeForOrders: false,
                    restrictMaximumNoticeForOrders: false,
                    freeDeliveryMinimumGrandTotal: '200.00',
                    offerFreeDeliveryOnMinimumGrandTotal: false,
                    operationalHours: this.generateOperationalHours(),
                },
                originalForm: null,
                isSubmitting: false,
                apiState: useApiState(),
                storeState: useStoreState(),
                deliveryMethodState: useDeliveryMethodState()
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isCreating() {
                return this.$route.name === 'create-store-delivery-method';
            },
            isEditting() {
                return this.$route.name === 'show-store-delivery-method';
            },
            isLoadingDeliveryMethod() {
                return this.deliveryMethodState.isLoadingDeliveryMethod;
            },
            formHasChanged() {
                // Clone the objects to avoid modifying the original data
                var a = cloneDeep(this.form);
                var b = cloneDeep(this.originalForm);

                // Compare the modified arrays for equality
                return !isEqual(a, b);
            },
            mustSaveChanges() {
                return this.isEditting && this.formHasChanged && !this.isLoadingDeliveryMethod && !this.isSubmitting;
            },
            mustCreate() {
                return this.isCreating && this.formHasChanged && !this.isLoadingDeliveryMethod && !this.isSubmitting;
            }
        },
        methods: {
            goBack() {
                //  Navigate to show delivery methods
                this.$router.push({
                    name: 'show-store-delivery-methods',
                    params: { 'store_href': this.store._links.showStore }
                }).then(() => {
                    // Ensure scroll to top after route navigation
                    window.scrollTo(0, 0);
                });
            },
            setFormFields() {

                this.form = {
                    distanceZones: [],
                    postalCodeZones: [],
                    weightCategories: [],
                    additionalFields: [],
                    name: this.deliveryMethod.name,
                    active: this.deliveryMethod.active,
                    feeType: this.deliveryMethod.feeType,
                    chargeFee: this.deliveryMethod.chargeFee,
                    setSchedule: this.deliveryMethod.setSchedule,
                    description: this.deliveryMethod.description,
                    scheduleType: this.deliveryMethod.scheduleType,
                    sameDayDelivery: this.deliveryMethod.sameDayDelivery,
                    askForAnAddress: this.deliveryMethod.askForAnAddress,
                    pinLocationOnMap: this.deliveryMethod.pinLocationOnMap,
                    operationalHours: this.deliveryMethod.operationalHours,
                    setDailyOrderLimit: this.deliveryMethod.setDailyOrderLimit,
                    timeSlotIntervalUnit: this.deliveryMethod.timeSlotIntervalUnit,
                    dailyOrderLimit: this.deliveryMethod.dailyOrderLimit.toString(),
                    autoGenerateTimeSlots: this.deliveryMethod.autoGenerateTimeSlots,
                    showDistanceOnInvoice: this.deliveryMethod.showDistanceOnInvoice,
                    flatFeeRate: this.deliveryMethod.flatFeeRate.amountWithoutCurrency,
                    captureAdditionalFields: this.deliveryMethod.captureAdditionalFields,
                    earliestDeliveryTimeUnit: this.deliveryMethod.earliestDeliveryTimeUnit,
                    percentageFeeRate: this.deliveryMethod.percentageFeeRate.value.toString(),
                    qualifyOnMinimumGrandTotal: this.deliveryMethod.qualifyOnMinimumGrandTotal,
                    timeSlotIntervalValue: this.deliveryMethod.timeSlotIntervalValue.toString(),
                    minimumGrandTotal: this.deliveryMethod.minimumGrandTotal.amountWithoutCurrency,
                    latestDeliveryTimeValue: this.deliveryMethod.latestDeliveryTimeValue.toString(),
                    requireMinimumNoticeForOrders: this.deliveryMethod.requireMinimumNoticeForOrders,
                    restrictMaximumNoticeForOrders: this.deliveryMethod.restrictMaximumNoticeForOrders,
                    earliestDeliveryTimeValue: this.deliveryMethod.earliestDeliveryTimeValue.toString(),
                    offerFreeDeliveryOnMinimumGrandTotal: this.deliveryMethod.offerFreeDeliveryOnMinimumGrandTotal,
                    freeDeliveryMinimumGrandTotal: this.deliveryMethod.freeDeliveryMinimumGrandTotal.amountWithoutCurrency,
                };

                if(this.form.operationalHours.length == 0) this.form.operationalHours = this.generateOperationalHours();

                this.form.distanceZones = this.deliveryMethod.distanceZones.map((distanceZone) => {
                    distanceZone.isEditable = false;
                    return distanceZone;
                });

                this.form.weightCategories = this.deliveryMethod.weightCategories.map((weightCategory) => {
                    weightCategory.isEditable = false;
                    return weightCategory;
                });

                this.form.postalCodeZones = this.deliveryMethod.postalCodeZones.map((postalCodeZone) => {
                    postalCodeZone.isEditable = false;
                    return postalCodeZone;
                });

                this.form.additionalFields = this.deliveryMethod.additionalFields.map((additionalField) => {
                    additionalField.addDescription = additionalField.description != '';
                    additionalField.isEditable = false;
                    return additionalField;
                });

                // Capture the original form before editing
                this.originalForm = cloneDeep(this.form);

                console.log('copy');

            },
            generateOperationalHours() {
                return Array(7).fill().map(() => ({
                    available: true,
                    hours: [
                        ['08:00', '16:00']
                    ]
                }));
            },
            parseForm() {
                var data = cloneDeep(this.form);

                if(this.isCreating) {
                    data['store_id'] = this.store.id;
                }

                return data;
            },
            getDeliveryMethod() {

                //  Start loader
                useDeliveryMethodState().isLoadingDeliveryMethod = true;

                //  Set the query params
                const params = {
                    '_relationships': 'address'
                }

                getApi(this.$route.params.delivery_method_href, params).then(response => {

                    if(response.status == 200) {

                        if(response.data.exists) {

                            useDeliveryMethodState().deliveryMethod = response.data.deliveryMethod;
                            this.deliveryMethod = response.data.deliveryMethod;
                            this.setFormFields();

                        }

                    }

                    //  Stop loader
                    useDeliveryMethodState().isLoadingDeliveryMethod = false;

                }).catch(errorException => {

                    //  Stop loader
                    useDeliveryMethodState().isLoadingDeliveryMethod = false;

                    this.setServerFormErrors(errorException);

                });

            },
            createStoreDeliveryMethod() {

                this.hideFormErrors();

                if(this.form.name.trim() == '') {

                    this.setFormError('name', 'Enter delivery method name');

                }else {

                    //  Start loader
                    this.isSubmitting = true;

                    postApi(useApiState().apiHome._links['createDeliveryMethod'], this.parseForm()).then(response => {

                        if(response.status == 200) {

                            if(response.data.created) {

                                //  Navigate to show delivery methods
                                this.$router.push({
                                    name: 'show-store-delivery-methods',
                                    params: { 'store_href': this.store._links.showStore }
                                }).then(() => {
                                    // Ensure scroll to top after route navigation
                                    window.scrollTo(0, 0);
                                });

                                /**
                                 *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                                 */
                                this.showSuccessfulNotification('Delivery method created');

                            }else{

                                this.setFormError('general', response.data.message);
                                this.showUnsuccessfulNotification(response.data.message);

                            }

                        }

                        //  Stop loader
                        this.isSubmitting = false;

                    }).catch(errorException => {

                        this.isSubmitting = false;

                        /**
                         *  Note: the setServerFormErrors() method is part of the FormMixin methods
                         */
                        this.setServerFormErrors(errorException);

                    });

                }
            },
            updateDeliveryMethod() {

                //  Start loader
                this.isSubmitting = true;

                putApi(this.deliveryMethod._links.updateDeliveryMethod, this.parseForm()).then(response => {

                    if(response.status == 200) {

                        if(response.data.updated) {

                            //  Navigate to show delivery methods
                            this.$router.push({
                                name: 'show-store-delivery-methods',
                                params: { 'store_href': this.store._links.showStore }
                            }).then(() => {
                                // Ensure scroll to top after route navigation
                                window.scrollTo(0, 0);
                            });

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Delivery method updated');

                        }else{

                            this.setFormError('general', response.data.message);
                            this.showUnsuccessfulNotification(response.data.message);

                        }

                        this.originalForm = cloneDeep(this.form);

                    }

                    //  Stop loader
                    this.isSubmitting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    this.setServerFormErrors(errorException);

                });

            }
        },
        beforeUnmount() {
            const deliveryMethodState = useDeliveryMethodState();
            deliveryMethodState.reset();
        },
        created() {
            this.originalForm = cloneDeep(this.form);
            if(this.isEditting) this.getDeliveryMethod();
        }
    };

</script>
