<script lang="ts">
	import { getLocale } from '$lib/paraglide/runtime';
	import type { PageGlobals } from '$lib/types';
	import { page } from '$app/stores';

	export let title: string;
	export let description: string;
	export let keywords: string;
	export let globals: PageGlobals;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="robots" content="index, follow" />
	<meta name="author" content={globals.meta.name} />
	<meta name="theme-color" content={globals.meta.theme} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="https://bdau.fr/images/meta/og-image.png" />
	<meta property="og:url" content="https://{$page.url.host}/{getLocale()}" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={globals.meta.name} />
	<meta property="og:locale" content={getLocale()} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta property="twitter:image" content="https://bdau.fr/images/meta/og-image.png" />
	<meta property="twitter:url" content="https://{$page.url.host}/{getLocale()}" />
	<meta name="twitter:site" content={globals.meta.twitter} />
	<meta name="twitter:creator" content={globals.meta.twitter} />
	<meta name="keywords" content={keywords} />
</svelte:head>
