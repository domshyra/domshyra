import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	test: {
		globals: true,
		root: "./src",
		setupFiles: "./__mocks__/setupTests.ts",
		environment: "jsdom",
		env: loadEnv("test", process.cwd(), ""),
		reporters: [
			"junit",
			[
				"default",
				{
					summary: false,
				},
			],
		],
		outputFile: {
			junit: "../coverage/junit.xml",
			cobertura: "../coverage/cobertura-coverage.xml",
		},
		coverage: {
			provider: "istanbul",
			reporter: ["cobertura"],
			reportsDirectory: "../coverage",
			include: ["*"],
		},
		alias: {
			"@_types": resolve(__dirname, "./src/types"),
			"@authentication": resolve(__dirname, "./src/authentication"),
			"@components": resolve(__dirname, "./src/components"),
			"@constants": resolve(__dirname, "./src/constants"),
			"@fragments": resolve(__dirname, "./src/fragments"),
			"@hooks": resolve(__dirname, "./src/hooks"),
			"@main": resolve(__dirname, "./src/main"),
			"@mocks": resolve(__dirname, "./src/__mocks__"),
			"@pages": resolve(__dirname, "./src/pages"),
			"@redux": resolve(__dirname, "./src/redux"),
			"@sections": resolve(__dirname, "./src/sections"),
			"@slices": resolve(__dirname, "./src/redux/slices"),
			"@styles": resolve(__dirname, "./src/styles"),
			"@tools": resolve(__dirname, "./src/tools"),
		},
	},
});
