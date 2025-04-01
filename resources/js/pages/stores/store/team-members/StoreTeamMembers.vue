<template>

    <div class="pt-24 pb-80 px-8 relative">

        <!-- Clouds Image -->
        <img src="/images/clouds.png" class="absolute top-0">

        <div class="relative">

            <div class="flex flex-col items-center mb-8">
                <h1 class="space-x-2 text-xl text-gray-700 font-semibold bg-white rounded-full py-2 px-8 mb-4">
                    <span>💪</span>
                    <span>Team Members</span>
                </h1>
                <img src="/images/store-rooftop.png" class="w-96">
            </div>

            <!-- Team Members Table -->
            <BasicTable v-if="isLoadingTeamMembers || (pagination ?? {}).total > 0 || hasSearchTerm" :pagination="pagination" :isLoading="isLoadingTeamMembers" @paginate="paginate" @search="search" @refresh="getTeamMembers" :totalHeaders="tableHeaders.length">

                <template #header v-if="(pagination ?? {}).total > 0">

                    <div class="flex justify-center my-4">

                        <!-- Show Everything Toggle Switch -->
                        <ToggleSwitch
                            v-model="showEverything" size="md"
                            labelPopoverTitle="What Is This?"
                            labelPopoverDescription="Turn on if you want to show more information about your products">
                            Show Everything
                        </ToggleSwitch>

                    </div>

                </template>

                <template #afterRefreshButton>

                    <!-- Add Invite Team Button -->
                    <Button type="primary" size="sm" icon="add" :action="onInviteTeamMember">
                        <span>Invite Team</span>
                    </Button>

                </template>

                <!-- Table Head -->
                <template #head>
                    <tr>

                        <!-- Table Header -->
                        <th v-for="(tableHeader, index) in tableHeaders" :key="index" scope="col" class="whitespace-nowrap px-4 py-3">
                            {{ tableHeader }}
                        </th>

                    </tr>
                </template>

                <!-- Table Body -->
                <template #body>
                    <tr @click.stop="onView(teamMember)" v-for="(teamMember, index) in teamMembers" :key="teamMember.id" :class="['group cursor-pointer border-b', checkedRowIds[index] ? 'bg-blue-100' : 'bg-white hover:bg-gray-50']">

                        <!-- Checkbox -->
                        <td @click.stop class="whitespace-nowrap pl-4 align-top">

                            <Checkbox
                                size="xs"
                                class="mt-2"
                                v-model="checkedRowIds[index]">
                            </Checkbox>

                        </td>

                        <!-- Profile Photo -->
                        <td class="w-20 align-top">
                            <ProfilePhoto :user="teamMember" :canUpload="false" width="w-10" height="h-10"></ProfilePhoto>
                        </td>

                        <!-- Name -->
                        <td class="whitespace-nowrap px-4 py-4 align-top">
                            <span>{{ teamMember._attributes.name }}</span>
                        </td>

                        <!-- Email -->
                        <td class="px-4 py-4 align-top">
                            <NoDataPlaceholder v-if="teamMember.email == null"></NoDataPlaceholder>
                            <span v-else>{{ teamMember.email }}</span>
                        </td>

                        <!-- Mobile Number -->
                        <td class="px-4 py-4 align-top">
                            <NoDataPlaceholder v-if="teamMember.mobileNumber == null"></NoDataPlaceholder>
                            <span v-else>{{ (teamMember.mobileNumber || {}).national || teamMember._relationships.userStoreAssociation.mobileNumber.national }}</span>
                        </td>

                        <!-- Status -->
                        <td class="whitespace-nowrap px-4 py-4 align-top">
                            <Pill :type="teamMember._attributes.userStoreAssociation.teamMemberStatus.toLowerCase() == 'invited' ? 'warning' : 'light'" size="xs">{{ teamMember._attributes.userStoreAssociation.teamMemberStatus }}</Pill>
                        </td>

                        <!-- Role -->
                        <td class="whitespace-nowrap px-4 py-4 align-top">
                            <Pill :type="teamMember._attributes.userStoreAssociation.teamMemberRole.toLowerCase() == 'creator' ? 'success' : 'light'" size="xs" :showDot="teamMember._attributes.userStoreAssociation.teamMemberRole.toLowerCase() == 'creator'">{{ teamMember._attributes.userStoreAssociation.teamMemberRole }}</Pill>
                        </td>

                        <!-- Permissions -->
                        <td v-if="showEverything" class="align-top px-4 py-4">
                            <div class="w-80 bg-green-50 border border-green-200 rounded-md py-2 px-6 mb-2 shadow-md">
                                <ul class="space-y-2 list-disc text-xs">
                                    <li v-for="(permission, index) in teamMember._attributes.userStoreAssociation.teamMemberPermissions" :key="index">{{ permission.name }}</li>
                                </ul>
                            </div>
                        </td>

                        <!-- Total Permissions -->
                        <td v-else class="whitespace-nowrap px-4 py-4 align-top">

                            <div class="flex items-center space-x-2">
                                <Pill type="light" size="xs">{{ teamMember._attributes.userStoreAssociation.teamMemberPermissions.length }}</Pill>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" title="Permissions" placement="top">

                                    <template #description>
                                        <div class="whitespace-normal space-y-2 border-t border-dashed pt-2 mt-4">
                                            <p v-for="(permission, index) in teamMember._attributes.userStoreAssociation.teamMemberPermissions" :key="index">
                                                {{ permission.name }}
                                            </p>
                                        </div>
                                    </template>

                                </MoreInfoPopover>

                            </div>

                        </td>

                        <!-- Created Date -->
                        <td v-if="showEverything" class="whitespace-nowrap px-4 py-4 align-top">
                            <div class="flex space-x-1 items-center">
                                <span>{{ formattedDatetime(teamMember.createdAt) }}</span>
                                <MoreInfoPopover class="opacity-0 group-hover:opacity-100" :title="formattedRelativeDate(teamMember.createdAt)" placement="top"></MoreInfoPopover>
                            </div>
                        </td>

                        <!-- Action -->
                        <td class="px-4 py-4 space-x-4 align-top">

                            <!-- View Button -->
                            <span v-if="!isDeleting(teamMember)" @click.stop.prevent="onView(teamMember)" class="cursor-pointer font-medium text-blue-600 dark:text-blue-500 hover:underline">View</span>

                            <!-- Deleting Loader -->
                            <SpinningLoader v-if="isDeleting(teamMember)" type="danger">
                                <span class="text-xs ml-2">Deleting...</span>
                            </SpinningLoader>

                            <!-- Delete Button -->
                            <span v-else @click.stop.prevent="showDeleteConfirmationModal(teamMember)" class="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>

                        </td>

                    </tr>
                </template>

            </BasicTable>

            <!-- No Team Members -->
            <div v-else class="flex justify-center">

                <div
                    class="animated-border-blue w-96 bg-white py-4 px-4 shadow-sm space-y-4 rounded-xl">

                    <h1 class="text-xl font-bold">
                        Build Your Team
                    </h1>

                    <p class="text-sm text-gray-500">
                        Invite others to help manage your store. Collaborate by adding team members to help you grow your business.
                    </p>

                    <div class="flex justify-end">

                        <!-- Invite Team Button -->
                        <Button type="primary" size="sm" icon="add" :action="onInviteTeamMember">
                            <span>Invite Team</span>
                        </Button>

                    </div>
                </div>

            </div>

        </div>

        <!-- Confirm Delete Team Member -->
        <ConfirmModal ref="deleteTeamMemberModal" approveText="Remove Team Member" :approveAction="deleteTeamMember" :isLoading="isDeleting(deletableTeamMember)">

            <template #content>
                <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                <p v-if="deletableTeamMember" class="mb-8">Are you sure you want to remove <span class="font-bold text-black">{{ deletableTeamMember._attributes.name }}</span>?</p>
            </template>

        </ConfirmModal>

    </div>

