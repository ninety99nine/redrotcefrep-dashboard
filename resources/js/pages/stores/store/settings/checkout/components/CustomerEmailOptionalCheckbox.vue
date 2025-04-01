<template>

    <Checkbox
        size="xs"
        v-model="storeState.online"
        :errorText="formState.getFormError('online')">
        <div class="text-sm mt-0.5">Optional</div>
    </Checkbox>

</template>

<script>

    import Checkbox from '@Partials/checkboxes/Checkbox.vue';

    export default {
        inject: ['formState', 'storeState'],
        components: { Checkbox },
        computed: {
            storeForm() {
                return this.storeState.storeForm;
            }
        }
    };
</script>

