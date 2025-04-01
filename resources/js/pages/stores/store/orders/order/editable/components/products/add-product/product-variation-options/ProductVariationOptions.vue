<template>

    <div class="space-y-2 mb-4">

        <template v-if="isLoadingProductVariations">

            <div
                :key="index"
                v-for="(_, index) in [1, 2, 3]"
                class="border-b shadow-sm rounded-lg p-2 bg-gray-50 w-full">

                <!-- Skeleton Loading -->
                <LineSkeleton width="w-1/3" :shine="true"></LineSkeleton>

            </div>

        </template>

        <template v-else>

            <div class="space-y-3 mb-4">

                <template
                    :key="index"
                    v-for="(variantAttribute, index) in selectedProduct.variantAttributes">

                    <SelectInput
                        width="w-full"
                        :label="variantAttribute.name"
                        :description="variantAttribute.instruction"
                        v-model="variantAttributeValues[variantAttribute.name]">
                        <option v-for="(value, i) in variantAttribute.values" :value="value" :key="i">
                            {{ value }}
                        </option>
                    </SelectInput>

                </template>

            </div>

            <!-- Matching Variation -->
            <ProductOption
                :product="matchingVariations[0]"
                :onSelectProduct="onSelectProduct"
                v-if="matchingVariations.length === 1">
            </ProductOption>

        </template>

    </div>

</template>

<script>

    import axios from 'axios';
    import SelectInput from '@Partials/inputs/SelectInput.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import ProductOption from '@Pages/stores/store/orders/order/editable/components/products/add-product/product-options/ProductOption.vue';

    export default {
        inject: ['formState'],
        components: { SelectInput, LineSkeleton, ProductOption },
        props: {
            selectedProduct: {
                type: Object
            },
            onSelectProduct: {
                type: Function
            }
        },
        data() {
            return {
                variations: [],
                variantAttributeValues: {},
                isLoadingProductVariations: false,
            }
        },
        computed: {
            matchingVariations() {
                // Filter variations based on selected attributes
                return this.variations.filter((variation) => {
                    return Object.entries(this.variantAttributeValues).every(([attrName, selectedValue]) => {
                        // Check if the variation contains this attribute and the selected value matches
                        return variation._relationships.variables.some(variable =>
                            variable.value === selectedValue
                        );
                    });
                });
            }
        },
        methods: {
            initializeVariantDefaults() {
                this.variantAttributeValues = {};

                this.selectedProduct.variantAttributes.forEach(attr => {
                    if (attr.values.length > 0) {
                        this.variantAttributeValues[attr.name] = attr.values[0]; // Select first option by default
                    }
                });
            },
            async getProductVariations() {

                this.isLoadingProductVariations = true;

                const url = this.selectedProduct._links.showProductVariations;

                let config = {
                    params: {
                        '_relationships': 'photo',
                        'per_page': 100
                    }
                };

                try {
                    const response = await axios.get(url, config);

                    if (response.status === 200) {

                        const pagination = response.data;
                        this.variations = pagination.data;
                        this.initializeVariantDefaults();

                    } else {
                        this.formState.setFormError('general', response.data.message);
                        this.notificationState.showWarningNotification(response.data.message);
                    }
                } catch (errorException) {
                    this.formState.setServerFormErrors(errorException);
                }

                this.isLoadingProductVariations = false;
                this.hasLoadedInitialProducts = true;
            },
        },
        created() {
            this.getProductVariations();
        }
    };

</script>
