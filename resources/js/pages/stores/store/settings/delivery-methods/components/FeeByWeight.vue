<template>

    <div class="space-y-4">

        <h1 class="text-md font-bold m-2">Weight Management</h1>

        <div v-for="(weightCategory, index) in form.weightCategories" :key="index" class="relative bg-gray-50 p-4 border rounded-lg">

            <div class="absolute top-2 right-2 flex items-center space-x-2">

                <svg class="w-6 h-6 cursor-pointer hover:opacity-50" @click="form.weightCategories[index].isEditable = !form.weightCategories[index].isEditable" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path v-if="form.weightCategories[index].isEditable" stroke-linecap="round" stroke-linejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>

                <!-- Delete Category Button -->
                <Button type="danger" size="xs" :action="() => onRemoveWeightCategory(index)"></Button>

            </div>

            <div v-if="form.weightCategories[index].isEditable" class="space-y-4">

                <div class="flex items-center space-x-2 text-sm text-gray-500">
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                    </svg>
                    <span>Category {{ index + 1 }}</span>
                </div>

                <div class="space-y-4">

                    <div class="flex space-x-4">

                        <!-- Category Name Input -->
                        <TextInput
                            label="Category Name"
                            placeholder="Lightweight"
                            labelPopoverTitle="What Is This?"
                            v-model="form.weightCategories[index].name"
                            :errorText="formState.getFormError('weightCategories'+index+'name')"
                            labelPopoverDescription="Set the name for this weight category">
                        </TextInput>

                        <!-- Category Fee Input -->
                        <MoneyInput
                            label="Category fee"
                            labelPopoverTitle="What Is This?"
                            v-model="form.weightCategories[index].fee"
                            :errorText="formState.getFormError('weightCategories'+index+'fee')"
                            labelPopoverDescription="Specify the fee charged for deliveries within this weight category">
                        </MoneyInput>

                    </div>

                        <!-- Weight Range Input -->
                        <InputTags
                            labelPopoverTitle="What Is This?"
                            :key="form.weightCategories[index].weights"
                            :tags="form.weightCategories[index].weights"
                            :label="'Weight Range ('+store.weightUnit+')'"
                            :errorText="formState.getFormError('weightCategories'+index+'weights')"
                            @onTagsChanged="(newValues) => form.weightCategories[index].weights = newValues"
                            labelPopoverDescription="Specify the weight range for this category, e.g., 2.5, 5-10">
                        </InputTags>

                </div>
            </div>

            <div v-else class="space-y-2 cursor-pointer" @click="form.weightCategories[index].isEditable = true">

                <!-- Weight Category Name -->
                <div class="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div class="flex items-center space-x-2">
                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                        </svg>
                        <span>Category {{ index + 1 }}</span>
                    </div>
                    <Pill v-if="form.weightCategories[index].name" type="info" size="xs" :showDot="false">{{ form.weightCategories[index].name }}</Pill>
                    <InputErrorMessage v-else errorText="No name" margin="mt-0"></InputErrorMessage>
                </div>

                <div v-if="form.weightCategories[index].weights.length" class="flex space-x-2">
                    <span v-for="(weight, index) in form.weightCategories[index].weights" :key="index" class="py-0.5 px-2 bg-gray-100 border text-gray-500 text-xs rounded-lg">
                        {{ weight }} {{ store.weightUnit }}
                    </span>
                </div>
                <InputErrorMessage v-else errorText="No weight range" margin="mt-0"></InputErrorMessage>

                <!-- Category Name Error Message -->
                <InputErrorMessage v-if="formState.getFormError('weightCategories'+index+'name')" :errorText="formState.getFormError('weightCategories'+index+'name')"></InputErrorMessage>

            </div>

        </div>

        <!-- No Categories -->
        <div v-if="!hasWeightCategories">
            <div class="flex items-center space-x-4 px-4 py-4 border rounded-lg bg-gray-50">
                <svg class="w-8 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <div class="text-sm space-y-2">
                    <p><Pill type="primary" size="xs" :showDot="false" :action="onAddWeightCategory">+ Add Category</Pill> to define weight categories.</p>
                </div>
            </div>
        </div>

        <div class="flex justify-end space-x-2">

            <!-- Undo Button -->
            <Button v-if="weightCategoriesHaveChanged && hasOriginalWeightCategories" :action="onResetWeightCategories" type="light" size="xs">
                <span>Undo</span>
            </Button>

            <div class="flex justify-end">

                <!-- Add Option Button -->
                <Button :action="onAddWeightCategory" class="w-40" type="primary" size="xs">
                    <span>Add Category</span>
                </Button>

            </div>

        </div>

    </div>

</template>

<script>

    import isEqual from 'lodash/isEqual';
    import cloneDeep from 'lodash/cloneDeep';
    import Pill from '@Partials/pills/Pill.vue';
    import Button from '@Partials/buttons/Button.vue';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import InputTags from '@Partials/inputs/InputTags.vue';
    import MoneyInput from '@Partials/inputs/MoneyInput.vue';
    import InputErrorMessage from '@Partials/input-error-messages/InputErrorMessage.vue';

    export default {
        inject: ['formState', 'storeState'],
        components: {
            Pill, Button, TextInput, InputTags, MoneyInput, InputErrorMessage
        },
        props: {
            form: {
                type: Object
            }
        },
        data() {
            return {
                originalWeightCategories: []
            };
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            hasWeightCategories() {
                return this.form.weightCategories.length > 0;
            },
            hasOriginalWeightCategories() {
                return this.originalWeightCategories.length > 0;
            },
            weightCategoriesHaveChanged() {
                var a = cloneDeep(this.form.weightCategories);
                var b = cloneDeep(this.originalWeightCategories);
                a.forEach(obj => delete obj.isEditable);
                b.forEach(obj => delete obj.isEditable);
                return !isEqual(a, b);
            },
        },
        methods: {
            onAddWeightCategory() {
                this.form.weightCategories.push({
                    name: '',
                    weights: [],
                    isEditable: true
                });
            },
            onRemoveWeightCategory(index) {
                this.form.weightCategories.splice(index, 1);
            },
            onResetWeightCategories() {
                this.form.weightCategories = cloneDeep(this.originalWeightCategories);
            },
        }
    };

</script>
