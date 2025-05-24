import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    root: path.resolve(__dirname, 'src'),

    server: {
        open: true,
        port: 5173
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@types': path.resolve(__dirname, 'src/types'),
        }
    },

    build: {
        outDir: path.resolve(__dirname, 'dist'),
        emptyOutDir: true,
        rollupOptions: {
            input: path.resolve(__dirname, 'src', 'index.html')
        }
    }
})
