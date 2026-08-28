<script lang="ts">
	import Meta from '$lib/components/meta.svelte';
	import Archives from '$lib/components/sections/archives.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Meta
	title={m.meta_archives_title()}
	description={m.meta_archives_description()}
	keywords={m.meta_archives_keywords()}
	globals={data.content.globals}
/>

<Archives content={data.content.archives} />
