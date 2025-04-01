<template>

    <div class="space-y-4 shadow-lg rounded-lg border p-4 border-red-300 bg-red-50">

        <h1 class="text-lg font-bold">Danger</h1>

        <!-- Delete Store Info -->
        <p class="text-justify">
            Do you want to permanently delete <span class="font-bold text-black">{{ storeForm.name }}</span>? Once this store is deleted you will not be able to recover it.
            All orders, products, customers, and store-related settings will be permanently deleted and cannot be recovered. Enter the store name to confirm this action.
        </p>

        <!-- Confirm Input -->
        <TextInput
            class="mb-8"
            label="Confirm"
            v-model="storeName"
            :placeholder="storeForm.name"
            :errorText="formState.getFormError('name')"
            labelPopoverTitle="What Is This?"
            :labelPopoverDescription="'Type the store name ('+storeForm.name+') to confirm deleting this store'">
        </TextInput>

        <div class="flex justify-end">

            <!-- Delete Store Button -->
            <Button
                size="xs"
                class="w-40"
                type="danger"
                :action="deleteStore" :loading="isDeletingStore" :disabled="storeName != storeForm.name || isDeletingStore">
                Delete Store
            </Button>

        </div>

    </div>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';
    import TextInput from '@Partials/inputs/TextInput.vue';

    export default {
        inject: ['formState', 'storeState'],
        components: {
            Button, TextInput
        },
        data() {
            return {
                storeName: ''
            }
        },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            },
            isDeletingStore() {
                return this.storeState.isDeletingStore;
            }
        },
        methods: {
            deleteStore() {
                this.storeState.deleteStore();
            }
        }
    };

</script>
