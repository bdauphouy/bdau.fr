import { SANITY_DATASET, SANITY_PROJECT_ID } from '$env/static/private';
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
	projectId: SANITY_PROJECT_ID,
	dataset: SANITY_DATASET,
	apiVersion: '2026-08-28',
	useCdn: false
});
