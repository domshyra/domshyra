import { defineConfig } from "vite";
import fs from "fs";
import react from "@vitejs/plugin-react";
import sassDts from "vite-plugin-sass-dts";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

const defaultConfigStuff = {
	plugins: [
		//TODO: add vite-plugin-pwa
		//? https://github.com/vite-pwa/vite-plugin-pwa
		//adds support for React JSX/TSX
		react(),
		//adds support for SVG files
		svgr(),
		//sass dts
		//? usage file https://github.com/activeguild/vite-plugin-sass-dts?tab=readme-ov-file#usage
		sassDts(),
		tsconfigPaths(),
	],
	define: {
		global: "window",
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
