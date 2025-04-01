<template>

    <div class="bg-white rounded-lg p-4 mb-4">

        <div class="flex items-center space-x-2 mb-4">

            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>

            <span class="text-gray-700 font-semibold">Team Member</span>

        </div>

        <!-- Order Team Member (Loading Placeholder) -->
        <LineSkeleton
            v-if="isLoadingStore || isLoadingOrder || !hasOrder"
            width="w-full" height="h-8" rounded="rounded-md" :shine="true">
        </LineSkeleton>

        <template v-else>

            <!-- Team Members Select Input -->
            <CustomSelect
                :search="true"
                :options="teamMemberOptions"
                v-model="orderForm.assignedToUserId"
                :skeleton="isLoadingOrder || !hasOrder || isLoadingTeamMembers"
                @change="(assignedToUserId) => updateOrder({ assignedToUserId: assignedToUserId })">
            </CustomSelect>

        </template>

    </div>

</template>

<script>

    import axios from 'axios';
    import CustomSelect from '@Partials/inputs/CustomSelect.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';

    export default {
        inject: ['formState', 'orderState', 'storeState', 'notificationState'],
        components: { CustomSelect, LineSkeleton },
        data() {
            return {
                teamMembers: [],
                isLoadingTeamMembers: false
            }
        },
        watch: {
            isLoadingOrder(newValue) {
                if(!newValue && this.hasOrder) {
                    this.getTeamMembers()
                }
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            hasOrder() {
                return this.orderState.hasOrder;
            },
            orderForm() {
                return this.orderState.orderForm;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            },
            isLoadingOrder() {
                return this.orderState.isLoadingOrder;
            },
            teamMemberOptions() {
                let options = [
                    {
                        'label': 'Unassigned',
                        'value': null
                    }
                ];

                this.teamMembers.forEach((teamMember) => {
                    options.push({
                        'label': teamMember._attributes.name,
                        'value': teamMember.id
                    });
                });

                return options;
            }
        },
        methods: {
            async getTeamMembers() {

                this.isLoadingTeamMembers = true;

                await axios.get(this.store._links.showStoreTeamMembers).then(response => {

                    if(response.status == 200) {

                        const pagination = response.data;
                        this.teamMembers = pagination.data;

                    }else{

                        this.formState.setFormError('general', response.data.message);
                        this.notificationState.showWarningNotification(response.data.message);

                    }

                }).catch(errorException => {
                    this.formState.setServerFormErrors(errorException);
                });

                this.isLoadingTeamMembers = false;

            },
            async updateOrder(data) {

                const response = await this.orderState.updateOrder(data);

                if(response.status == 200 && response.data['updated']) {
                    const teamMember = this.teamMembers.find(teamMember => teamMember.id === this.orderForm.assignedToUserId);
                    this.notificationState.showSuccessNotification(`Order assigned to ${teamMember.firstName}`);
                }

            }
        }
    };

</script>
