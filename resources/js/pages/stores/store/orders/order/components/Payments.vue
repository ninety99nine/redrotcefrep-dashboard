<template>

    <div>

        <h1 class="text-lg text-gray-700 font-semibold mb-4">Payments</h1>

        <!-- Order Payment (Loading Placeholder) -->
        <div v-if="isLoadingOrder" class="space-y-2">

            <div v-for="(_, index) in [1, 2, 3]" :key="index" class="border-b shadow-sm rounded-lg py-6 px-4 bg-gray-50">
                <div class="w-full flex items-center justify-between">
                    <LineSkeleton width="w-32" :shine="true"></LineSkeleton>
                    <LineSkeleton width="w-16" :shine="true"></LineSkeleton>
                </div>
            </div>

        </div>

        <div>
            Payments
        </div>

    </div>

</template>

<script>

    import Pill from '@Partials/pills/Pill.vue';
    import Button from '@Partials/buttons/Button.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';

    export default {
        components: { Pill, Button, LineSkeleton },
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

            }
        },
        computed: {

        },
        methods: {

        }
    };

</script>
