<script lang="ts">
	import Badge from '$lib/components/badge.svelte';
	import ResumeSpinner from '$lib/components/landing/resume-spinner.svelte';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import type { PageGlobals } from '$lib/types';

	export let globals: PageGlobals;
	export let location: string;
</script>

<section id="landing-section" class="flex justify-start pb-12 pt-20 md:justify-center md:py-[10vh]">
	<div class="flex flex-col gap-8">
		<ul class="flex flex-wrap items-center gap-4">
			{#if globals.isAvailable}
				<Badge variant="secondary">
					<span class="mr-2 h-1 w-1 rounded-full bg-green-500"></span>
					{m.landing_badge_available()}
				</Badge>
			{:else}
				<Badge variant="secondary">
					<span class="mr-2 h-1 w-1 rounded-full bg-red-500"></span>
					{m.landing_badge_unavailable()}
				</Badge>
			{/if}
			<Badge variant="secondary">{location}</Badge>
		</ul>
		<h1 class="text-5xl font-medium leading-tight md:whitespace-pre lg:text-6xl lg:leading-tight">
			{m.landing_title()}
		</h1>
	</div>
	<div class="absolute right-6 top-0 md:right-12">
		<ResumeSpinner url="/resumes/{getLocale()}.pdf" text={m.landing_resume_title()} />
	</div>
</section>
