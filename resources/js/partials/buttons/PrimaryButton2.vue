<template>

    <div :class="['shadow', rounding]">

        <button type="submit" @click.stop.prevent="action" :disabled="disabled" :class="[btnClass, { 'hover-enabled': !disabled && type === 'custom' }]" :style="btnStyle">

            <!-- Shinny Line -->
            <div v-if="!disabled" :class="['absolute top-0.5 left-0.5 right-0.5 bottom-1/4 bg-gradient-to-t from-transparent via-transparent to-white/30 rounded-md']"></div>

            <!-- Spinning Loader -->
            <SpinningLoader v-if="loading" type="light"></SpinningLoader>

            <slot v-else></slot>

        </button>

    </div>

</template>

<script>
    import SpinningLoader from "@Partials/loaders/SpinningLoader.vue";

    export default {
        components: { SpinningLoader },
        props: {
            action: {
                type: Function
            },
            disabled: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: 'base',
                options: ['xs', 'sm', 'base', 'lg']
            },
            type: {
                type: String,
                default: 'dark',
                options: ['dark', 'success', 'light', 'primary', 'warning', 'danger', 'custom']
            },
            bgColor: {
                type: String,
                default: '#000000'
            },
            textColor: {
                type: String,
                default: '#ffffff'
            },
            rounding: {
                type: String,
                default: 'rounded-lg'
            },
        },
        computed: {
            btnClass() {
                let classes = ['w-full h-full flex justify-center items-center '+this.rounding+' shadow-sm font-semibold relative'];
                classes.push(this.disabled ? 'cursor-not-allowed' : 'cursor-pointer');

                // Size classes
                if (this.size === "xs") {
                    classes.push("px-3 py-1.5 text-xs");
                } else if (this.size === "sm") {
                    classes.push("px-3 py-1.5 sm:text-sm text-xs");
                } else if (this.size === "base") {
                    classes.push("px-3 py-1.5 sm:text-base text-xs");
                } else if (this.size === "lg") {
                    classes.push("px-3 py-2.5 sm:text-base text-xs");
                }

                if(this.type != "light") classes.push('border border-white/20');

                // Predefined types
                if (this.type === "dark") {
                    classes.push("text-white", this.disabled ? "bg-black/50" : "bg-black hover:bg-black/80 active:bg-black/60");
                } else if (this.type === "success") {
                    classes.push("text-white", this.disabled ? "bg-green-600/50" : "bg-green-600 hover:bg-green-600/80 active:bg-green-600/60");
                } else if (this.type === "light") {
                    classes.push("text-black border border-gray-300", this.disabled ? "bg-gray-50" : "bg-gray-100 hover:bg-gray-50 active:bg-white");
                } else if (this.type === "primary") {
                    classes.push("text-white", this.disabled ? "bg-blue-600/50" : "bg-blue-600 hover:bg-blue-600/80 active:bg-blue-600/60");
                } else if (this.type === "danger") {
                    classes.push("text-white", this.disabled ? "bg-red-600/50" : "bg-red-600 hover:bg-red-600/80 active:bg-red-600/60");
                } else if (this.type === "warning") {
                    classes.push("text-white", this.disabled ? "bg-yellow-400/50" : "bg-yellow-400 hover:bg-yellow-400/80 active:bg-yellow-400/60");
                }

                return classes;
            },
            btnStyle() {
                if (this.type === "custom") {
                    const baseColor = this.bgColor;
                    const baseTextColor = this.textColor;
                    const hoverColor = this.adjustColorBrightness(baseColor, -20); // Darken for hover
                    const activeColor = this.adjustColorBrightness(baseColor, -40); // Darken more for active

                    return this.disabled
                        ? {
                            cursor: "not-allowed",
                            color: '#aaaaaa',
                            backgroundColor: '#eeeeee',
                        }
                        : {
                            color: baseTextColor,
                            backgroundColor: baseColor,
                            "--hover-color": hoverColor,
                            "--active-color": activeColor,
                        };
                }

                return {};
            },
        },
        methods: {
            adjustColorBrightness(hex, amount) {
                let color = hex.replace("#", "");
                if (color.length === 3) {
                    color = color
                        .split("")
                        .map((c) => c + c)
                        .join("");
                }
                const num = parseInt(color, 16);
                let r = (num >> 16) + amount;
                let g = ((num >> 8) & 0x00ff) + amount;
                let b = (num & 0x0000ff) + amount;

                r = Math.min(255, Math.max(0, r));
                g = Math.min(255, Math.max(0, g));
                b = Math.min(255, Math.max(0, b));

                return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
            },
        },
    };
</script>

<style scoped>
    .hover-enabled:hover {
        background-color: var(--hover-color) !important;
    }

    .hover-enabled:active {
        background-color: var(--active-color) !important;
    }
</style>
