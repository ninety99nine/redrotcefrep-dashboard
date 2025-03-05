<template>

    <div class="space-y-10 pt-20 pb-80">

        <h1 class="font-semibold text-2xl text-center">Buttons</h1>
        <div class="w-full flex justify-evenly">

            <div
                :key="index"
                class="space-y-2"
                v-for="(type, index) in buttonTypes">

                <div
                    :key="index"
                    v-for="(size, index) in ['xs', 'sm', 'md', 'lg']">

                    <Button :type="type.toLowerCase()" :size="size">
                        {{ type }}
                    </Button>

                </div>

            </div>

        </div>

        <h1 class="font-semibold text-2xl text-center">Pills</h1>
        <div class="w-full flex justify-evenly">
            <div
                :key="index"
                class="space-y-2"
                v-for="(type, index) in pillTypes">

                <div
                    :key="index"
                    v-for="(size, index) in ['xs', 'sm', 'md', 'lg']">

                    <Pill :type="type.toLowerCase()" :size="size">
                        {{ type }}
                    </Pill>

                </div>

            </div>
        </div>
        <div class="w-full flex justify-evenly">
            <div
                :key="index"
                class="space-y-2"
                v-for="(type, index) in pillTypes">

                <div
                    :key="index"
                    v-for="(size, index) in ['xs', 'sm', 'md', 'lg']">

                    <Pill :type="type.toLowerCase()" :size="size" :showDot="true">
                        {{ type }}
                    </Pill>

                </div>

            </div>
        </div>

    </div>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';
    import Pill from '@Partials/pills/Pill.vue';

    export default {
        components: { Button, Pill },
        data() {
            return {
                buttonTypes: [
                    'Light', 'Primary', 'Success', 'Warning', 'Danger', 'Dark', 'Info', 'Outline', 'Gradient', 'Glass'
                ],
                pillTypes: [
                    'Light', 'Primary', 'Success', 'Warning', 'Danger', 'Dark', 'Info', 'Outline', 'Gradient', 'Glass'
                ]
            }
        }
    };

</script>
