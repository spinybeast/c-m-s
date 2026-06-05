import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/',
    publicDir: false,
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/sass/admin/admin.scss',
                'resources/js/app.jsx',
                'resources/js/admin.js',
            ],
            refresh: true,
        }),
        react(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
