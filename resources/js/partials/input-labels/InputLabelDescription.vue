<template>

    <div>

        <div class="text-xs text-gray-400 mr-2">
            {{ description }}
        </div>

        <a
            target="_blank"
            :href="learnMoreLink"
            v-if="learnMoreLabel"
            class="text-xs text-blue-700 hover:underline hover:text-blue-90">
            {{ learnMoreLabel }}
            <svg class="w-3 h-3 inline-block ml-0.5 -mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
        </a>

    </div>

</template>

<script>

    export default {
        props: {
            description: {
                type: String
            },
            learnMoreLabel: {
                type: [String, null]
            },
            learnMoreLink: {
                type: [String, null]
            },
        }
    };
</script>
