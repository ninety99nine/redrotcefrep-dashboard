<template>

    <div>

        <div class="space-y-2 pb-4 mb-4 border-b border-dashed">

            <div class="flex space-x-2 items-center">
                <span class="text-sm">Main Text</span>
                <Colorpicker v-model="storeForm.textColor" :disableHistory="true" :disableAlpha="true"></Colorpicker>
            </div>

            <div class="flex space-x-2 items-center">
                <span class="text-sm">Main Background</span>
                <Colorpicker v-model="storeForm.bgColor" :disableHistory="true" :disableAlpha="true"></Colorpicker>
            </div>

        </div>

        <div class="space-y-2 pb-4 mb-4 border-b border-dashed">

            <div class="flex space-x-2 items-center">
                <span class="text-sm">Banner Text</span>
                <Colorpicker v-model="storeForm.bannerTextColor" :disableHistory="true" :disableAlpha="true"></Colorpicker>
            </div>

            <div class="flex space-x-2 items-center">
                <span class="text-sm">Banner Background</span>
                <Colorpicker v-model="storeForm.bannerColor" :disableHistory="true" :disableAlpha="true"></Colorpicker>
            </div>

        </div>

        <div class="space-y-2 pb-4 mb-4 border-b border-dashed">

            <div class="flex space-x-2 items-center">
                <span class="text-sm">Secondary Button</span>
                <Colorpicker v-model="storeForm.secondaryButtonColor" :disableHistory="true" :disableAlpha="true"></Colorpicker>
            </div>

            <div class="flex space-x-2 items-center">
                <span class="text-sm">Secondary Text Button</span>
                <Colorpicker v-model="storeForm.secondaryButtonTextColor" :disableHistory="true" :disableAlpha="true"></Colorpicker>
            </div>

        </div>

        <div class="space-y-2 pb-4 mb-4 border-b border-dashed">

            <div class="flex space-x-2 items-center">
                <span class="text-sm">Primary Button</span>
                <Colorpicker v-model="storeForm.primaryButtonColor" :disableHistory="true" :disableAlpha="true"></Colorpicker>
            </div>

            <div class="flex space-x-2 items-center">
                <span class="text-sm">Primary Text Button</span>
                <Colorpicker v-model="storeForm.primaryButtonTextColor" :disableHistory="true" :disableAlpha="true"></Colorpicker>
            </div>

        </div>

        <div class="space-y-2 pb-4 mb-4 border-b border-dashed">

            <div class="flex space-x-2 items-center">
                <span class="text-sm">Card Primary</span>
                <Colorpicker v-model="storeForm.cardPrimaryColor" :disableHistory="true" :disableAlpha="true"></Colorpicker>
            </div>

            <div class="flex space-x-2 items-center">
                <span class="text-sm">Card Secondary</span>
                <Colorpicker v-model="storeForm.cardSecondaryColor" :disableHistory="true" :disableAlpha="true"></Colorpicker>
            </div>

            <div class="flex space-x-2 items-center">
                <span class="text-sm">Card Heading Text</span>
                <Colorpicker v-model="storeForm.cardHeadingTextColor" :disableHistory="true" :disableAlpha="true"></Colorpicker>
            </div>

        </div>

        <div class="space-y-2 pb-4 mb-4 border-b border-dashed">

            <div class="flex space-x-2 items-center">
                <span class="text-sm">Product Bg</span>
                <Colorpicker v-model="storeForm.productBgColor" :disableHistory="true" :disableAlpha="true"></Colorpicker>
            </div>

            <div class="flex space-x-2 items-center">
                <span class="text-sm">Product Name</span>
                <Colorpicker v-model="storeForm.productNameColor" :disableHistory="true" :disableAlpha="true"></Colorpicker>
            </div>

            <div class="flex space-x-2 items-center">
                <span class="text-sm">Product Price</span>
                <Colorpicker v-model="storeForm.productPriceColor" :disableHistory="true" :disableAlpha="true"></Colorpicker>
            </div>

            <div class="flex space-x-2 items-center">
                <span class="text-sm">Product Quantity</span>
                <Colorpicker v-model="storeForm.productQuantityColor" :disableHistory="true" :disableAlpha="true"></Colorpicker>
            </div>

        </div>

        <div class="space-y-2 pb-4 mb-4 border-b border-dashed">

            <div class="flex space-x-2 items-center">
                <span class="text-sm">Product Bg</span>
                <Colorpicker v-model="storeForm.productHoverBgColor" :disableHistory="true" :disableAlpha="true"></Colorpicker>
            </div>

            <div class="flex space-x-2 items-center">
                <span class="text-sm">Product Name</span>
                <Colorpicker v-model="storeForm.productHoverNameColor" :disableHistory="true" :disableAlpha="true"></Colorpicker>
            </div>

            <div class="flex space-x-2 items-center">
                <span class="text-sm">Product Price</span>
                <Colorpicker v-model="storeForm.productHoverPriceColor" :disableHistory="true" :disableAlpha="true"></Colorpicker>
            </div>

            <div class="flex space-x-2 items-center">
                <span class="text-sm">Product Quantity</span>
                <Colorpicker v-model="storeForm.productHoverQuantityColor" :disableHistory="true" :disableAlpha="true"></Colorpicker>
            </div>

        </div>

    </div>

</template>

<script>

    import Colorpicker from '@Partials/colorpicker/Colorpicker.vue';

    export default {
        inject: ['storeState'],
        components: { Colorpicker },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            },
        }
    };

</script>
