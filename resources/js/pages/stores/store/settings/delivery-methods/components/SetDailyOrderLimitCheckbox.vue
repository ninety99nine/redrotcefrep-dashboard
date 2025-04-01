<template>

    <div :class="[{ 'border border-dashed rounded-lg': form.setDailyOrderLimit }]">
        <div :class="[{ 'bg-blue-50 p-4 rounded-lg': form.setDailyOrderLimit }, 'transition-all duration-500']">

            <Checkbox
                size="xs"
                v-model="form.setDailyOrderLimit"
                :errorText="formState.getFormError('setDailyOrderLimit')">
                <div class="mt-0.5 mx-2">
                    <p class="font-bold text-sm mb-1">Set daily order limit</p>
                    <p class="text-sm text-gray-500 max-w-96">Orders placed must not exceed the daily limit specified</p>
                </div>
            </Checkbox>

            <div :class="[form.setDailyOrderLimit ? 'h-10 mt-4 py-0.5' : 'h-0 mt-0 py-0', 'text-gray-500 space-x-2 transition-all duration-500 overflow-hidden']">

                <span class="text-sm">
                    Accept no more than
                </span>

                <!-- Daily Capacity Input -->
                <NumberInput
                    min="1"
                    placeholder="1"
                    class="w-24 inline-block"
                    v-model="form.dailyOrderLimit">
                </NumberInput>

                <span class="text-sm">
                    orders per day
                </span>

            </div>

        </div>
    </div>

</template>

<script>

    import Checkbox from '@Partials/checkboxes/Checkbox.vue';
    import NumberInput from '@Partials/inputs/NumberInput.vue';

    export default {
        inject: ['formState'],
        components: { Checkbox, NumberInput },
        props: {
            form: {
                type: Object
            }
        }
    };

</script>
