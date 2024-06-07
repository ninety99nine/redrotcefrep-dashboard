<template>

    <div>

        <div class="flex justify-between items-center border-dashed border-b py-6 mb-6">

            <div class="flex items-center">

                <!-- Text Heading -->
                <TextHeader><span class="mr-2">💪</span> Team Members</TextHeader>

                <!-- More Info Popover -->
                <MoreInfoPopover class="ml-2 mt-1" title="What Is This?" description="Team members are people who help you manage your store and grow your business" placement="top"></MoreInfoPopover>


            </div>

            <template v-if="(pagination ?? {}).total > 0">

                <!-- Show Everything Toggle Switch -->
                <ToogleSwitch
                    v-model="showEverything" size="md"
                    labelPopoverTitle="What Is This?"
                    labelPopoverDescription="Turn on if you want to show more information about your team members">
                    Show Everything
                </ToogleSwitch>

                <!-- Add Team Member Button -->
                <AddButton :action="onInviteTeamMember" class="w-60">
                    <span class="ml-2">Add Team Member</span>
                </AddButton>

            </template>

        </div>

        <!-- Team Members Table -->
        <BasicTable v-if="isLoadingTeamMembers || (pagination ?? {}).total > 0 || hasSearchTerm" :pagination="pagination" :isLoading="isLoadingTeamMembers" @paginate="paginate" @search="search" @refresh="getTeamMembers" :totalHeaders="tableHeaders.length">

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
                <tr @click.stop="onEdit(teamMember)" v-for="teamMember in teamMembers" :key="teamMember.id" class="group cursor-pointer bg-white hover:bg-gray-50 border-b">

                    <!-- Profile Photo -->
                    <td class="w-20 align-top">
                        <ProfilePhoto :user="teamMember" :canUpload="false" width="w-10" height="h-10"></ProfilePhoto>
                    </td>

                    <!-- Name -->
                    <td class="whitespace-nowrap px-4 py-4 align-top">
                        <span>{{ teamMember._attributes.name }}</span>
                    </td>

                    <!-- Mobile Number -->
                    <td class="px-4 py-4 align-top">
                        <span>{{ teamMember.mobileNumber.withoutExtension }}</span>
                    </td>

                    <!-- Status -->
                    <td class="whitespace-nowrap px-4 py-4 align-top">
                        <BadgeIndicator :active="teamMember._attributes.userStoreAssociation.teamMemberStatus == 'Joined'" :text="teamMember._attributes.userStoreAssociation.teamMemberStatus" :inactiveType="teamMember._attributes.userStoreAssociation.teamMemberStatus == 'Invited' ? 'warning' : 'info'" :showDot="false"></BadgeIndicator>
                    </td>

                    <!-- Role -->
                    <td class="whitespace-nowrap px-4 py-4 align-top">
                        <BadgeIndicator :active="teamMember._attributes.userStoreAssociation.teamMemberRole == 'Creator'" :text="teamMember._attributes.userStoreAssociation.teamMemberRole" inactiveType="info" :showDot="teamMember._attributes.userStoreAssociation.teamMemberRole == 'Creator'"></BadgeIndicator>
                    </td>

                    <!-- Permissions -->
                    <td v-if="showEverything" class="px-4 py-4 align-top">
                        <div>
                            <ul class="space-y-2 list-disc">
                                <li v-for="(permission, index) in teamMember._attributes.userStoreAssociation.teamMemberPermissions" :key="index">{{ permission.name }}</li>
                            </ul>
                        </div>
                    </td>

                    <!-- Total Permissions -->
                    <td v-else class="whitespace-nowrap px-4 py-4 align-top">

                        <div class="flex items-center space-x-2">
                            <BadgeIndicator :active="false" :text="teamMember._attributes.userStoreAssociation.teamMemberPermissions.length" inactiveType="info" :showDot="false"></BadgeIndicator>
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

                        <!-- Edit Button -->
                        <a v-if="!isDeleting(teamMember)" href="#" @click.stop.prevent="onEdit(teamMember)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>

                        <!-- Deleting Loader -->
                        <SpiningLoader v-if="isDeleting(teamMember)" type="danger">
                            <span class="text-xs ml-2">Deleting...</span>
                        </SpiningLoader>

                        <!-- Delete Button -->
                        <a v-else href="#" @click.stop.prevent="showDeleteConfirmationModal(teamMember)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>

                    </td>

                </tr>
            </template>

        </BasicTable>

        <!-- No Team Members -->
        <div v-else class="flex justify-between space-x-20 p-20 border rounded-lg bg-gray-50">
            <div class="space-y-4">
                <h1 class="text-2xl font-bold">Build Your Team</h1>
                <p>Invite others to help manage your store. Collaborate by adding team members to help you grow your business.</p>

                <!-- Add Team Member Button -->
                <AddButton :action="onInviteTeamMember" class="w-40" size="sm">
                    <span class="ml-2">Add Team Member</span>
                </AddButton>
            </div>
            <div>
                <span class="text-8xl">💪</span>
            </div>
        </div>

        <!-- Confirm Delete Team Member -->
        <ConfirmModal v-if="deletableTeamMember" approveText="Remove Team Member" :approveAction="deleteTeamMember" :isLoading="isDeleting(deletableTeamMember)">

            <template #content>
                <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                <p class="mb-8">Are you sure you want to remove <span class="font-bold text-black">{{ deletableTeamMember._attributes.name }}</span>?</p>
            </template>

            <template #trigger="triggerProps">

                <!-- Delete Team Member Button - Triggers Confirmation Modal -->
                <PrimaryButton ref="confirmDeleteButton" @click="triggerProps.showModal" class="hidden" type="danger">
                    Remove Team Member
                </PrimaryButton>

            </template>


        </ConfirmModal>

    </div>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import AddButton from '@Partials/buttons/AddButton.vue';
    import BasicTable from '@Partials/tables/BasicTable.vue';
    import ProfilePhoto from '@Components/user/ProfilePhoto.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import { getApi, deleteApi } from '@Repositories/api-repository.js';
    import ToogleSwitch from '@Partials/toggle-switches/ToogleSwitch.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';

    export default {
        mixins: [FormMixin, UtilsMixin],
        components: {
            TextHeader, AddButton, BasicTable, ProfilePhoto, ConfirmModal, PrimaryButton,
            SpiningLoader, MoreInfoPopover, ToogleSwitch, BadgeIndicator,
        },
        data() {
            return {
                teamMembers: [],
                pagination: null,
                searchTerm: null,
                showEverything: false,
                deletableTeamMember: null,
                isDeletingTeamMemberIds: [],
                isLoadingTeamMembers: false,
                storeState: useStoreState(),
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            tableHeaders() {
                return this.showEverything
                    ? ['', 'Name', 'Mobile', 'Status', 'Role', 'Permissions', 'Joined Date', '']
                    : ['', 'Name', 'Mobile', 'Status', 'Role', 'Total Permissions', ''];
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            }
        },
        methods: {
            onEdit(teamMember) {
                this.$router.push({ name: 'show-store-team-member', params: { 'store_href': this.store._links.self, 'team_member_href': teamMember._links.showStoreTeamMember } });
            },
            showDeleteConfirmationModal(teamMember) {
                this.deletableTeamMember = teamMember;

                /**
                 *  After setting the deletableTeamMember, we need to wait until the nextTick()
                 *  before we programatically trigger the element click() event which
                 *  opens the confirmation modal dialog. This is so that when the
                 *  dialog opens we don't get an error trying to access the
                 *  deletableTeamMember.name value. This is only available
                 *  on the nextTick().
                 */
                this.$nextTick(() => {
                    this.$refs.confirmDeleteButton.$el.click();
                });
            },
            isDeleting(teamMember) {
                return this.isDeletingTeamMemberIds.findIndex((id) => id == teamMember.id) != -1;
            },
            onInviteTeamMember() {
                this.$router.push({ name: 'invite-store-team-member', params: { 'store_href': this.store._links.self } });
            },
            paginate(url) {
                this.url = url;
                this.getTeamMembers();
            },
            search(searchTerm) {
                this.url = this.store._links.showTeamMembers;
                this.searchTerm = searchTerm;
                this.getTeamMembers();
            },
            getTeamMembers() {

                //  Start loader
                this.isLoadingTeamMembers = true;

                //  Set the query params
                const params = {}

                //  If the search term has been provided, then add to the query params
                if(this.hasSearchTerm) params['search'] = this.searchTerm;

                getApi(this.url, params).then(response => {

                    if(response.status == 200) {
                        this.pagination = response.data;
                        this.teamMembers = this.pagination.data;
                    }

                    //  Stop loader
                    this.isLoadingTeamMembers = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingTeamMembers = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            deleteTeamMember() {

                //  Start loader
                this.isDeletingTeamMemberIds.push(this.deletableTeamMember.id);

                var data = {
                    'mobileNumbers': [
                        this.deletableTeamMember.mobileNumber.withExtension
                    ]
                };

                deleteApi(this.store._links.removeTeamMembers, data).then(response => {

                    //  Stop loader
                    this.isDeletingTeamMemberIds.splice(this.isDeletingTeamMemberIds.findIndex((id) => id == this.deletableTeamMember.id, 1));

                    if(response.status == 200) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification(response.data.message);

                        //  If we are not deleting any other team members, then refresh the coupon list
                        if(this.isDeletingTeamMemberIds.length == 0) this.getTeamMembers();

                    }

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeletingTeamMemberIds.splice(this.isDeletingTeamMemberIds.findIndex((id) => id == this.deletableTeamMember.id, 1));

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            }
        },
        mounted() {

        },
        created() {
            this.url = this.store._links.showTeamMembers;
            this.getTeamMembers();
        }
    };

</script>
