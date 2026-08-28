import type { Locale } from '$lib/paraglide/runtime';

export type LocaleString = Record<Locale, string>;

export type SanityLink = {
	title: LocaleString;
	url: string;
};

export type SanityBadge = {
	handle: string;
	title: LocaleString;
};

export type SanityProject = {
	id: string;
	title: LocaleString;
	description: LocaleString;
	badges?: SanityBadge[];
	links?: SanityLink[];
	category: 'current' | 'archive';
	order: number;
};

export type SanityTimelineMember = {
	name: string;
	link: string;
};

export type SanityTimelineItem = {
	date: string;
	title: LocaleString;
	text: LocaleString;
	link?: string;
	technologies?: string[];
	members?: SanityTimelineMember[];
};

export type SanitySocialLink = {
	label: string;
	url: string;
};

export type SanitySiteSettings = {
	isAvailable: boolean;
	email: string;
	metaName: string;
	metaTwitter: string;
	themeColor: string;
	socials?: SanitySocialLink[];
};
