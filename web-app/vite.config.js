const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env
import { resolve } from 'path'
import { defineConfig } from 'vite'
// import cesium from 'vite-plugin-cesium';

export default defineConfig({
    root: 'src/',
    publicDir: '../static/',
    base: './',
    server:
    {
        host: true,
        open: !isCodeSandbox // Open if it's not a CodeSandbox
    },
    build:
    {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'), 
                // nested: resolve(__dirname, 'static//showcase.html'),
            },
        },
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true
    },
    // plugins: [cesium({
    //     rebuildCesium: true,
    // }
    // )]
})
