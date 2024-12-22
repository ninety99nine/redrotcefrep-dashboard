<template>

    <div>

        <!-- Subscription Countdown -->
        <div class="bg-white shadow-lg rounded-t-lg border border-b-2 p-4 mt-6">

            <!-- User Store Subscription Countdown -->
            <UserStoreSubscriptionCountdown></UserStoreSubscriptionCountdown>

        </div>

        <div class="grid grid-cols-4 gap-4 mb-6">

            <div :class="['col-span-4 bg-white shadow-lg border p-8 rounded-b-lg']">

                <div class="flex justify-end items-center space-x-2 mb-4">

                    <!-- Available Category Tags -->
                    <div>
                        <SelectInputTags
                            :key="insights.length"
                            placeholder="Select insight"
                            :tags="selectedCategories"
                            @onTagsChanged="addCategories"
                            :selectableTags="availableCategoryOptions"
                        />
                    </div>

                    <!-- Insight Period Select Input -->
                    <SelectInput
                        v-model="period"
                        labelPopoverTitle="What Is This?"
                        :errorText="getFormError('period')"
                        labelPopoverDescription="Select the period to show insights">
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="this week">This Week</option>
                        <option value="this month">This Month</option>
                        <option value="this year">This Year</option>
                    </SelectInput>

                </div>

                <div v-for="(insight, index) in insights" :key="index" :class="{ 'pt-8 border-t border-dashed' : index != 0 }">

                    <!-- Insight Title, Description, Categories & Period -->
                    <div class="space-y-3">

                        <!-- Insight Title -->
                        <ShineEffect v-if="isLoadingStoreInsights">
                            <LineSkeleton width="w-24"></LineSkeleton>
                        </ShineEffect>
                        <h1 v-else class="text-lg font-bold">{{ insight.title }}</h1>

                        <!-- Insight Description -->
                        <ShineEffect v-if="isLoadingStoreInsights">
                            <LineSkeleton width="w-60"></LineSkeleton>
                        </ShineEffect>
                        <p v-else class="text-sm text-gray-400">{{ insight.description }}</p>

                    </div>

                    <!-- Category Insights -->
                    <div class="grid grid-cols-4 gap-8 my-6">

                        <div v-for="(categoryInsight, index) in insight.categoryInsights" :key="index" class="col-span-1 space-y-4">

                            <!-- Category Insight -->
                            <div class="flex flex-col items-center space-y-2">

                                <ShineEffect v-if="isLoadingStoreInsights">
                                    <RoundSkeleton size="w-8 h-8"></RoundSkeleton>
                                </ShineEffect>

                                <!-- Icon -->
                                <svg v-else-if="categoryInsight.type == 'total_sales'" class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                </svg>
                                <svg v-else-if="categoryInsight.type == 'average_sale_per_order'" class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                </svg>
                                <svg v-else-if="categoryInsight.type == 'highest_sale_period'" class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                                </svg>
                                <svg v-else-if="categoryInsight.type == 'lowest_sale_period'" class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                                </svg>
                                <svg v-else-if="categoryInsight.type == 'total_orders'" class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                <svg v-else-if="categoryInsight.type == 'most_orders'" class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                </svg>
                                <svg v-else-if="categoryInsight.type == 'least_orders'" class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                                </svg>
                                <svg v-else-if="categoryInsight.type == 'top_selling'" class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                                <svg v-else-if="categoryInsight.type == 'least_selling'" class="w-8 h-8 text-gray-500 rotate-45" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                                <svg v-else-if="categoryInsight.type == 'products_sold'" class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                                </svg>
                                <svg v-else-if="categoryInsight.type == 'products_cancelled'" class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 0 1 3.15 0v1.5m-3.15 0 .075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 0 1 3.15 0V15M6.9 7.575a1.575 1.575 0 1 0-3.15 0v8.175a6.75 6.75 0 0 0 6.75 6.75h2.018a5.25 5.25 0 0 0 3.712-1.538l1.732-1.732a5.25 5.25 0 0 0 1.538-3.712l.003-2.024a.668.668 0 0 1 .198-.471 1.575 1.575 0 1 0-2.228-2.228 3.818 3.818 0 0 0-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0 1 16.35 15m.002 0h-.002" />
                                </svg>
                                <svg v-else-if="categoryInsight.type == 'offered_discounts'" class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.99 14.993 6-6m6 3.001c0 1.268-.63 2.39-1.593 3.069a3.746 3.746 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043 3.745 3.745 0 0 1-3.068 1.593c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 0 1-3.296-1.043 3.746 3.746 0 0 1-1.043-3.297 3.746 3.746 0 0 1-1.593-3.068c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 0 1 1.043-3.297 3.745 3.745 0 0 1 3.296-1.042 3.745 3.745 0 0 1 3.068-1.594c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.297 3.746 3.746 0 0 1 1.593 3.068ZM9.74 9.743h.008v.007H9.74v-.007Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                <svg v-else-if="categoryInsight.type == 'average_revenue_per_product'" class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                </svg>
                                <svg v-else-if="categoryInsight.type == 'total_customers'" class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                </svg>
                                <svg v-else-if="categoryInsight.type == 'new_customers'" class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                </svg>
                                <svg v-else-if="categoryInsight.type == 'return_customers'" class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                <svg v-else-if="categoryInsight.type == 'retention_rate'" class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                </svg>
                                <svg v-else-if="categoryInsight.type == 'revenue_per_customer'" class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                </svg>
                                <svg v-else-if="categoryInsight.type == 'customer_growth_rate'" class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                                </svg>
                                <svg v-else class="w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                                </svg>

                                <!-- Name -->
                                <ShineEffect v-if="isLoadingStoreInsights" class="flex space-x-1">
                                    <LineSkeleton width="w-24"></LineSkeleton>
                                    <LineSkeleton width="w-4"></LineSkeleton>
                                </ShineEffect>
                                <div v-else class="flex space-x-1 items-center">
                                    <p class="text-gray-500 text-sm">{{ capitalizeAllWords(categoryInsight.name) }}</p>
                                    <MoreInfoPopover title="What Is This?" :description="categoryInsight.description" placement="top"></MoreInfoPopover>
                                </div>

                                <!-- Metric -->
                                <ShineEffect v-if="isLoadingStoreInsights">
                                    <LineSkeleton width="w-16"></LineSkeleton>
                                </ShineEffect>
                                <p v-else class="font-bold text-xl">{{ categoryInsight.metric }}</p>

                            </div>

                        </div>

                    </div>

                    <div v-if="index == insights.length - 1" class="flex justify-center items-center border-t border-dashed pt-8">

                        <PrimaryButton :action="showingAllInsights ? showLessInsights : showMoreInsights" class="w-40" type="light" size="xs">
                            <template v-if="showingAllInsights">
                                <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                                </svg>
                                <span class="mr-2">show less</span>
                            </template>
                            <template v-else>
                                <svg class="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                                </svg>
                                <span class="mr-2">show more</span>
                            </template>
                        </PrimaryButton>

                    </div>

                </div>

            </div>

            <div class="col-span-3">

                <div class="bg-white shadow-lg border rounded-lg p-4">

                    <template v-if="isLoadingQuickStartGuide || !completedQuickStartGuide">

                        <div class="flex justify-between">

                            <div class="w-full space-y-4 mb-6">

                                <!-- Quick Start Guide (Heading) -->
                                <h1 class="text-lg font-bold">Quick Start Guide</h1>

                                <!-- Quick Start Guide (Instructions) -->
                                <p class="text-sm text-gray-500">Here's a guide to get you selling in minutes.</p>

                                <!-- Quick Start Guide (Progress) -->
                                <StoreQuickStartGuideProgress></StoreQuickStartGuideProgress>

                                <!-- Milestone Skeletons -->
                                <ShineEffect v-if="isLoadingQuickStartGuide" class="space-y-4">
                                    <div v-for="(item, index) in 5" :key="index" class="flex items-center space-x-2">
                                        <RoundSkeleton size="w-3 h-3"></RoundSkeleton>
                                        <LineSkeleton :width="['w-40', 'w-48', 'w-60', 'w-80', 'w-72'][index]"></LineSkeleton>
                                    </div>
                                </ShineEffect>

                                <!-- Milestones -->
                                <div v-else-if="!completedQuickStartGuide" class="text-sm space-y-3">

                                    <div v-for="(milestone, index) in quickStartGuide.milestones" :key="index" class="flex items-center space-x-2">

                                        <!-- Milestone Completed Checkmark Icon -->
                                        <svg v-if="showMilestoneCheckmark(milestone)" :class="milestoneIconClass(milestone)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                                        </svg>

                                        <!-- Milestone Not Completed Circle -->
                                        <div v-else class="rounded-full border border-dashed border-gray-300 w-6 h-6"></div>

                                        <!-- Milestone Title -->
                                        <span :class="{ 'text-yellow-500' : (showMilestoneCheckmark(milestone) && milestone.status == false)}">

                                            <!-- Add Products Action -->
                                            <template v-if="milestone.type == 'added products' && milestone.status == false">
                                                <span @click="navigateToAddProduct" class="hover:opacity-80 active:opacity-50 active:scale-90 underline decoration-dashed underline-offset-4 cursor-pointer">{{ milestone.title }} 🛍️</span>
                                            </template>

                                            <!-- Dial Store Action -->
                                            <template v-else-if="milestone.type == 'dialed store' && milestone.status == false">
                                                <span>Dial your store on </span>
                                                <MobileNumberShortcode></MobileNumberShortcode>
                                            </template>

                                            <!-- Subscribe Action -->
                                            <template v-else-if="milestone.type == 'subscribed' && milestone.status == false">
                                                <span>Open for business by </span>
                                                <StoreSubscribeButton>
                                                    <template #trigger="triggerProps">
                                                        <span @click="triggerProps.showModal" class="hover:opacity-80 active:opacity-50 active:scale-90 underline decoration-dashed underline-offset-4 cursor-pointer">subscribing</span>
                                                    </template>
                                                </StoreSubscribeButton>
                                            </template>

                                            <span v-else>{{ milestone.title }}</span>
                                        </span>

                                        <!-- Milestone More Info Popover -->
                                        <template v-if="(showMilestoneCheckmark(milestone) && milestone.status == false)">
                                            <MoreInfoPopover title="Subscription Expired" placement="top">
                                                <template #description>
                                                    <hr>
                                                    <p>Renew your subscription to reopen your store and allow customers to place orders</p>
                                                </template>
                                            </MoreInfoPopover>
                                        </template>

                                    </div>

                                </div>

                            </div>

                            <div class="">
                                <iframe width="400" height="225" class="rounded-lg shadow-md" src="https://www.youtube.com/embed/u31qwQUeGuM" title="Placeholder video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </div>

                        </div>

                    </template>

                    <div v-else class="flex justify-between">
                        <div class="space-y-2">
                            <p class="text-gray-500">Congratulations 👏 you are ready for market</p>
                            <p class="text-gray-500">Tell your customers to dial and access your store 🎉</p>
                            <MobileNumberShortcode>
                                <template #trigger="triggerProps">
                                    <p @click="triggerProps.showModal" class="font-bold text-2xl hover:opacity-80 active:opacity-50 active:scale-90 underline decoration-dashed underline-offset-4 cursor-pointer">{{ mobileNumberShortcode }}</p>
                                </template>
                            </MobileNumberShortcode>
                        </div>
                        <div class="h-72 overflow-hidden">
                            <VirtualPhone></VirtualPhone>
                        </div>
                    </div>

                </div>

            </div>

            <div class="col-span-1 space-y-4">

                <!-- Support payments -->
                <div class="bg-white shadow-lg rounded-lg border p-4 space-y-3">

                    <span class="text-sm">Support payments using Orange Money or Credit/Debit Cards</span>

                    <div class="flex justify-end">

                        <PrimaryButton :action="navigateToAddCoupon" class="w-40" size="xs">
                            <span class="mr-2">Allow Payments</span>
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                                <path fill-rule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clip-rule="evenodd" />
                                <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                            </svg>
                        </PrimaryButton>

                    </div>

                </div>

                <!-- Support delivery -->
                <div class="bg-white shadow-lg rounded-lg border p-4 space-y-3">

                    <span class="text-sm">Support order delivery</span>

                    <div class="flex justify-end">

                        <PrimaryButton :action="navigateToAddCoupon" class="w-40" size="xs">
                            <span class="mr-2">Allow Delivery</span>
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 1 1 6 0h3a.75.75 0 0 0 .75-.75V15Z" />
                                <path d="M8.25 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0ZM15.75 6.75a.75.75 0 0 0-.75.75v11.25c0 .087.015.17.042.248a3 3 0 0 1 5.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 0 0-3.732-10.104 1.837 1.837 0 0 0-1.47-.725H15.75Z" />
                                <path d="M19.5 19.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                            </svg>
                        </PrimaryButton>

                    </div>

                </div>

            </div>

        </div>

        <div class="grid grid-cols-2 gap-4">

            <!-- No Products -->
            <div class="col-span-1">
                <div class="flex justify-between space-x-4 bg-white shadow-lg rounded-lg border p-8">
                    <div class="space-y-4">
                        <h1 class="text-xl font-bold">Add your products</h1>
                        <p class="text-sm">Start by stocking your store with products your customers will love</p>

                        <!-- Add Product Button -->
                        <AddButton :action="navigateToAddProduct" class="w-40" size="sm">
                            <span class="ml-2">Add Product</span>
                        </AddButton>
                    </div>
                    <div>
                        <span class="text-6xl">🛍️</span>
                    </div>
                </div>
            </div>

            <!-- No Coupons -->
            <div class="col-span-1">
                <div class="flex justify-between space-x-4 bg-white shadow-lg rounded-lg border p-8">
                    <div class="space-y-4">
                        <h1 class="text-xl font-bold">Add your coupons</h1>
                        <p class="text-sm">Create amazing incentives for your customers, such as offering <span class="underline decoration-dashed underline-offset-4">discounts</span> or <span class="underline decoration-dashed underline-offset-4">free delivery</span>, while determining who can claim them and when.</p>

                        <!-- Add Coupon Button -->
                        <AddButton :action="navigateToAddCoupon" class="w-40" size="sm">
                            <span class="ml-2">Add Coupon</span>
                        </AddButton>
                    </div>
                    <div>
                        <span class="text-6xl">🥰</span>
                    </div>
                </div>
            </div>

            <!-- No Team Members -->
            <div class="col-span-2 space-y-4">

                <div class="flex justify-between space-x-4 bg-white shadow-lg rounded-lg border p-8">
                    <div class="space-y-4">
                        <h1 class="text-xl font-bold">Build Your Team</h1>
                        <p class="text-sm">Invite others to help manage your store. Collaborate by adding team members to help you grow your business.</p>

                        <!-- Add Team Member Button -->
                        <AddButton :action="navigateToInviteTeamMember" class="w-60" size="sm">
                            <span class="ml-2">Add Team Member</span>
                        </AddButton>
                    </div>
                    <div>
                        <span class="text-6xl">💪</span>
                    </div>
                </div>

                <!-- Delete Store -->
                <div class="space-y-4 shadow-lg rounded-lg border p-4 border-red-300 bg-red-50">

                    <!-- Delete Store Info -->
                    <p>Do you want to permanently delete <span class="font-bold text-black">{{ store.name }}</span>? Once this store is deleted you will not be able to recover it.</p>

                    <div class="flex justify-end">

                        <ConfirmModal approveText="Delete Store" :approveAction="deleteStore" :approveDisabled="deleteConfirmationCodeInvalid" :isLoading="isDeletingStore" :onShow="showDeleteStoreConfirmationCode">

                            <template #content>

                                <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                                <p class="mb-4">Are you sure you want to permanently delete <span class="font-bold text-black">{{ store.name }}</span>? Confirm by entering the confirmation code below</p>

                                <div v-if="isLoadingDeleteCode" class="flex justify-center space-x-2 animate-pulse mb-8">
                                    <SpiningLoader></SpiningLoader>
                                    <span class="text-xs">Loading code ...</span>
                                </div>
                                <p v-else class="font-bold text-4xl text-center mb-8">{{ validDeleteConfirmationCode }}</p>

                                <!-- Delete Collection Code Input -->
                                <OtpInput v-model="deleteConfirmationCode" :errorText="getFormError('deleteConfirmationCode')" class="mb-8"></OtpInput>

                            </template>

                            <template #trigger="triggerProps">

                                <!-- Delete Store Button - Triggers Confirmation Modal -->
                                <PrimaryButton @click="triggerProps.showModal" :loading="isDeletingStore" class="w-40" type="danger">
                                    Delete Store
                                </PrimaryButton>

                            </template>


                        </ConfirmModal>

                    </div>

                </div>

            </div>

        </div>


    </div>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useAuthState } from '@Stores/auth-store.js';
    import { useStoreState } from '@Stores/store-store.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import AddButton from '@Partials/buttons/AddButton.vue';
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import Countdown from '@Partials/countdowns/Countdown.vue';
    import SelectInput from '@Partials/inputs/SelectInput.vue';
    import OrderStatus from '@Components/order/OrderStatus.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import OtpInput from '@Partials/inputs/otp-inputs/OtpInput.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import RoundSkeleton from '@Partials/skeletons/RoundSkeleton.vue';
    import SelectInputTags from '@Partials/inputs/SelectInputTags.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import VirtualPhone from '@Components/virtual-phone/VirtualPhone.vue';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import OrderPaymentStatus from '@Components/order/OrderPaymentStatus.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';
    import { getApi, postApi, deleteApi } from '@Repositories/api-repository.js';
    import StoreSubscribeButton from '@Components/store/StoreSubscribeButton.vue';
    import MobileNumberShortcode from '@Components/user/MobileNumberShortcode.vue';
    import OrderCollectionStatus from '@Components/order/OrderCollectionStatus.vue';
    import StoreQuickStartGuideProgress from '@Components/store/StoreQuickStartGuideProgress.vue';
    import UserStoreSubscriptionCountdown from '@Components/store/UserStoreSubscriptionCountdown.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: {
            TextHeader, AddButton, BasicTable, Checkbox, Countdown, SelectInput, OrderStatus, ConfirmModal, ShineEffect,
            OtpInput, LineSkeleton, SpiningLoader, PrimaryButton, RoundSkeleton, SelectInputTags, MoreInfoPopover,
            ToogleSwitch, VirtualPhone, OrderPaymentStatus, BadgeIndicator, StoreSubscribeButton, MobileNumberShortcode,
            OrderCollectionStatus, StoreQuickStartGuideProgress, UserStoreSubscriptionCountdown
        },
        data() {
            return {
                insights: [
                    {
                        categoryInsights: [1, 2, 3, 4]
                    }
                ],
                period: 'today',
                maxTotalInsights: 4,
                categories: ['sales'],
                isDeletingStore: false,
                authState: useAuthState(),
                isLoadingDeleteCode: false,
                deleteConfirmationCode: '',
                storeState: useStoreState(),
                isLoadingStoreInsights: false,
                validDeleteConfirmationCode: '',
                categoryOptions: ['sales', 'orders', 'products', 'customers', 'operations']
            }
        },
        watch: {
            'period'(newValue, oldValue) {
                this.showStoreInsights();
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            quickStartGuide() {
                return this.storeState.quickStartGuide;
            },
            showingAllInsights() {
                return this.insights.length == this.maxTotalInsights;
            },
            selectedCategories() {
                return this.categories.map((category) => {
                    return { text: category };
                });
            },
            availableCategoryOptions() {
                return this.categoryOptions.map((category) => {
                    return { text: category };
                });
            },
            isLoadingQuickStartGuide() {
                return this.storeState.isLoadingQuickStartGuide;
            },
            completedQuickStartGuide() {
                return this.storeState.completedQuickStartGuide;
            },
            mobileNumberShortcode() {
                return this.authState.user._attributes.mobileNumberShortcode;
            },
            deleteConfirmationCodeInvalid() {
                return this.deleteConfirmationCode == '' ||
                       this.validDeleteConfirmationCode == '' ||
                       this.deleteConfirmationCode != this.validDeleteConfirmationCode;
            }
        },
        methods: {
            showLessInsights() {
                this.categories = ['sales'];
                this.showStoreInsights();
            },
            showMoreInsights() {
                this.categories = ['sales', 'orders', 'products', 'customers', 'operations'];
                this.showStoreInsights();
            },
            addCategories(categories) {
                var newCategories = [];

                for (let index = 0; index < categories.length; index++) {

                    newCategories.push(categories[index].text);

                }

                if(newCategories.length >= 1) {
                    this.categories = newCategories;
                    this.showStoreInsights();
                }else{
                    this.categories
                }
            },
            showMilestoneCheckmark(milestone) {
                //  If the user subscribed but the subscription has expired
                if(milestone.type == 'subscribed' && milestone.status == false && milestone.subscriptionEndAt != null) {
                    return true;
                }else{
                    return milestone.status;
                }
            },
            milestoneIconClass(milestone) {
                var classes = ['w-6 h-6'];

                //  If the user subscribed but the subscription has expired
                if(milestone.type == 'subscribed' && milestone.status == false && milestone.subscriptionEndAt != null) {
                    classes.push('text-yellow-400');
                }else{
                    classes.push('text-green-500');
                }

                return classes;
            },
            navigateToAddCoupon() {
                this.$router.push({ name: 'create-store-coupon', params: { 'store_href': this.store._links.showStore } });
            },
            navigateToAddProduct() {
                this.$router.push({ name: 'create-store-product', params: { 'store_href': this.store._links.showStore } });
            },
            navigateToInviteTeamMember() {
                this.$router.push({ name: 'invite-store-team-member', params: { 'store_href': this.store._links.showStore } });
            },
            showStoreInsights() {

                //  Start loader
                this.isLoadingStoreInsights = true;

                //  Set the query params
                const params = {
                    'period': this.period,
                    'categories': this.categories
                }

                getApi(this.store._links.showStoreInsights, params).then(response => {

                    if(response.status == 200) {
                        this.insights = response.data.insights;
                    }

                    //  Stop loader
                    this.isLoadingStoreInsights = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingStoreInsights = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            showDeleteStoreConfirmationCode() {

                //  Start loader
                this.isLoadingDeleteCode = true;

                postApi(this.store._links.confirmDeleteStore).then(response => {

                    //  Stop loader
                    this.isLoadingDeleteCode = false;

                    if(response.status == 200) {

                        this.validDeleteConfirmationCode = response.data['code'];

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingDeleteCode = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            deleteStore(hideModal) {

                //  Start loader
                this.isDeletingStore = true;

                var data = {
                    'code': this.deleteConfirmationCode
                };

                deleteApi(this.store._links.deleteStore, data).then(response => {

                    //  Stop loader
                    this.isDeletingStore = false;

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Store deleted');

                            /**
                             *  After setting the isDeletingStore to false, we need to wait until the nextTick()
                             *  so that the ConfirmModal isLoading propery updates. This allows the watcher of
                             *  the ConfirmModal to auto close the modal once isLoading is set to false. We
                             *  need to wait for the state change so that the modal is closed gracefully
                             *  before we navigate away, otherwise the modal backdrop is not removed.
                             */
                            this.$nextTick(() => {

                                //  Unset the store
                                this.storeState.store = null;

                                //  Navigate to dashboard
                                this.$router.replace({ name: 'dashboard', query: { deletedStore: true } });

                            });

                        }else{

                            this.setFormError('general', response.data.message);
                            this.showUnsuccessfulNotification(response.data.message);

                        }

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingStore = false;

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
            this.showStoreInsights();
        }
    };

</script>