</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';
    import Button from '@Partials/buttons/Button.vue';
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import ProfilePhoto from '@Components/user/ProfilePhoto.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { getApi, deleteApi } from '@Repositories/api-repository.js';
    import ToggleSwitch from '@Partials/toggle-switches/ToggleSwitch.vue';
    import NoDataPlaceholder from '@Partials/placeholders/NoDataPlaceholder.vue';
    import { formattedDatetime, formattedRelativeDate } from '@Utils/dateUtils.js';

    export default {
        inject: ['formState', 'storeState', 'notificationState'],
        components: {
            Pill, Button, BasicTable, Checkbox, ProfilePhoto, ConfirmModal,
            SpinningLoader, MoreInfoPopover, ToggleSwitch, NoDataPlaceholder
        },
        data() {
            return {
                teamMembers: [],
                pagination: null,
                searchTerm: null,
                checkedRowIds: [],
                showEverything: false,
                deletableTeamMember: null,
                isDeletingTeamMemberIds: [],
                isLoadingTeamMembers: false
            }
        },
        watch: {
            store(newValue) {
                if(newValue) {
                    this.getTeamMembers();
                }
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            tableHeaders() {
                return this.showEverything
                    ? ['', '', 'Name', 'Email', 'Mobile', 'Status', 'Role', 'Permissions', 'Joined Date', '']
                    : ['', '', 'Name', 'Email', 'Mobile', 'Status', 'Role', 'Total Permissions', ''];
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            }
        },
        methods: {
            formattedDatetime: formattedDatetime,
            formattedRelativeDate: formattedRelativeDate,
            onView(teamMember) {
                this.$router.push({
                    name: 'show-store-team-member',
                    params: { 'store_href': this.store._links.showStore, 'team_member_href': teamMember._links.showStoreTeamMember }
                });
            },
            showDeleteConfirmationModal(teamMember) {
                this.deletableTeamMember = teamMember;
                this.deleteTeamMemberModal.showModal();
            },
            isDeleting(teamMember) {
                return this.isDeletingTeamMemberIds.findIndex((id) => id == teamMember.id) != -1;
            },
            onInviteTeamMember() {
                if(this.isDeletingTeamMemberIds.length) return;
                this.$router.push({ name: 'invite-store-team-member', params: { 'store_href': this.store._links.showStore } });
            },
            paginate(url) {
                this.getTeamMembers(url);
            },
            search(searchTerm) {
                this.searchTerm = searchTerm;
                this.getTeamMembers();
            },
            getTeamMembers(url = null) {

                //  Start loader
                this.isLoadingTeamMembers = true;

                //  Set the query params
                const params = {}

                //  If the search term has been provided, then add to the query params
                if(this.hasSearchTerm) params['search'] = this.searchTerm;

                url = url ?? this.store._links.showStoreTeamMembers;

                getApi(url, params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.teamMembers = this.pagination.data;

                        this.checkedRowIds = this.teamMembers.map((_) => false);
                    }

                    //  Stop loader
                    this.isLoadingTeamMembers = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingTeamMembers = false;

                    this.formState.setServerFormErrors(errorException);

                });

            },
            deleteTeamMember() {

                //  Start loader
                this.isDeletingTeamMemberIds.push(this.deletableTeamMember.id);

                var data = {
                    'mobileNumbers': [
                        (this.deletableTeamMember.mobileNumber || {}).international || this.deletableTeamMember._relationships.userStoreAssociation.mobileNumber.international
                    ]
                };

                deleteApi(this.store._links.removeStoreTeamMembers, data).then(response => {

                    //  Stop loader
                    this.isDeletingTeamMemberIds.splice(this.isDeletingTeamMemberIds.findIndex((id) => id == this.deletableTeamMember.id, 1));

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            this.notificationState.showSuccessNotification(response.data.message);

                            //  If we are not deleting any other team members, then refresh the coupon list
                            if(this.isDeletingTeamMemberIds.length == 0) this.getTeamMembers();

                        }else{

                            this.formState.setFormError('general', response.data.message);
                            this.notificationState.showWarningNotification(response.data.message);

                        }

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingTeamMemberIds.splice(this.isDeletingTeamMemberIds.findIndex((id) => id == this.deletableTeamMember.id, 1));

                    this.formState.setServerFormErrors(errorException);

                });

            }
        },
        mounted() {
            this.deleteTeamMemberModal = this.$refs.deleteTeamMemberModal;
        },
        created() {
            this.isLoadingTeamMembers = true;
        }
    };

</script>
