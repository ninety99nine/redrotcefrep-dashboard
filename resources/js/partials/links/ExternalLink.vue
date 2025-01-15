<template>

    <span>

        <!-- Render prefix slot if provided -->
        <slot name="prefix"></slot>

        <a :href="url" :target="openInNewTab ? '_blank' : '_self'" class="font-semibold text-blue-700 hover:text-blue-500">
            <slot></slot>
        </a>

    </span>

</template>

<script>
    export default {
        props: {
            url: {
                type: String
            },
            openInNewTab: {
                type: Boolean,
                default: true
            },
            prefix: {
                type: String
            }
        }
    };
</script>
