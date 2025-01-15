<template>

    <slot name="trigger" :showDrawer="showDrawer" :hideDrawer="hideDrawer"></slot>

    <div :id="drawerUniqueId" :class="placementClasses" tabindex="-1" aria-labelledby="drawer-label">

        <!-- Close Icon -->
        <button v-if="!hideCloseIcon" @click="hideDrawer" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close menu</span>
        </button>

        <!-- Drawer Content -->
        <slot name="content" :showDrawer="showDrawer" :hideDrawer="hideDrawer"></slot>

    </div>

</template>

<script>
    /**
     * Component Reference: https://flowbite.com/docs/components/drawer/
     */
    import { initFlowbite, Drawer } from 'flowbite';
    import { UtilsMixin } from '@Mixins/UtilsMixin.js';

    export default {
        mixins: [UtilsMixin],
        props: {
            placement: {
                type: String,
                default: 'left',
                validator: value => ['left', 'right', 'top', 'bottom'].includes(value)
            },
            backdrop: {
                type: Boolean,
                default: true
            },
            bodyScrolling: {
                type: Boolean,
                default: false
            },
            edge: {
                type: Boolean,
                default: false
            },
            edgeOffset: {
                type: String,
                default: 'bottom-[60px]'
            },
            backdropClasses: {
                type: String,
                default: ''
            },
            hideCloseIcon: {
                type: Boolean,
                default: false
            },
            onToggle: {
                type: Function,
                default: () => {}
            },
            onShow: {
                type: Function,
                default: () => {}
            },
            onHide: {
                type: Function,
                default: () => {}
            }
        },
        data() {
            return {
                drawer: null,
                drawerUniqueId: this.generateUniqueId('drawer')
            };
        },
        computed: {
            placementClasses() {
                const commonClasses = ['fixed', 'z-40', 'transition-transform', 'bg-white', 'dark:bg-gray-800'];

                if (this.placement === 'top') {
                    return [...commonClasses, 'top-0', 'left-0', 'right-0', 'w-full', '-translate-y-full'];
                } else if (this.placement === 'bottom') {
                    return [...commonClasses, 'bottom-0', 'left-0', 'right-0', 'w-full', 'overflow-y-auto', 'translate-y-full']; // Changed transform-none to translate-y-full
                } else if (this.placement === 'left') {
                    return [...commonClasses, 'top-0', 'left-0', 'h-screen', 'overflow-y-auto', '-translate-x-full', 'w-80'];
                } else if (this.placement === 'right') {
                    return [...commonClasses, 'top-0', 'right-0', 'h-screen', 'overflow-y-auto', 'translate-x-full', 'w-80'];
                }
            }
        },
        methods: {
            showDrawer() {
                this.drawer.show();
            },
            hideDrawer() {
                this.drawer.hide();
            },
            toggleDrawer() {
                this.drawer.toggle();
            },
            isDrawerVisible() {
                return this.drawer.isVisible();
            }
        },
        mounted() {
            initFlowbite();

            const $targetEl = document.getElementById(this.drawerUniqueId);
            const options = {
                edge: this.edge,
                onShow: this.onShow,
                onHide: this.onHide,
                backdrop: this.backdrop,
                onToggle: this.onToggle,
                placement: this.placement,
                edgeOffset: this.edgeOffset,
                bodyScrolling: this.bodyScrolling,
            };

            if(this.backdropClasses.trim() != '') {
                options.backdropClasses = this.backdropClasses;
            }

            if ($targetEl) {
                this.drawer = new Drawer($targetEl, options);
            }
        }
    };
</script>
