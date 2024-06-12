<template>

    <div>

        <div class="flex justify-start items-center border-dashed py-6">

            <!-- Back Button -->
            <BackButton class="w-16 mr-4"></BackButton>

            <!-- Text Heading -->
            <SpiningLoader v-if="isLoadingProduct"></SpiningLoader>

            <template v-else>

                <TextHeader>{{ isCreating ? 'Add Product' : form.name }}</TextHeader>

                <!-- More Info Popover -->
                <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Products are physical or non physical items that customers can place orders and pay for using your preferred payment methods" placement="top"></MoreInfoPopover>

            </template>

        </div>

        <!-- Product Form -->
        <form class="relative" action="#" method="POST">

            <!-- Loading Backdrop -->
            <LoadingBackdrop v-if="isLoadingProduct || isSubmitting"></LoadingBackdrop>

            <!-- General Error Info Alert -->
            <Alert v-if="mustCreate || mustSaveChanges" type="warning" class="flex justify-between items-center mb-2">

                <div class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <span>{{ isCreating ? 'Create your product' : 'Please save your changes'}}</span>
                </div>

                <!-- Create Product / Save Changes Button -->
                <PrimaryButton :action="isCreating ? createProduct : updateProduct" :loading="isSubmitting" class="w-40">
                    {{ isCreating ? 'Create Product' : 'Save Changes' }}
                </PrimaryButton>

            </Alert>

            <div class="grid grid-cols-12 gap-4 mb-8">

                <div class="col-span-8">

                    <div class="space-y-4 bg-white shadow-lg rounded-lg border p-4 mb-4">

                        <!-- General Error Info Alert -->
                        <Alert v-if="getFormError('general')" type="warning">
                            {{ getFormError('general') }}
                        </Alert>

                        <!-- Name Input -->
                        <TextInput
                            v-model="form.name"
                            @keydown.enter="updateProduct"
                            :errorText="getFormError('name')"
                            label="Name" _placeholder="Standard Ticket"
                            labelPopoverTitle="What Is This?"
                            labelPopoverDescription="The name of your product e.g Standard Ticket">
                        </TextInput>

                        <!-- Non Variation Settings -->
                        <template v-if="form.allowVariations == false">

                            <!-- If Free Toggle Switch -->
                            <ToogleSwitch
                                v-model="form.isFree" size="md"
                                labelPopoverTitle="What Is This?"
                                :errorText="getFormError('isFree')"
                                labelPopoverDescription="Turn on if you want your product to be made Free for customers">
                                Is Free
                            </ToogleSwitch>

                            <!-- Info Alert -->
                            <Alert v-if="form.isFree">
                                This product is <span class="font-bold">Free</span>
                            </Alert>

                            <template v-else>

                                <!-- Unit Regular Price Money Input -->
                                <MoneyInput
                                    label="Regular Price"
                                    @keydown.enter="updateProduct"
                                    v-model="form.unitRegularPrice"
                                    :errorText="getFormError('unitRegularPrice')"
                                    labelPopoverTitle="What Is This?"
                                    labelPopoverDescription="Set the regular price of this product (How much the product is sold when its not on sale)">
                                </MoneyInput>

                                <!-- Unit Sale Price Money Input -->
                                <MoneyInput
                                    label="Sale Price"
                                    v-model="form.unitSalePrice"
                                    @keydown.enter="updateProduct"
                                    :errorText="getFormError('unitSalePrice')"
                                    labelPopoverTitle="What Is This?"
                                    labelPopoverDescription="Set the sale price of this product (if the product is on sale)">
                                </MoneyInput>

                            </template>

                            <!-- Show Description Toggle Switch -->
                            <ToogleSwitch
                                size="md"
                                v-model="form.showDescription"
                                labelPopoverTitle="What Is This?"
                                :errorText="getFormError('showDescription')"
                                labelPopoverDescription="Turn on if you want to show the product description to customers">
                                Show Description
                            </ToogleSwitch>

                            <!-- Description Textarea -->
                            <TextareaInput v-if="form.showDescription"
                                v-model="form.description"
                                label="Description" _placeholder="1 day show with popular artists" :_rows="2"
                                :errorText="getFormError('description')" @keydown.enter="updateProduct"
                                labelPopoverTitle="What Is This?"
                                labelPopoverDescription="Sweet and short description of your product e.g 1 day show with popular artists">
                            </TextareaInput>

                            <div class="flex space-x-4">

                                <!-- Stock Quantity Type Select -->
                                <SelectInput v-model="form.stockQuantityType"
                                    label="Available Stock"
                                    labelPopoverTitle="What Is This?"
                                    :errorText="getFormError('stockQuantityType')"
                                    labelPopoverDescription="Select the available stock e.g Unlimited means that stock is always available while limited means that stock is limited to the quatities specified">
                                    <option value="Limited">Limited</option>
                                    <option value="Unlimited">Unlimited</option>
                                </SelectInput>

                                <!-- Stock Quantity Input -->
                                <NumberInput v-if="form.stockQuantityType == 'Limited'"
                                    v-model="form.stockQuantity"
                                    label="Stock Quantity" _placeholder="100"
                                    :errorText="getFormError('stockQuantity')" @keydown.enter="updateProduct"
                                    labelPopoverTitle="What Is This?"
                                    labelPopoverDescription="Set the stock quantity e.g 100 means that you only have 100 items of this product">
                                </NumberInput>

                            </div>

                            <div class="flex space-x-4">

                                <!-- Quantities Per Order Select -->
                                <SelectInput
                                    v-model="form.allowedQuantityPerOrder"
                                    label="Quantities Per Order"
                                    labelPopoverTitle="What Is This?"
                                    :errorText="getFormError('allowedQuantityPerOrder')"
                                    labelPopoverDescription="Select the maximum quantity per order of this product (Used to manage supply and demand) e.g Unlimited means that a customer can specify any quantity while limited means that a customer can only specify up to the maximum quantity that you support">
                                    <option value="Limited">Limited</option>
                                    <option value="Unlimited">Unlimited</option>
                                </SelectInput>

                                <!-- Maximum Allowed Quantity Per Order Input -->
                                <NumberInput v-if="form.allowedQuantityPerOrder == 'Limited'"
                                    v-model="form.maximumAllowedQuantityPerOrder"
                                    label="Maximum Quantities Per Order" _placeholder="10"
                                    :errorText="getFormError('maximumAllowedQuantityPerOrder')"
                                    @keydown.enter="updateProduct"
                                    labelPopoverTitle="What Is This?"
                                    labelPopoverDescription="Set the maximum quantity per order of this product (Used to manage supply and demand) e.g 10 means that a customer can only specify a quantity of 1 up to 10 when placing an order. They will not be permitted to order anymore than this quantity">
                                </NumberInput>

                            </div>

                        </template>

                    </div>

                    <div class="space-y-4 bg-white shadow-lg rounded-lg border p-4 mb-4">

                        <!-- Allow Variations Toggle Switch -->
                        <ToogleSwitch
                            labelPopoverTitle="What Is This?"
                            v-model="form.allowVariations" size="md"
                            :errorText="getFormError('allowVariations')"
                            labelPopoverDescription="Turn on if you want your product to support variations (different versions of itself e.g different sizes, materials, colors, etc)">
                            Allow variations
                        </ToogleSwitch>

                        <!-- Variation Settings -->
                        <template v-if="form.allowVariations">

                            <div class="flex justify-end">

                                <!-- Add Product Button -->
                                <AddButton :action="onAddVariantAttribute" class="w-40" size="xs">
                                    <span class="ml-2">Add Option</span>
                                </AddButton>

                            </div>

                            <div v-for="(variantAttribute, index) in form.variantAttributes" :key="index" class="relative bg-gray-50 p-4 border rounded-lg">

                                <div class="absolute top-2 right-2 flex items-center space-x-2">

                                    <svg class="w-6 h-6 cursor-pointer hover:opacity-50" @click="form.variantAttributes[index].isEditable = !form.variantAttributes[index].isEditable" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path v-if="form.variantAttributes[index].isEditable" stroke-linecap="round" stroke-linejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
                                        <path v-else stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>

                                    <!-- Delete Product Button -->
                                    <DeleteButton :action="() => onRemoveVariantAttribute(index)" size="xs" type="danger"></DeleteButton>

                                </div>

                                <div v-if="variantAttribute.isEditable" class="space-y-4">

                                    <!-- Variant Attribute Name Input -->
                                    <TextInput
                                        label="Name"
                                        _placeholder="Size"
                                        @keydown.enter="updateProduct"
                                        labelPopoverTitle="What Is This?"
                                        v-model="form.variantAttributes[index].name"
                                        :errorText="getFormError('variantAttributes'+index+'name')"
                                        labelPopoverDescription="The variation name e.g Size, Color, Material, etc">
                                    </TextInput>

                                    <!-- Variant Attribute Instruction Textarea -->
                                    <TextInput
                                        label="Instruction"
                                        @keydown.enter="updateProduct"
                                        _placeholder="Select your size"
                                        labelPopoverTitle="What Is This?"
                                        v-model="form.variantAttributes[index].instruction"
                                        :errorText="getFormError('variantAttributes'+index+'instruction')"
                                        labelPopoverDescription="The variation instruction e.g Select your size">
                                    </TextInput>

                                    <!-- Variant Attribute Value Tags -->
                                    <InputTags
                                        label="Options"
                                        labelPopoverTitle="What Is This?"
                                        :key="form.variantAttributes[index].values"
                                        :tags="form.variantAttributes[index].values"
                                        :errorText="getFormError('variantAttributes'+index+'value')"
                                        @onTagsChanged="(newValues) => form.variantAttributes[index].values = newValues"
                                        labelPopoverDescription="The variation options e.g Small, Medium, Large, etc" />

                                </div>

                                <div v-else class="space-y-2 cursor-pointer" @click="form.variantAttributes[index].isEditable = true">

                                    <!-- Variant Attribute Name -->
                                    <p class="text-black">{{ form.variantAttributes[index].name }}</p>

                                    <!-- Input Error Message -->
                                    <InputErrorMessage v-if="getFormError('variantAttributes'+index+'name')" :errorText="getFormError('variantAttributes'+index+'name')"></InputErrorMessage>

                                    <!-- Variant Attribute Instruction -->
                                    <p class="text-xs text-black">{{ form.variantAttributes[index].instruction }}</p>

                                    <!-- Input Error Message -->
                                    <InputErrorMessage v-if="getFormError('variantAttributes'+index+'name')" :errorText="getFormError('variantAttributes'+index+'instruction')"></InputErrorMessage>

                                    <!-- Variant Attribute Value -->
                                    <div class="flex space-x-2">
                                        <span v-for="(value, index) in form.variantAttributes[index].values" :key="index" class="py-1 px-2 bg-black text-white text-xs rounded-lg">
                                            {{ value }}
                                        </span>
                                    </div>

                                    <!-- Input Error Message -->
                                    <InputErrorMessage v-if="getFormError('variantAttributes'+index+'name')" :errorText="getFormError('variantAttributes'+index+'value')"></InputErrorMessage>

                                </div>

                            </div>

                            <div v-if="variantAttributesHaveChanged" class="flex justify-end space-x-2">

                                <!-- Undo Button -->
                                <UndoButton v-if="hasOriginalVariantAttributes" :action="onResetVariantAttributes" size="xs">
                                    <span class="ml-1">Undo</span>
                                </UndoButton>

                                <!-- Create Variations Button -->
                                <div v-if="hasVariantAttributes" class="relative">
                                    <span v-if="!isCreatingVariations" class="absolute -bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-4xl">👆</span>
                                    <PrimaryButton :action="createProductVariations" :loading="isCreatingVariations" class="w-40" size="xs" type="primary">
                                        <svg class="w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                        </svg>
                                        Create Variations
                                    </PrimaryButton>
                                </div>

                            </div>

                        </template>

                    </div>

                    <!-- Variation List -->
                    <div v-if="form.allowVariations" class="space-y-4 bg-white shadow-lg rounded-lg border p-4">

                        <template v-if="hasOriginalVariantAttributes && variantAttributesHaveChanged">

                            <!-- Info Alert -->
                            <Alert class="flex items-start space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                </svg>
                                <div>
                                    The variation options have been changed. You can
                                    <template v-if="hasVariantAttributes">
                                        either
                                        <span @click="createProductVariations" class="font-bold underline cursor-pointer">
                                            Create New Variations
                                        </span>
                                        or
                                    </template>
                                    <span @click="onResetVariantAttributes" class="font-bold underline cursor-pointer">
                                        Undo Changes
                                    </span>
                                    to revert back to the original variations you had before.
                                </div>
                            </Alert>

                        </template>

                        <ProductVariations v-else-if="product" :product="product" :isCreatingVariations="isCreatingVariations"></ProductVariations>

                    </div>

                </div>

                <div class="col-span-4">

                    <div class="flex flex-col justify-between bg-white shadow-lg rounded-lg border p-4">

                        <div class="space-y-4">

                            <!-- Visible Toggle Switch -->
                            <ToogleSwitch
                                v-model="form.visible" size="md"
                                labelPopoverTitle="What Is This?"
                                :errorText="getFormError('visible')"
                                labelPopoverDescription="Turn on if you want your product to be visible (Made available to customers)">
                                Show Product
                            </ToogleSwitch>

                            <!-- Info Alert -->
                            <Alert v-if="!form.visible" type="warning">
                                This product has been <span class="font-bold">hidden</span> from customers visiting your store
                            </Alert>

                            <!-- Sku Input -->
                            <TextInput
                                v-model="form.sku"
                                @keydown.enter="updateProduct"
                                :errorText="getFormError('sku')"
                                label="SKU" _placeholder="std-ticket"
                                labelPopoverTitle="What Is This?"
                                labelPopoverDescription="The stock keeping unit of this product. Useful for stock management">
                            </TextInput>

                            <!-- Barcode Input -->
                            <TextInput
                                v-model="form.barcode"
                                @keydown.enter="updateProduct"
                                :errorText="getFormError('barcode')"
                                label="Barcode" _placeholder="123456789"
                                labelPopoverTitle="What Is This?"
                                labelPopoverDescription="The barcode of this product. Useful for stock management">
                            </TextInput>

                        </div>

                        <div class="flex justify-end mt-8">

                            <!-- Create Product / Save Changes Button -->
                            <PrimaryButton :action="isCreating ? createProduct : updateProduct" :disabled="(isCreating && !mustCreate) || (isEditting && !mustSaveChanges)" :loading="isSubmitting" class="w-40">
                                {{ isCreating ? 'Create Product' : 'Save Changes' }}
                            </PrimaryButton>

                        </div>

                    </div>

                </div>

            </div>

            <div v-if="product" :class="['space-y-4 shadow-lg rounded-lg border p-4', isLoadingProduct ? 'bg-gray-50' : 'border-red-300 bg-red-50']">

                <!-- Delete Product Info -->
                <p>Do you want to permanently delete <span class="font-bold text-black">{{ form.name }}</span>? Once this product is deleted you will not be able to recover it.</p>

                <div class="flex justify-end">

                    <ConfirmModal approveText="Delete Product" :approveAction="deleteProduct" :isLoading="isDeleting">

                        <template #content>
                            <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                            <p class="mb-8">Are you sure you want to permanently delete <span class="font-bold text-black">{{ form.name }}</span>?</p>
                        </template>

                        <template #trigger="triggerProps">

                            <!-- Delete Product Button - Triggers Confirmation Modal -->
                            <PrimaryButton @click="triggerProps.showModal" :loading="isDeleting" class="w-40" type="danger">
                                Delete Product
                            </PrimaryButton>

                        </template>


                    </ConfirmModal>

                </div>

            </div>

        </form>

    </div>

