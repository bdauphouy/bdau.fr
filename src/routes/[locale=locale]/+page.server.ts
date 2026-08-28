import { locales } from '$lib/paraglide/runtime';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => locales.map((locale) => ({ locale }));
