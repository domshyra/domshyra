import { defineConfig } from "vite";
import fs from "fs";
import react from "@vitejs/plugin-react";
import sassDts from "vite-plugin-sass-dts";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

const defaultConfigStuff = {
	plugins: [react(), svgr(), sassDts(), tsconfigPaths()],
	define: {
		global: "window",
		APP_VERSION: JSON.stringify(process.env.npm_package_version),
	},
};

/// <reference types="vitest/config" />
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
	if (command === "serve") {
		return {
			...defaultConfigStuff,
			server: {
				port: 3005,
				https: {
					key: fs.readFileSync(".cert/key.pem"),
					cert: fs.readFileSync(".cert/cert.pem"),
				},
			},
			// dev specific config
		};
	}
	// command === 'build'
	return {
		...defaultConfigStuff,
		build: {
			rollupOptions: {},
		},
	};
});
