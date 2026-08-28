import { getLocale } from '$lib/paraglide/runtime';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ params }) => {
	if (params.locale) return;

	redirect(302, `/${getLocale()}`);
};
