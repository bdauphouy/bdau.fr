import { locales } from '$lib/paraglide/runtime';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => (locales as readonly string[]).includes(param);
