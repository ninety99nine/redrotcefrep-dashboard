<template>

    <div class="px-16 pt-8">

        <div class="flex items-center border-dashed border-b py-6 mb-6">

            <!-- Text Heading -->
            <TextHeader>Subscription Plans</TextHeader>

                <!-- More Info Popover -->
            <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Subscription plans are pricing packages for various services of the application such as Store, AI Assistant and SMS Alert payment plans." placement="top"></MoreInfoPopover>

        </div>

        <!-- Subscription Plans Table -->
        <BasicTable :pagination="pagination" :isLoading="isFetching" @paginate="paginate" @search="search" @refresh="_getSubscriptionPlans" :totalHeaders="tableHeaders.length">

            <!-- Table Header -->
            <template v-slot:head>
                <tr>
                    <th v-for="(tableHeader, index) in tableHeaders" :key="index" scope="col" class="whitespace-nowrap px-4 py-3">
                        {{ tableHeader }}
                    </th>
                </tr>
            </template>

            <!-- Table Body -->
            <template v-slot:body>
                <tr @click.stop="onView(subscriptionPlan)" v-for="(subscriptionPlan, index) in subscriptionPlans" :key="index" class="group cursor-pointer bg-white hover:bg-gray-50 border-b">

                    <td class="whitespace-nowrap px-4 py-4">{{ subscriptionPlan.name }}</td>
                    <td class="whitespace-nowrap px-4 py-4">{{ subscriptionPlan.description }}</td>
                    <td class="whitespace-nowrap px-4 py-4">{{ subscriptionPlan.service }}</td>
                    <td class="whitespace-nowrap px-4 py-4">{{ subscriptionPlan.type }}</td>
                    <td class="whitespace-nowrap px-4 py-4">
                        <BadgeIndicator :type="subscriptionPlan.status ? 'success' : 'info'" :text="subscriptionPlan ? 'Active' : 'Inactive'"></BadgeIndicator>
                    </td>
                    <td class="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-4 space-x-4">
                        <a href="#" @click.stop.prevent="onEdit(subscriptionPlan)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        <a href="#" @click.stop.prevent="onDelete(subscriptionPlan)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                    </td>

                </tr>
            </template>

        </BasicTable>

    </div>

</template>

<script>

    import { initFlowbite } from "flowbite";
    import { getSubscriptionPlans } from '@Repositories/subscription-plan-repository.js';

    export default {
        data() {
            return {
                url: null,
                searchTerm: null,
                pagination: null,
                isFetching: false,
                subscriptionPlans: [],
                tableHeaders: ['Name', 'Description', 'Service', 'Type', 'Status', '']
            }
        },
        methods: {
            onView(subscriptionPlan) {
                console.log('view:'+subscriptionPlan.name);
            },
            onEdit(subscriptionPlan) {
                console.log('edit:'+subscriptionPlan.name);
            },
            onDelete(subscriptionPlan) {
                console.log('delete:'+subscriptionPlan.name);
            },
            paginate(url) {
                this.url = url;
                this._getSubscriptionPlans();
            },
            search(searchTerm) {
                this.url = null;
                this.searchTerm = searchTerm;
                this._getSubscriptionPlans();
            },
            _getSubscriptionPlans() {

                this.isFetching = true;

                getSubscriptionPlans(this.url, this.searchTerm).then(response => {

                    if(response.status == 200) {

                        this.pagination = response.data;
                        this.subscriptionPlans = this.pagination.data;

                    }

                    //  Stop loader
                    this.isFetching = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isFetching = false;

                });

            },
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
            this._getSubscriptionPlans();
        }
    };

</script>
