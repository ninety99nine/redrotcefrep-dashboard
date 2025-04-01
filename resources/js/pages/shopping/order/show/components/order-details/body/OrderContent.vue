<template>

    <div>

        <!-- Header: Store Details -->
        <div class="flex justify-between items-start mb-6">

            <div class="flex items-center space-x-4">

                <!-- QR Code -->
                <img
                    alt="QR Code"
                    class="w-16 h-16 rounded"
                    v-if="store.qrCodeFilePath"
                    :src="store.qrCodeFilePath"
                />

                <!-- Logo -->
                <img
                    v-if="logo"
                    alt="Store Logo"
                    :src="logo.filePath"
                    class="w-16 h-16 rounded"
                />

                <!-- Store Name and Link -->
                <div>
                    <p class="text-xl font-bold">{{ store.name ?? 'Store' }}</p>
                    <p class="text-sm text-gray-500">{{ store._attributes.webLink }}</p>
                </div>

            </div>

        </div>

        <!-- Contact Information -->
        <div class="grid grid-cols-2 gap-4 mb-4">

            <!-- Customer -->
            <div class="col-span-1">

                <p class="font-semibold mb-1">Customer:</p>

                <LineSkeleton v-if="isLoadingOrder" :shine="true" class="mb-2"></LineSkeleton>
                <p v-else-if="order._attributes.customerName" class="text-gray-600 text-sm truncate">{{ order._attributes.customerName }}</p>

                <LineSkeleton v-if="isLoadingOrder" :shine="true" class="mb-2"></LineSkeleton>
                <p v-else-if="order.customerMobileNumber?.international" class="text-gray-600 text-sm truncate">
                    {{ order.customerMobileNumber.international }}
                </p>

                <LineSkeleton v-if="isLoadingOrder" :shine="true"></LineSkeleton>
                <p v-else-if="order.customerEmail" class="text-gray-600 text-sm truncate">{{ order.customerEmail }}</p>

            </div>

            <!-- Store Contact -->
            <div class="col-span-1">

                <p class="font-semibold mb-1">Store:</p>

                <LineSkeleton v-if="isLoadingOrder" :shine="true" class="mb-2"></LineSkeleton>
                <p v-else-if="store.email" class="text-gray-600 text-sm truncate">Email: {{ store.email }}</p>

                <LineSkeleton v-if="isLoadingOrder" :shine="true" class="mb-2"></LineSkeleton>
                <p v-else-if="store.whatsappMobileNumber?.international" class="text-gray-600 text-sm truncate">
                    WhatsApp: {{ store.whatsappMobileNumber.international }}
                </p>

                <LineSkeleton v-if="isLoadingOrder" :shine="true"></LineSkeleton>
                <p v-else-if="store.ussdMobileNumber?.international" class="text-gray-600 text-sm truncate">
                    USSD: {{ store.ussdMobileNumber.international }}
                </p>

          </div>

        </div>

        <!-- Order Details -->
        <div class="mb-6">

            <div class="grid grid-cols-2 gap-1 text-sm">

                <div class="col-span-1 flex items-center space-x-1">
                    <span class="font-semibold whitespace-nowrap">Order No:</span>
                    <LineSkeleton v-if="isLoadingOrder" :shine="true"></LineSkeleton>
                    <span v-else>#{{ order._attributes.number }}</span>
                </div>

                <div class="col-span-1 flex items-center space-x-1">
                    <span class="font-semibold">Date: </span>
                    <LineSkeleton v-if="isLoadingOrder" :shine="true"></LineSkeleton>
                    <span v-else>{{ formatDate(order.createdAt) }}</span>
                </div>

                <div class="col-span-1 flex items-center space-x-1"
                    v-if="!isLoadingOrder && order.deliveryMethodName">
                    <span class="font-semibold">Delivery Method: </span>
                    <span>{{ order.deliveryMethodName }}</span>
                </div>

                <div v-if="isLoadingOrder || courier" class="col-span-1 flex items-center space-x-1">
                    <span class="font-semibold whitespace-nowrap">Tracking No:</span>
                    <LineSkeleton v-if="isLoadingOrder" :shine="true"></LineSkeleton>
                    <ExternalLink v-else :url="courier.trackingPage" :openInNewTab="false" class="text-xs">
                        {{ order.trackingNumber }}
                    </ExternalLink>
                </div>

            </div>

        </div>

        <!-- Products Table -->
        <div class="border border-gray-300 rounded overflow-hidden mb-6">

            <table class="w-full text-xs text-left">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="border p-2">Item</th>
                        <th class="border p-2 text-center">Quantity</th>
                        <th class="border p-2">Unit Price</th>
                        <th class="border p-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="isLoadingOrder">
                        <td class="border p-2">
                            <LineSkeleton :shine="true"></LineSkeleton>
                        </td>
                        <td class="border p-2">
                            <LineSkeleton :shine="true"></LineSkeleton>
                        </td>
                        <td class="border p-2">
                            <LineSkeleton :shine="true"></LineSkeleton>
                        </td>
                        <td class="border p-2">
                            <LineSkeleton :shine="true"></LineSkeleton>
                        </td>
                    </tr>
                    <template v-else>
                        <tr v-for="(product, idx) in orderProducts" :key="idx">
                            <td class="border p-2">{{ product.name }}</td>
                            <td class="border p-2 text-center">{{ product.quantity ?? 0 }}</td>
                            <td class="border p-2">{{ product.unitPrice.amountWithCurrency }}</td>
                            <td class="border p-2">{{ product.grandTotal.amountWithCurrency }}</td>
                        </tr>
                    </template>
                </tbody>
            </table>

        </div>

        <!-- Totals -->
        <div class="flex justify-end px-2">

            <div class="w-full md:w-3/4">

                <table class="w-full text-sm">

                    <tr class="border-b border-dashed">
                        <td class="text-right py-1 text-gray-600">Subtotal:</td>
                        <td v-if="isLoadingOrder" class="w-24 pl-4"><LineSkeleton width="w-full" :shine="true"></LineSkeleton></td>
                        <td v-else class="text-right py-1">{{ order.subtotal.amountWithCurrency }}</td>
                    </tr>

                    <tr
                        class="border-b border-dashed text-gray-500"
                        v-if="isLoadingOrder || order.discountTotal.amount > 0">
                        <td class="text-right py-1">Discount:</td>
                        <td v-if="isLoadingOrder" class="w-24 pl-4"><LineSkeleton width="w-full" :shine="true"></LineSkeleton></td>
                        <td v-else class="text-right py-1">{{ order.discountTotal.amountWithCurrency }}</td>
                    </tr>

                    <tr
                        class="border-b border-dashed"
                        v-if="isLoadingOrder || order.vatAmount > 0">
                        <td class="text-right py-1">Tax {{ isLoadingOrder ? '' : `(${order.vatRate.valueSymbol})` }}:</td>
                        <td v-if="isLoadingOrder" class="w-24 pl-4"><LineSkeleton width="w-full" :shine="true"></LineSkeleton></td>
                        <td v-else class="text-right py-1">{{ order.vatAmount.amountWithCurrency }}</td>
                    </tr>

                    <tr
                        class="border-b border-dashed"
                        v-if="isLoadingOrder || order.feeTotal.amount > 0">
                        <td class="text-right py-1">Additional Fees:</td>
                        <td v-if="isLoadingOrder" class="w-24 pl-4"><LineSkeleton width="w-full" :shine="true"></LineSkeleton></td>
                        <td v-else class="text-right py-1">{{ order.feeTotal.amountWithCurrency }}</td>
                    </tr>

                    <tr class="text-base font-bold border-b border-dashed">
                        <td class="text-right py-2">Grand Total:</td>
                        <td v-if="isLoadingOrder" class="w-24 pl-4"><LineSkeleton width="w-full" :shine="true"></LineSkeleton></td>
                        <td v-else class="text-right py-2">{{ order.grandTotal.amountWithCurrency }}</td>
                    </tr>

                </table>

            </div>

        </div>

        <p class="text-center text-gray-500 mt-8">Thank you!</p>

    </div>

  </template>

  <script>

    import ExternalLink from '@Partials/links/ExternalLink.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';

    export default {
        inject: ['orderState', 'storeState'],
        components: { ExternalLink, LineSkeleton },
        computed: {
            order() {
                return this.orderState.order;
            },
            store() {
                return this.storeState.store;
            },
            logo() {
                return this.store._relationships.logo;
            },
            isLoadingOrder() {
                return this.orderState.isLoadingOrder;
            },
            orderProducts() {
                return this.order._relationships.orderProducts;
            },
            courier() {
                return this.store._relationships.courier;
            }
        },
        methods: {
            formatDate(dateStr) {
                if (!dateStr) return 'N/A';
                const date = new Date(dateStr);
                return date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                });
            }
        }
    };
  </script>
