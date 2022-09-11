import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
    test: {
        onConsoleLog: () => false,
    },

    resolve: {
        alias: {
            "@": resolve(__dirname, "/src"),
            test: resolve(__dirname, "/test"),
        },
    },
});
