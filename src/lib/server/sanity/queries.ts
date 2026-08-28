export const projectsQuery = `*[_type == "project"] | order(order asc){
	"id": id.current,
	title,
	description,
	badges[]{handle, title},
	links[]{title, url},
	category,
	order
}`;

export const timelineItemsQuery = `*[_type == "timelineItem"] | order(date asc){
	date,
	title,
	text,
	link,
	technologies,
	members[]{name, link}
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
	isAvailable,
	email,
	metaName,
	metaTwitter,
	themeColor,
	socials[]{label, url}
}`;
