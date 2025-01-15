<template>

    <div>

        <div class="flex justify-start items-center border-dashed py-6">

            <!-- Back Button -->
            <BackButton class="w-16 mr-4" :action="goBack"></BackButton>

            <div v-if="isLoadingTeamMember" class="flex items-center space-x-2">
                <ShineEffect class="flex space-x-2">
                    <LineSkeleton width="w-20 mt-2"></LineSkeleton>
                    <LineSkeleton width="w-16 mt-2"></LineSkeleton>
                    <LineSkeleton width="w-4 mt-2"></LineSkeleton>
                </ShineEffect>
            </div>

            <template v-else>

                <div class="flex items-center space-x-2">

                    <TextHeader>{{ isInviting ? 'Add Team Member' : teamMember._attributes.name }}</TextHeader>
                    <BadgeIndicator v-if="isEditting" :type="isCreator ? 'success' : 'info'" :text="teamMemberRole" :showDot="isCreator"></BadgeIndicator>
                    <BadgeIndicator v-if="isEditting" :type="isInvited ? 'warning' : 'info'" :text="teamMemberStatus" :showDot="isCreator"></BadgeIndicator>

                </div>

                <!-- More Info Popover -->
                <MoreInfoPopover class="ml-2" title="What Is This?" description="Team members are people who help you manage your store and grow your business" placement="top"></MoreInfoPopover>

            </template>
        </div>

        <!-- Team Member Form -->
        <form class="relative" action="#" method="POST">

            <!-- General Error Info Alert -->
            <Alert v-if="mustInvite || mustSaveChanges" type="warning" class="flex justify-between items-center mb-2">

                <div class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <span>{{ isInviting ? 'Invite your team member' : 'Please save your changes'}}</span>
                </div>

                <!-- Invite Team Member / Save Changes Button -->
                <PrimaryButton :action="isInviting ? inviteTeamMember : updateTeamMember" :loading="isSubmitting" class="w-40">
                    {{ isInviting ? 'Invite' : 'Save Changes' }}
                </PrimaryButton>

            </Alert>

            <!-- Form Error Messages -->
            <FormErrorMessages></FormErrorMessages>

            <div class="grid grid-cols-12 gap-4 mb-8">

                <div class="col-span-8 relative">

                    <!-- Loading Backdrop -->
                    <BackdropLoader v-if="isLoadingTeamMember || isSubmitting" class="rounded-lg"></BackdropLoader>

                    <div class="space-y-4 bg-white shadow-lg rounded-lg border p-4 mb-4">

                        <template v-if="isInviting">

                            <p class="font-bold text-sm">Invitation</p>

                            <p class="text-sm text-gray-400">Enter the mobile number of the person you want to invite e.g +26772000001</p>

                        </template>

                        <!-- Mobile Number Input -->
                        <MobileNumberInput
                            v-if="isInviting"
                            v-model="form.mobileNumbers[0]"
                            labelPopoverTitle="What Is This?"
                            :errorText="getFormError('mobileNumbers0')"
                            labelPopoverDescription="The mobile number that will be used by customers as the primary contact number of your store">
                        </MobileNumberInput>

                        <div v-else>
                            <div class="flex items-center space-x-2">
                                <span>Mobile Number: </span>
                                <ShineEffect v-if="isLoadingTeamMember">
                                    <LineSkeleton width="w-24"></LineSkeleton>
                                </ShineEffect>
                                <span v-else class="font-bold">{{ (teamMember.mobileNumber || {}).national || teamMember._relationships.userStoreAssociation.mobileNumber.national }}</span>
                            </div>
                        </div>

                    </div>

                    <div class="bg-white shadow-lg rounded-lg border p-4">

                        <ShineEffect v-if="isLoadingTeamMember || isLoadingTeamMemberPermissions || isLoadingAvailableTeamMemberPermissions" class="space-y-4">
                            <LineSkeleton width="w-24"></LineSkeleton>
                            <LineSkeleton width="w-60"></LineSkeleton>
                        </ShineEffect>

                        <div v-else class="space-y-2">

                            <template v-if="isMe">

                                <!-- Info Alert -->
                                <Alert v-if="form.hasFullPermissions" class="flex items-center space-x-2">
                                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                    <span>You cannot change your own permissions</span>
                                </Alert>

                            </template>

                            <template v-else>

                                <Checkbox
                                    label="Grant Full Permissions"
                                    v-model="form.hasFullPermissions"
                                    labelPopoverTitle="What Is This?"
                                    labelPopoverDescription="The team member will be granted all available permissions when this is checked">
                                </Checkbox>

                                <!-- Info Alert -->
                                <Alert v-if="form.hasFullPermissions">
                                    This team member has been granted <span class="font-bold">Full Permissions</span> to manage this store
                                </Alert>

                                <!-- Permission Input Tags -->
                                <SelectInputTags
                                    v-else
                                    class="w-full"
                                    label="Permissions"
                                    :tags="form.permissions"
                                    labelPopoverTitle="What Is This?"
                                    :errorText="getFormError('permissions')"
                                    :selectableTags="teamMemberPermissionOptions"
                                    @onTagsChanged="(newValues) => form.permissions = newValues"
                                    labelPopoverDescription="Set the permissions for your team member"
                                />

                            </template>

                        </div>

                    </div>

                </div>

                <div class="col-span-4">


                    <div class="flex flex-col justify-between bg-white shadow-lg rounded-lg border p-4 relative">

                        <!-- Loading Backdrop -->
                        <BackdropLoader v-if="isLoadingTeamMember || isSubmitting" :showSpinningLoader="false" class="rounded-lg"></BackdropLoader>

                        <!-- Permissions Title -->
                        <div class="flex items-center space-x-4 mb-2">
                            <div class="flex items-center space-x-2">
                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>

                                <p class="font-bold text-lg">Permissions</p>
                            </div>

                            <BadgeIndicator type="primary" :text="form.hasFullPermissions ? 'All' : totalPermissions" :showDot="false"></BadgeIndicator>
                        </div>

                        <!-- Permissions Description -->
                        <p class="text-sm text-gray-400 border-b border-dashed pb-2 mb-4">See permissions granted</p>

                        <!-- Instructions Loader -->
                        <ShineEffect v-if="isLoadingTeamMember || isLoadingTeamMemberPermissions" class="space-y-4">
                            <LineSkeleton width="w-32"></LineSkeleton>
                            <LineSkeleton width="w-60"></LineSkeleton>
                        </ShineEffect>

                        <!-- Instructions -->
                        <div v-else-if="hasPermissions" class="space-y-2">
                            <div v-for="(permission, index) in form.permissions" :key="index" class="flex space-x-2 px-2 border-l-4 border-green-300">
                                <p class="text-xs">{{ permission.text }}</p>
                            </div>
                        </div>

                        <Alert v-else>
                            No permissions granted
                        </Alert>

                    </div>

                </div>

            </div>

            <div v-if="teamMember && !isCreator" class="space-y-4 shadow-lg rounded-lg border border-red-300 bg-red-50 p-4">

                <!-- Remove Team Member Info -->
                <p>Do you want to remove <span class="font-bold text-black">{{ teamMember._attributes.name }}</span>?</p>

                <div class="flex justify-end">

                    <ConfirmModal approveText="Remove Team Member" :approveAction="deleteTeamMember" :isLoading="isDeleting">

                        <template #content>
                            <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Confirm Delete</p>
                            <p class="mb-8">Are you sure you want to remove <span class="font-bold text-black">{{ teamMember._attributes.name }}</span>?</p>
                        </template>

                        <template #trigger="triggerProps">

                            <!-- Remove Team Member Button - Triggers Confirmation Modal -->
                            <PrimaryButton :action="triggerProps.showModal" :loading="isDeleting" class="w-60" type="danger">
                                Remove Team Member
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
    import { useAuthState } from '@Stores/auth-store.js';
    import { useStoreState } from '@Stores/store-store.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import InputTags from '@Partials/inputs/InputTags.vue';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import BackButton from '@Partials/buttons/BackButton.vue';
    import NumberInput from '@Partials/inputs/NumberInput.vue';
    import SelectInput from '@Partials/inputs/SelectInput.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';
    import SelectInputTags from '@Partials/inputs/SelectInputTags.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import BackdropLoader from '@Partials/loaders/BackdropLoader.vue';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';
    import FormErrorMessages from '@Partials/form-errors/FormErrorMessages.vue';
    import { getApi, putApi, postApi, deleteApi } from '@Repositories/api-repository.js';

    export default {
        mixins: [UtilsMixin, FormMixin],
        components: {
            Alert, TextInput, TextHeader, Checkbox, InputTags, BackButton, NumberInput,
            SelectInput, ConfirmModal, ShineEffect, PrimaryButton, LineSkeleton,
            SpinningLoader, SelectInputTags, MoreInfoPopover, BackdropLoader,
            MobileNumberInput, BadgeIndicator, FormErrorMessages
        },
        data() {
            return {
                form: {
                    hasFullPermissions: false,
                    mobileNumbers: ['+26772000001'],
                    permissions: [],
                },
                teamMember: null,
                isDeleting: false,
                originalForm: null,
                isSubmitting: false,
                authState: useAuthState(),
                isLoadingTeamMember: false,
                storeState: useStoreState(),
                selectedAllPermissions: false,
                teamMemberPermissionOptions: [],
                isLoadingTeamMemberPermissions: false,
                isLoadingAvailableTeamMemberPermissions: false,
            }
        },
        watch: {
            '$route.params.team_member_href'(newValue, oldValue) {

                // Scroll to the top whenever $route.params.team_member_href changes
                window.scrollTo(0, 0);

                //  Get the team member matching the route team_member_href
                this.getTeamMember();

            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isInviting() {
                return this.$route.name === 'invite-store-team-member';
            },
            isEditting() {
                return this.$route.name === 'show-store-team-member';
            },
            teamMemberRole() {
                return this.teamMember == null ? null : this.teamMember._attributes.userStoreAssociation.teamMemberRole;
            },
            teamMemberStatus() {
                return this.teamMember == null ? null : this.teamMember._attributes.userStoreAssociation.teamMemberStatus;
            },
            hasPermissions() {
                return this.totalPermissions > 0;
            },
            totalPermissions() {
                return this.form.permissions.length;
            },
            isMe() {
                return (this.teamMember || {}).id == this.authState.user.id;
            },
            isCreator() {
                return this.teamMemberRole.toLowerCase() == 'creator';
            },
            isInvited() {
                return this.teamMemberStatus.toLowerCase() == 'invited';
            },
            hasFullPermissions() {
                return this.form.hasFullPermissions;
            },
            hasProvidedMobileNumber() {
                return this.form.mobileNumbers.length > 0 && this.form.mobileNumbers.some(number => number.trim() !== '');
            },
            formHasChanged() {
                // Clone the objects to avoid modifying the original data
                var a = cloneDeep(this.form);
                var b = cloneDeep(this.originalForm);

                // Compare the modified arrays for equality
                return !isEqual(a, b);
            },
            mustSaveChanges() {
                return this.isEditting && this.formHasChanged && this.hasProvidedMobileNumber && (this.hasFullPermissions || this.hasPermissions) && !this.isLoadingTeamMemberPermissions && !this.isLoadingAvailableTeamMemberPermissions && !this.isSubmitting;
            },
            mustInvite() {
                return this.isInviting && this.formHasChanged && this.hasProvidedMobileNumber && (this.hasFullPermissions || this.hasPermissions) && !this.isLoadingTeamMemberPermissions && !this.isLoadingAvailableTeamMemberPermissions && !this.isSubmitting;
            }
        },
        methods: {
            goBack() {
                this.$router.replace({ name: 'show-store-team-members', params: { 'store_href': this.store._links.showStore } });
            },
            setTeamMemberFields() {
                this.form.mobileNumbers[0] = (this.teamMember.mobileNumber || {}).international || this.teamMember._relationships.userStoreAssociation.mobileNumber.international;

                //  Capture the original form before editting.
                this.originalForm = cloneDeep(this.form);

            },
            getTeamMember() {

                //  Start loader
                this.isLoadingTeamMember = true;

                getApi(this.$route.params.team_member_href).then(response => {

                    if(response.status == 200) {
                        this.teamMember = response.data.user;
                        this.setTeamMemberFields();
                        this.showStoreTeamMemberPermissions();
                    }

                    //  Stop loader
                    this.isLoadingTeamMember = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingTeamMember = false;

                    this.setServerFormErrors(errorException);

                });

            },
            showStoreTeamMemberPermissions() {

                //  Start loader
                this.isLoadingTeamMemberPermissions = true;

                getApi(this.teamMember._links.showStoreTeamMemberPermissions).then(response => {

                    if(response.status == 200) {

                        this.form.hasFullPermissions = response.data.hasFullPermissions;
                        this.form.permissions = response.data.permissions.map(permission => ({
                            text: permission.name,
                            grant: permission.grant
                         }));

                        this.originalForm = cloneDeep(this.form);

                    }

                    //  Stop loader
                    this.isLoadingTeamMemberPermissions = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingTeamMemberPermissions = false;

                    this.setServerFormErrors(errorException);

                });

            },
            showTeamMemberPermissionOptions() {

                //  Start loader
                this.isLoadingAvailableTeamMemberPermissions = true;

                getApi(this.store._links.showTeamMemberPermissionOptions).then(response => {

                    if(response.status == 200) {
                        this.teamMemberPermissionOptions = response.data.map(permission => ({
                            text: permission.name,
                            grant: permission.grant
                         }));
                    }

                    //  Stop loader
                    this.isLoadingAvailableTeamMemberPermissions = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingAvailableTeamMemberPermissions = false;

                    this.setServerFormErrors(errorException);

                });

            },
            inviteTeamMember() {

                //  Start loader
                this.isSubmitting = true;

                var data = cloneDeep(this.form);

                if(this.form.hasFullPermissions) {

                    data.permissions = ['*'];

                }else{

                    data.permissions = data.permissions.map(permission => permission.grant);

                }

                postApi(this.store._links.inviteStoreTeamMembers, data).then(response => {

                    if(response.status == 200) {
                        this.showSuccessfulNotification(response.data.message);

                        //  Navigate to show team members
                        this.$router.push({ name: 'show-store-team-members', params: { 'store_href': this.store._links.showStore } });

                        // Scroll to the top
                        window.scrollTo(0, 0);

                    }

                    //  Stop loader
                    this.isSubmitting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    this.setServerFormErrors(errorException);

                });

            },
            updateTeamMember() {

                if(this.isMe) return;

                //  Start loader
                this.isSubmitting = true;

                var data = cloneDeep(this.form);

                if(this.form.hasFullPermissions) {

                    data.permissions = ['*'];

                }else{

                    data.permissions = data.permissions.map(permission => permission.grant);

                }

                putApi(this.teamMember._links.updateStoreTeamMemberPermissions, data).then(response => {

                    if(response.status == 200) {

                        if(response.data.updated) {

                            this.originalForm = cloneDeep(this.form);

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification('Team member updated');

                            if(this.form.hasFullPermissions) {
                                this.showStoreTeamMemberPermissions();
                            }

                        }else{

                            this.form = cloneDeep(this.originalForm);

                            this.setFormError('general', response.data.message);
                            this.showUnsuccessfulNotification(response.data.message);

                        }

                    }

                    //  Stop loader
                    this.isSubmitting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isSubmitting = false;

                    this.setServerFormErrors(errorException);

                });

            },
            deleteTeamMember() {

                //  Start loader
                this.isDeleting = true;

                var data = {
                    'mobileNumbers': this.form.mobileNumbers
                };

                deleteApi(this.store._links.removeStoreTeamMembers, data).then(response => {

                    if(response.status == 200) {

                        if(response.data.deleted) {

                            /**
                             *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                             */
                            this.showSuccessfulNotification(response.data.message);

                            //  Navigate to show team members
                            this.$router.push({ name: 'show-store-team-members', params: { 'store_href': this.store._links.showStore } });

                            // Scroll to the top
                            window.scrollTo(0, 0);

                        }else{

                            this.setFormError('general', response.data.message);
                            this.showUnsuccessfulNotification(response.data.message);

                        }

                    }

                    //  Stop loader
                    this.isDeleting = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isDeleting = false;

                    this.setServerFormErrors(errorException);

                });

            },
        },
        created() {
            this.originalForm = cloneDeep(this.form);
            if(this.isEditting) this.getTeamMember();
            this.showTeamMemberPermissionOptions();
        }
    };

</script>
