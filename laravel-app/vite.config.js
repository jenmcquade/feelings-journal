import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/build/',

    plugins: [
        laravel({
            input: [
                'resources/js/app.js',
                'resources/js/components/App.jsx',
            ],
            refresh: true,
        }),
        react()
    ],
});