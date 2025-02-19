<template>
    <div>
        pageForm: {{ pageForm }}
    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                pageForm: null
            };
        },
        computed: {
        },
        methods: {

        },
        created() {
            const pageForm = localStorage.getItem(`pageForm:${this.$route.params.page_href}`);
        },
    };
</script>
