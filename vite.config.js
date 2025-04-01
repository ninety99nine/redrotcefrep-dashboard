import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
            '@Js': path.resolve(__dirname, 'resources/js'),
            '@Json': path.resolve(__dirname, 'resources/js/json'),
            '@Enums': path.resolve(__dirname, 'resources/js/enums'),
            '@Utils': path.resolve(__dirname, 'resources/js/utils'),
            '@Pages': path.resolve(__dirname, 'resources/js/pages'),
            '@Mixins': path.resolve(__dirname, 'resources/js/mixins'),
            '@Stores': path.resolve(__dirname, 'resources/js/stores'),
            '@Layouts': path.resolve(__dirname, 'resources/js/layouts'),
            '@Partials': path.resolve(__dirname, 'resources/js/partials'),
            '@Components': path.resolve(__dirname, 'resources/js/components'),
            '@Directives': path.resolve(__dirname, 'resources/js/directives'),
            '@Repositories': path.resolve(__dirname, 'resources/js/repositories'),
        },
    },
});
