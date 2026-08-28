import type { Locale } from '$lib/paraglide/runtime';
import type { PageContent, PageGlobals, Project, TimelineItem } from '$lib/types';
import type {
	SanityProject,
	SanitySiteSettings,
	SanityTimelineItem
} from '$lib/server/sanity/types';

function toProject(locale: Locale, project: SanityProject): Project {
	return {
		id: project.id,
		title: project.title[locale],
		description: project.description[locale],
		thumbnail: project.thumbnail,
		badges: project.badges?.map((badge) => ({
			handle: badge.handle,
			title: badge.title[locale]
		})),
		links: project.links?.map((link) => ({
			title: link.title[locale],
			url: link.url
		}))
	};
}

function toTimelineItem(locale: Locale, item: SanityTimelineItem): TimelineItem {
	return {
		date: item.date,
		title: item.title[locale],
		text: item.text[locale],
		link: item.link,
		technologies: item.technologies,
		members: item.members
	};
}

export function toPageContent(
	locale: Locale,
	projects: SanityProject[],
	timelineItems: SanityTimelineItem[]
): PageContent {
	return {
		projects: projects
			.filter((project) => project.category === 'highlight')
			.map((project) => toProject(locale, project)),
		archives: projects
			.filter((project) => project.category === 'archive')
			.map((project) => toProject(locale, project)),
		timeline: {
			items: timelineItems.map((item) => toTimelineItem(locale, item))
		}
	};
}

export function toPageGlobals(settings: SanitySiteSettings): PageGlobals {
	return {
		isAvailable: settings.isAvailable,
		email: settings.email,
		meta: {
			name: settings.metaName,
			twitter: settings.metaTwitter,
			theme: settings.themeColor
		},
		socials: Object.fromEntries(
			(settings.socials ?? []).map((social) => [social.label, social.url])
		)
	};
}
