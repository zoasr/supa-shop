import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [TanStackRouterVite({ autoCodeSplitting: true }), viteReact(), tailwindcss(), svgr()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			$: resolve(__dirname, './$')
		}
	}
});
