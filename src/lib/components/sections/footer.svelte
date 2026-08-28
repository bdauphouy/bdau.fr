<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { getLocale, localizeHref } from '$lib/paraglide/runtime';

	export let lastUpdate: Date;

	$: formattedLastUpdate = lastUpdate.toLocaleDateString(getLocale(), {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<footer
	class="flex flex-col justify-between gap-2 p-6 text-sm text-secondary/60 md:flex-row md:px-12 md:pb-10"
>
	<p>{m.footer_text()}</p>
	<p>
		<a
			href={localizeHref('/archives')}
			class="rounded-full transition-colors duration-300 hover:text-secondary focus-visible:text-secondary"
		>
			{m.footer_archives_title()}
		</a>
		<span class="mx-2">•</span>
		{m.footer_last_update_title()}
		{formattedLastUpdate}.
	</p>
</footer>
