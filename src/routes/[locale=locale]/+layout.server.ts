import { assertIsLocale, setLocale } from '$lib/paraglide/runtime';
import { sanityClient } from '$lib/server/sanity/client';
import { projectsQuery, siteSettingsQuery, timelineItemsQuery } from '$lib/server/sanity/queries';
import { toPageContent, toPageGlobals } from '$lib/server/sanity/transform';
import type {
	SanityProject,
	SanitySiteSettings,
	SanityTimelineItem
} from '$lib/server/sanity/types';
import { getLastUpdate } from '$lib/utils/getLastUpdate';
import { getLocation } from '$lib/utils/getLocation';
import type { LayoutServerLoad } from './$types';

export const prerender = true;

export const load: LayoutServerLoad = async ({ params }) => {
	const locale = assertIsLocale(params.locale);

	setLocale(locale);

	const [lastUpdate, location, projects, timelineItems, siteSettings] = await Promise.all([
		getLastUpdate(),
		getLocation(),
		sanityClient.fetch<SanityProject[]>(projectsQuery),
		sanityClient.fetch<SanityTimelineItem[]>(timelineItemsQuery),
		sanityClient.fetch<SanitySiteSettings>(siteSettingsQuery)
	]);

	return {
		content: {
			...toPageContent(locale, projects, timelineItems),
			globals: toPageGlobals(siteSettings)
		},
		lastUpdate,
		location
	};
};
