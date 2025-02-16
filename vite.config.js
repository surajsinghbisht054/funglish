import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	base: "/funglish/",
	plugins: [vue(), Components({
		resolvers: [
			PrimeVueResolver()
		]
	})],
	build: {
		outDir: mode === 'deploy' ? 'docs' : 'dist' // Change output to 'docs' for deploy mode
	}
}));