</template>

<script>

    import isEqual from 'lodash/isEqual';
    import cloneDeep from 'lodash/cloneDeep';
    import Alert from '@Partials/alerts/Alert.vue';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import InputTags from '@Partials/inputs/InputTags.vue';
    import AddButton from '@Partials/buttons/AddButton.vue';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import MoneyInput from '@Partials/inputs/MoneyInput.vue';
    import UndoButton from '@Partials/buttons/UndoButton.vue';
    import BackButton from '@Partials/buttons/BackButton.vue';
    import NumberInput from '@Partials/inputs/NumberInput.vue';
    import SelectInput from '@Partials/inputs/SelectInput.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import DeleteButton from '@Partials/buttons/DeleteButton.vue';
    import TextareaInput from '@Partials/inputs/TextareaInput.vue';
    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import LoadingBackdrop from '@Partials/backdrops/LoadingBackdrop.vue';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';
    import { getApi, putApi, postApi, deleteApi } from '@Repositories/api-repository.js';
    import ProductVariations from '@Pages/stores/store/products/variations/ProductVariations.vue';

    export default {
        mixins: [UtilsMixin, FormMixin],
        components: {
            Alert, TextInput, TextHeader, MoneyInput, InputTags, AddButton, UndoButton, BackButton, NumberInput, SelectInput,
            ConfirmModal, DeleteButton, TextareaInput, SpiningLoader, PrimaryButton, MoreInfoPopover, LoadingBackdrop, ToogleSwitch,
            InputErrorMessage, ProductVariations
        },
        data() {
            return {
                form: {
                    sku: '',
                    name: '',
                    barcode: '',
                    isFree: false,
                    visible: true,
                    description: '',
                    stockQuantity: '100',
                    unitSalePrice: '0.00',
                    variantAttributes: [],
                    allowVariations: false,
                    showDescription: false,
                    unitRegularPrice: '0.00',
                    stockQuantityType: 'Unlimited',
                    maximumAllowedQuantityPerOrder: '1',
                    allowedQuantityPerOrder: 'Unlimited',
                },
                product: null,
                isDeleting: false,
                originalForm: null,
                isSubmitting: false,
                isLoadingProduct: false,
                storeState: useStoreState(),
                isCreatingVariations: false,
                originalVariantAttributes: []
            }
        },
        watch: {
            '$route.params.product_href'(newValue, oldValue) {

                // Scroll to the top whenever $route.params.product_href changes
                window.scrollTo(0, 0);

                //  Get the product matching the route product_href
                this.getProduct();

            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isCreating() {
                return this.$route.name === 'create-store-product';
            },
            isEditting() {
                return this.$route.name === 'show-store-product';
            },
            hasVariantAttributes() {
                return this.form.variantAttributes.length;
            },
            hasOriginalVariantAttributes() {
                return this.originalVariantAttributes.length;
            },
            variantAttributesHaveChanged() {
                // Clone the arrays to avoid modifying the original data
                var a = cloneDeep(this.form.variantAttributes);
                var b = cloneDeep(this.originalVariantAttributes);

                // Loop through each object in the array and delete the property
                a.forEach(obj => delete obj.isEditable);
                b.forEach(obj => delete obj.isEditable);

                // Compare the modified arrays for equality
                return !isEqual(a, b);
            },
            formHasChanged() {
                // Clone the objects to avoid modifying the original data
                var a = cloneDeep(this.form);
                var b = cloneDeep(this.originalForm);

                // Compare the modified arrays for equality
                return !isEqual(a, b);
            },
            mustSaveChanges() {
                return this.isEditting && this.formHasChanged && !this.variantAttributesHaveChanged && !this.isLoadingProduct && !this.isSubmitting;
            },
            mustCreate() {
                return this.isCreating && this.formHasChanged && !this.isLoadingProduct && !this.isSubmitting;
            }
        },
        methods: {
            setProductFields() {
                this.form.sku = this.product.sku;
                this.form.name = this.product.name;
                this.form.barcode = this.product.barcode;
                this.form.isFree = this.product.isFree.status;
                this.form.visible = this.product.visible.status;
                this.form.description = this.product.description;
                this.form.allowVariations = this.product.allowVariations.status;
                this.form.showDescription = this.product.showDescription.status;
                this.form.stockQuantityType = this.product.stockQuantityType.value;
                this.form.stockQuantity = this.product.stockQuantity.value.toString();
                this.form.allowedQuantityPerOrder = this.product.allowedQuantityPerOrder.value;
                this.form.unitSalePrice = this.covertToValidMoney(this.product.unitSalePrice.amountWithoutCurrency);
                this.form.maximumAllowedQuantityPerOrder = this.product.maximumAllowedQuantityPerOrder.value.toString();
                this.form.unitRegularPrice = this.covertToValidMoney(this.product.unitRegularPrice.amountWithoutCurrency);

                this.form.variantAttributes = this.product.variantAttributes.map((variantAttribute) => {
                    //  Add the isEditable property
                    variantAttribute.isEditable = false;
                    return variantAttribute;
                });

                //  Capture the original variant attributes before editting
                this.originalVariantAttributes = cloneDeep(this.form.variantAttributes);

                //  Capture the original form before editting.
                this.originalForm = cloneDeep(this.form);

            },
            onAddVariantAttribute() {

                // Check if 'Size' variant attribute exists
                if (!this.form.variantAttributes.some(attribute => attribute.name.toLowerCase() === 'size')) {
                    this.form.variantAttributes.push({
                        'name': 'Size',
                        'isEditable': true,
                        'instruction': 'Select your size',
                        'values': ['Small', 'Medium', 'Large'],
                    });
                }
                // Check if 'Colour' variant attribute exists
                else if (!this.form.variantAttributes.some(attribute => attribute.name.toLowerCase() === 'colour')) {
                    this.form.variantAttributes.push({
                        'name': 'Colour',
                        'isEditable': true,
                        'instruction': 'Select your colour',
                        'values': ['Red', 'Blue', 'Green'],
                    });
                }
                // Check if 'Material' variant attribute exists
                else if (!this.form.variantAttributes.some(attribute => attribute.name.toLowerCase() === 'material')) {
                    this.form.variantAttributes.push({
                        'name': 'Material',
                        'isEditable': true,
                        'instruction': 'Select your material',
                        'values': ['Cotton', 'Nylon'],
                    });
                }
                // Add a default variant attribute if none of the above conditions are met
                else {
                    this.form.variantAttributes.push({
                        'name': '',
                        'isEditable': true,
                        'instruction': '',
                        'values': [],
                    });
                }
            },
            onRemoveVariantAttribute(index) {
                this.form.variantAttributes.splice(index, 1);
            },
            onResetVariantAttributes() {
                this.form.variantAttributes = cloneDeep(this.originalVariantAttributes);
            },
            getProduct() {

                //  Start loader
                this.isLoadingProduct = true;

                getApi(this.$route.params.product_href).then(response => {

                    if(response.status == 200) {
                        this.product = response.data;
                        this.setProductFields();
                    }

                    //  Stop loader
                    this.isLoadingProduct = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingProduct = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            createProduct() {

                //  Start loader
                this.isSubmitting = true;

                postApi(this.store._links.createProducts, this.form).then(response => {

                    if(response.status == 201) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Product created');

                        //  Navigate to show products
                        this.$router.push({ name: 'show-store-products', params: { 'store_href': this.store._links.self } });

                        // Scroll to the top
                        window.scrollTo(0, 0);

                    }

                    //  Stop loader
                    this.isSubmitting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            updateProduct() {

                //  Start loader
                this.isSubmitting = true;

                putApi(this.product._links.self, this.form).then(response => {

                    if(response.status == 200) {

                        this.originalForm = cloneDeep(this.form);

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Product updated');

                    }

                    //  Stop loader
                    this.isSubmitting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            deleteProduct() {

                //  Start loader
                this.isDeleting = true;

                deleteApi(this.product._links.deleteProduct, this.form).then(response => {

                    if(response.status == 200) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Product deleted');

                        //  If this product is a variation of another product
                        if(this.product._attributes.isVariation) {

                            //  Navigate to show parent product
                            this.$router.push({ name: 'show-store-product', params: { 'store_href': this.store._links.self, 'product_href': this.product._links.showParentProduct } });

                        }else{

                            //  Navigate to show products
                            this.$router.push({ name: 'show-store-products', params: { 'store_href': this.store._links.self } });

                            // Scroll to the top
                            window.scrollTo(0, 0);

                        }

                    }

                    //  Stop loader
                    this.isDeleting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeleting = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            createProductVariations() {

                if(this.isCreatingVariations) return;

                //  Start loader
                this.isCreatingVariations = true;

                let data = {
                    'variantAttributes': this.form.variantAttributes
                };

                postApi(this.product._links.createVariations, data).then(response => {

                    if(response.status == 201) {

                        this.form.variantAttributes = this.form.variantAttributes.map((variantAttribute) => {
                            variantAttribute.isEditable = false;
                            return variantAttribute;
                        });

                        this.originalForm.variantAttributes = cloneDeep(this.form.variantAttributes);

                        this.originalVariantAttributes = cloneDeep(this.form.variantAttributes);

                    }

                    //  Stop loader
                    this.isCreatingVariations = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isCreatingVariations = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
        },
        mounted() {

        },
        created() {
            this.originalForm = cloneDeep(this.form);
            if(this.isEditting) this.getProduct();
        }
    };

</script>
