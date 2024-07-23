export default {
    mode: "production",
    assetsInclude: "**/*.md",
    build: {
        rollupOptions: {
            output: {
                assetFileNames: "assets/[name].[ext]",
                entryFileNames: "assets/[name].js",
                chunkFileNames: "assets/[name].js",
            },
        },
    }
}
