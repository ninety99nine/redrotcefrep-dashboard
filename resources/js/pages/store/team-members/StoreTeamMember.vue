<template>

    <div>

        <div class="flex justify-start items-center border-dashed border-b py-6 mb-6">

            <!-- Back Button -->
            <BackButton class="w-16 mr-4"></BackButton>

            <!-- Text Heading -->
            <SpiningLoader v-if="isLoadingTeamMember"></SpiningLoader>

            <template v-else>

                <div class="flex items-center space-x-2">

                    <TextHeader>{{ isInviting ? 'Add Team Member' : teamMember._attributes.name }}</TextHeader>
                    <BadgeIndicator v-if="isEditting" :active="isCreator" :text="teamMemberRole" inactiveType="info" :showDot="isCreator"></BadgeIndicator>

                </div>

                <!-- More Info Popover -->
                <MoreInfoPopover class="ml-2" title="What Is This?" description="Team members are people who help you manage your store and grow your business" placement="top"></MoreInfoPopover>

            </template>
        </div>

        <!-- Team Member Form -->
        <form class="relative mt-10" action="#" method="POST">

            <!-- Loading Backdrop -->
            <LoadingBackdrop v-if="isLoadingTeamMember || isSubmitting"></LoadingBackdrop>

            <!-- General Error Info Alert -->
            <Alert v-if="mustCreate || mustSaveChanges" type="warning" class="flex justify-between items-center mb-2">

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

            <div class="grid grid-cols-12 gap-4 mb-8">

                <div class="col-span-8">

                    <div class="space-y-4 shadow-lg rounded-lg border p-4 mb-4">

                        <!-- General Error Info Alert -->
                        <Alert v-if="getFormError('general')" type="warning">
                            {{ getFormError('general') }}
                        </Alert>

                        <template v-if="isInviting">

                            <p class="font-bold text-sm">Invitation</p>

                            <p class="text-sm text-gray-400">Enter the mobile number of the person you want to invite w.g 26772000001</p>

                        </template>

                        <!-- Mobile Number Input -->
                        <MobileNumberInput
                           v-if="isInviting"
                            v-model="form.mobileNumbers[0]"
                            labelPopoverTitle="What Is This?"
                            :errorText="getFormError('mobileNumbers0')"
                            labelPopoverDescription="The mobile number that will be used by customers as the primary contact number of your store">
                        </MobileNumberInput>

                        <div v-else-if="teamMember">
                            <span>Mobile Number: <span class="font-bold">{{ teamMember.mobileNumber.withoutExtension }}</span></span>
                        </div>

                    </div>

                    <div class="shadow-lg rounded-lg border p-4">

                        <div :class="['space-y-4', form.offerDiscount ? 'mb-8' : 'mb-4']">

                            <div v-if="isLoadingTeamMemberPermissions || isLoadingAvailableTeamMemberPermissions" class="flex justify-center">

                                <!-- Spining Loader -->
                                <SpiningLoader class="my-4"></SpiningLoader>

                            </div>

                            <div v-else class="space-y-2">

                                <Checkbox
                                    v-model="form.hasFullPermissions"
                                    label="Grant Full Permissions"
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
                                    :tags="form.permissions" :selectableTags="availableTeamMemberPermissions" @onTagsChanged="(newValues) => form.permissions = newValues"
                                    label="Permissions" labelPopoverTitle="What Is This?" :errorText="getFormError('permissions')"
                                    labelPopoverDescription="Set the permissions for your team member" class="w-full"
                                />

                            </div>

                        </div>

                    </div>

                </div>

                <div class="col-span-4">

                    <div class="flex flex-col justify-between h-full shadow-lg rounded-lg border p-4">

                        <div class="flex justify-end">

                            <!-- Invite Team Member / Save Changes Button -->
                            <PrimaryButton :action="isInviting ? inviteTeamMember : updateTeamMember" :disabled="(isInviting && !mustCreate) || (isEditting && !mustSaveChanges)" :loading="isSubmitting" class="w-40">
                                {{ isInviting ? 'Invite' : 'Save Changes' }}
                            </PrimaryButton>

                        </div>

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
                            <PrimaryButton @click="triggerProps.showModal" :loading="isDeleting" class="w-60" type="danger">
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
    import { useStoreState } from '@Stores/store-store.js';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import InputTags from '@Partials/inputs/InputTags.vue';
    import TextHeader from '@Partials/texts/TextHeader.vue';
    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import BackButton from '@Partials/buttons/BackButton.vue';
    import NumberInput from '@Partials/inputs/NumberInput.vue';
    import SelectInput from '@Partials/inputs/SelectInput.vue';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';
    import SpiningLoader from '@Partials/loaders/SpiningLoader.vue';
    import SelectInputTags from '@Partials/inputs/SelectInputTags.vue';
    import MoreInfoPopover from '@Partials/popover/MoreInfoPopover.vue';
    import LoadingBackdrop from '@Partials/backdrops/LoadingBackdrop.vue';
    import MobileNumberInput from '@Partials/inputs/MobileNumberInput.vue';
    import BadgeIndicator from '@Partials/badge-indicators/BadgeIndicator.vue';
    import { getApi, putApi, postApi, deleteApi } from '@Repositories/api-repository.js';

    export default {
        mixins: [UtilsMixin, FormMixin],
        components: {
            Alert, TextInput, TextHeader, Checkbox, InputTags, BackButton, NumberInput,
            SelectInput, ConfirmModal, PrimaryButton, SpiningLoader, SelectInputTags,
            MoreInfoPopover, LoadingBackdrop, MobileNumberInput, BadgeIndicator
        },
        data() {
            return {
                form: {
                    hasFullPermissions: false,
                    mobileNumbers: [''],
                    permissions: [],
                },
                teamMember: null,
                isDeleting: false,
                originalForm: null,
                isSubmitting: false,
                isLoadingTeamMember: false,
                storeState: useStoreState(),
                selectedAllPermissions: false,
                availableTeamMemberPermissions: [],
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
            isCreator() {
                return this.teamMemberRole == 'Creator';
            },
            formHasChanged() {
                // Clone the objects to avoid modifying the original data
                var a = cloneDeep(this.form);
                var b = cloneDeep(this.originalForm);

                // Compare the modified arrays for equality
                return !isEqual(a, b);
            },
            mustSaveChanges() {
                return this.isEditting && this.formHasChanged && !this.isLoadingTeamMemberPermissions && !this.isLoadingAvailableTeamMemberPermissions && !this.isSubmitting;
            },
            mustCreate() {
                return this.isInviting && this.formHasChanged && !this.isLoadingTeamMemberPermissions && !this.isLoadingAvailableTeamMemberPermissions && !this.isSubmitting;
            }
        },
        methods: {
            setTeamMemberFields() {
                this.form.mobileNumbers[0] = this.teamMember.mobileNumber.withExtension;

                //  Capture the original form before editting.
                this.originalForm = cloneDeep(this.form);

            },
            getTeamMember() {

                //  Start loader
                this.isLoadingTeamMember = true;

                getApi(this.$route.params.team_member_href).then(response => {

                    if(response.status == 200) {
                        this.teamMember = response.data;
                        this.setTeamMemberFields();
                        this.showTeamMemberPermissions();
                    }

                    //  Stop loader
                    this.isLoadingTeamMember = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingTeamMember = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            showTeamMemberPermissions() {

                //  Start loader
                this.isLoadingTeamMemberPermissions = true;

                getApi(this.teamMember._links.showStoreTeamMemberPermissions).then(response => {

                    if(response.status == 200) {

                        this.form.hasFullPermissions = response.data.hasFullPermissions;
                        this.form.permissions = response.data.teamMemberPermissions.map(permission => ({
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

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
                    this.setServerFormErrors(errorException);

                });

            },
            showAllTeamMemberPermissions() {

                //  Start loader
                this.isLoadingAvailableTeamMemberPermissions = true;

                getApi(this.store._links.showAllTeamMemberPermissions).then(response => {

                    if(response.status == 200) {
                        this.availableTeamMemberPermissions = response.data.map(permission => ({
                            text: permission.name,
                            grant: permission.grant
                         }));
                    }

                    //  Stop loader
                    this.isLoadingAvailableTeamMemberPermissions = false;

                }).catch(errorException => {

                    //  Stop loader
                    this.isLoadingAvailableTeamMemberPermissions = false;

                    /**
                     *  Note: the setServerFormErrors() method is part of the FormMixin methods
                     */
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

                postApi(this.store._links.inviteTeamMembers, data).then(response => {

                    if(response.status == 200) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification(response.data.message);

                        //  Navigate to show team members
                        this.$router.push({ name: 'show-store-team-members', params: { 'store_href': this.store._links.self } });

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
            updateTeamMember() {

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

                        this.originalForm = cloneDeep(this.form);

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification('Team member updated');

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
            deleteTeamMember() {

                //  Start loader
                this.isDeleting = true;

                deleteApi(this.store._links.removeTeamMembers, this.form).then(response => {

                    if(response.status == 200) {

                        /**
                         *  Note: the showSuccessfulNotification() method is part of the FormMixin methods
                         */
                        this.showSuccessfulNotification(response.data.message);

                        //  Navigate to show team members
                        this.$router.push({ name: 'show-store-team-members', params: { 'store_href': this.store._links.self } });

                        // Scroll to the top
                        window.scrollTo(0, 0);

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
        },
        created() {
            this.originalForm = cloneDeep(this.form);
            if(this.isEditting) this.getTeamMember();
            this.showAllTeamMemberPermissions();
        }
    };

</script>
