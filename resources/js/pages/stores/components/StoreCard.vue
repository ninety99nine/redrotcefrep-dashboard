<template>

    <div @click.stop="navigateToStoreHome" class="bg-white space-y-4 py-4 px-4 shadow-sm rounded-xl border shadow-blue-200 hover:shadow-md hover:border-blue-200 hover:scale-105 transition-all duration-300 cursor-pointer">

        <div class="flex items-end space-x-2 mb-6">

            <StoreLogo @click.stop size="w-10 h-10" :store="store" :showButton="false"></StoreLogo>

            <div class="w-full">
                <h1 class="text-gray-700 font-bold w-4/5 truncate">
                    <span>{{ store.name  }}</span>
                </h1>
                <div class="flex items-center space-x-1">
                    <div :class="['w-2 h-2 rounded-full animate-pulse', store.online ? 'bg-green-500' : 'bg-orange-500']"></div>
                    <span class="text-xs">{{ store.online ? 'Online' : 'Offline'  }}</span>
                </div>
            </div>

        </div>

        <div class="w-full flex space-x-2 justify-end">

            <a @click.stop :href="this.store._attributes.webLink" target="_blank">
                <Button type="light" size="xs">
                    <span>Visit</span>
                    <svg class="w-4 h-4 -mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                </Button>
            </a>

            <Button :action="navigateToStoreHome" type="primary" size="xs">
                <span>Manage</span>
            </Button>

        </div>

    </div>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';
    import StoreLogo from '@Components/store/StoreLogo.vue';

    export default {
        components: { Button, StoreLogo },
        props: {
            store: {
                type: Object
            }
        },
        methods: {
            navigateToStoreHome() {
                this.$router.push({
                    name: 'show-store-home',
                    params: { 'store_href': this.store._links.showStore }
                });
            }
        }
    };

</script>
