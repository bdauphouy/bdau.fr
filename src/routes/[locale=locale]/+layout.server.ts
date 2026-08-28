import { assertIsLocale, setLocale } from '$lib/paraglide/runtime';
import type { PageContent, PageGlobals } from '$lib/types';
import { getLastUpdate } from '$lib/utils/getLastUpdate';
import { getLocation } from '$lib/utils/getLocation';
import en from '$static/content/en.json';
import es from '$static/content/es.json';
import fr from '$static/content/fr.json';
import globals from '$static/content/globals.json';
import type { LayoutServerLoad } from './$types';

export const prerender = true;

export const load: LayoutServerLoad = async ({ params }) => {
	const locale = assertIsLocale(params.locale);

	setLocale(locale);

	const [lastUpdate, location] = await Promise.all([getLastUpdate(), getLocation()]);
	const files = { en, fr, es } satisfies Record<typeof locale, PageContent>;

	return {
		content: { ...files[locale], globals: globals as PageGlobals },
		lastUpdate,
		location
	};
};
