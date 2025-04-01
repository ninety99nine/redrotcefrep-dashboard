<template>

    <CustomSelect
        v-bind="$props"
        :options="countryOptions"
        noResultsText="No countries found"
        :searchableFields="['label', 'value']">

        <!-- Custom Styled Selected Option -->
        <template #selectedOption="{ selectedOption }">
            <div v-if="selectedOption" class="flex items-center space-x-2">
                <img :src="`/svgs/country-flags/${selectedOption.value}.svg`" class="w-4 h-4" />
                <span class="text-gray-700 text-sm leading-3">{{ selectedOption.label }}</span>
            </div>
            <span v-else class="text-gray-700 text-sm">Select a country</span>
        </template>

        <!-- Custom Styled Dropdown Select Option -->
        <template #option="{ option }">
            <div class="flex items-center space-x-2">
                <img :src="`/svgs/country-flags/${option.value}.svg`" class="w-4 h-4" />
                <span class="text-gray-700 text-sm">{{ option.label }}</span>
            </div>
        </template>

    </CustomSelect>

</template>

<script>

    import countries from '@Json/countries.json';
    import CustomSelect from '@Partials/inputs/CustomSelect.vue';

    export default {
        components: { CustomSelect },
        data() {
            return {
                countryOptions: []
            }
        },
        created() {
            this.countryOptions = countries.map((country) => {
                return {
                    'label': country.name,
                    'value': country.iso
                };
            });
        }
    }

</script>
