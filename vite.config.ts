import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			emitTsDeclarations: true,
			strategy: ['url', 'cookie', 'preferredLanguage', 'baseLocale'],
			urlPatterns: [
				{
					pattern: '/',
					localized: [
						['en', '/en'],
						['fr', '/fr'],
						['es', '/es']
					]
				},
				{
					pattern: '/:path(.*)?',
					localized: [
						['en', '/en/:path(.*)?'],
						['fr', '/fr/:path(.*)?'],
						['es', '/es/:path(.*)?']
					]
				}
			]
		})
	]
});
