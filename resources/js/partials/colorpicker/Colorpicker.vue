<template>

    <color-picker v-model:pureColor="localModelValue" v-bind="$props" />

</template>

<script>

    import "vue3-colorpicker/style.css";
    import { ColorPicker } from "vue3-colorpicker";

    export default {
        components: { ColorPicker },
        props: {
            modelValue: {
                type: String
            },
            useType: {
                type: String,
                default: 'pure',
                options: ['pure', 'gradient', 'both']
            },
            pickerType: {
                type: String,
                default: 'fk',
                options: ['fk', 'chrome']
            },
            shape: {
                type: String,
                default: 'circle',
                options: ['circle', 'square']
            },
            format: {
                type: String,
                default: 'hex6',
                options: ['rgb', 'prgb', 'hex', 'hex6', 'hex3', 'hex4', 'hex8', 'name', 'hsl', 'hsv']
            },
            disableHistory: {
                type: Boolean,
                default: false
            },
            roundHistory: {
                type: Boolean,
                default: false
            },
            disableAlpha: {
                type: Boolean,
                default: false
            },
        },
        data() {
            return {
                localModelValue: this.modelValue
            };
        },
        watch: {
            modelValue(newValue, oldValue) {
                this.updateValue(newValue);
            },
            localModelValue(newValue, oldValue) {
                this.$emit('update:modelValue', newValue);
            }
        },
        methods: {
            updateValue(newValue) {
                this.localModelValue = newValue;
            }
        }
    };
</script>

