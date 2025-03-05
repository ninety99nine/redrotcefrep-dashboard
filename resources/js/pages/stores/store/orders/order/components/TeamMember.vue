<template>

    <div class="bg-white rounded-lg p-4 mb-4">

        <div class="flex items-center space-x-2 mb-4">

            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>

            <span class="text-gray-700 font-semibold">Team Member</span>

        </div>

        <!-- Skeleton Loading -->
        <div v-if="isLoadingOrder" class="w-full border-b shadow-sm rounded-lg py-6 px-4 bg-gray-50 space-y-1">
            <LineSkeleton width="w-2/3" :shine="true"></LineSkeleton>
            <LineSkeleton width="w-1/3" :shine="true"></LineSkeleton>
        </div>

        <div v-else>

            <!-- Team Members Select Input -->
            <SelectInput
                width="w-full"
                v-model="teamMemberId">
                <option :value="null">Unassigned</option>
                <option v-for="(teamMember, index) in teamMembers" :value="teamMember.id" :key="index">
                    {{ teamMember._attributes.name }}
                </option>
            </SelectInput>

        </div>

    </div>

</template>

<script>

    import axios from 'axios';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import Button from '@Partials/buttons/Button.vue';
    import { useStoreState } from '@Stores/store-store.js';
    import SelectInput from '@Partials/inputs/SelectInput.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';

    export default {
        mixins: [FormMixin],
        components: { Button, SelectInput, LineSkeleton },
        props: {
            order: {
                type: Object
            },
            isLoadingOrder: {
                type: Boolean
            }
        },
        data() {
            return {
                teamMembers: [],
                teamMemberId: null,
                isLoadingTeamMembers: false,
                storeState: useStoreState(),
            }
        },
        watch: {
            isLoadingOrder(newValue) {
                if(!newValue) {
                    this.getTeamMembers()
                }
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            }
        },
        methods: {
            async getTeamMembers() {

                this.isLoadingTeamMembers = true;

                await axios.get(this.store._links.showStoreTeamMembers).then(response => {

                    if(response.status == 200) {

                        const pagination = response.data;
                        this.teamMembers = pagination.data;
                        this.teamMemberId = this.teamMembers[0].id;

                    }else{

                        this.setFormError('general', response.data.message);
                        this.showUnsuccessfulNotification(response.data.message);

                    }

                }).catch(errorException => {
                    this.setServerFormErrors(errorException);
                });

                this.isLoadingTeamMembers = false;

            }
        }
    };

</script>
