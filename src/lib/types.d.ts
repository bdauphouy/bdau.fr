export type Badge = {
	handle: string;
	title: string;
};

export type Link = {
	title: string;
	url: string;
};

export type TimelineItemMember = {
	name: string;
	link: string;
};

export type TimelineItem = {
	date: string;
	title: string;
	text: string;
	link?: string;
	technologies?: string[];
	members?: TimelineItemMember[];
};

export type Project = {
	id: string;
	title: string;
	description: string;
	badges?: Badge[];
	links?: Link[];
};

export type PageContent = {
	projects: Project[];
	timeline: {
		items: TimelineItem[];
	};
	archives: Project[];
};

export type PageGlobals = {
	isAvailable: boolean;
	email: string;
	meta: {
		name: string;
		twitter: string;
		theme: string;
	};
	socials: {
		github: string;
		linkedin: string;
		malt: string;
		x: string;
	};
};
