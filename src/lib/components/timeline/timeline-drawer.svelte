<script lang="ts">
	import Badge from '$lib/components/badge.svelte';
	import Button from '$lib/components/button.svelte';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	export let currentTimelineItem;
	export let technologiesTitle;
	export let closeTitle;
	export let membersTitle;

	const dispatch = createEventDispatcher();

	const handleClose = () => {
		dispatch('close');
	};

	// Rendered at the end of <body> so it escapes the GSAP-pinned timeline section:
	// a transform on any ancestor would make `position: fixed` relative to it.
	const portal = (node: HTMLElement) => {
		document.body.appendChild(node);
	};

	let previousHtmlOverflow = '';
	let previousBodyOverflow = '';

	onMount(() => {
		previousHtmlOverflow = document.documentElement.style.overflow;
		previousBodyOverflow = document.body.style.overflow;
		document.documentElement.style.overflow = 'hidden';
		document.body.style.overflow = 'hidden';
	});

	onDestroy(() => {
		if (typeof document === 'undefined') return;
		document.documentElement.style.overflow = previousHtmlOverflow;
		document.body.style.overflow = previousBodyOverflow;
	});
</script>

<div
	use:portal
	data-lenis-prevent
	class="fixed inset-0 z-50 flex flex-col gap-12 overflow-y-auto overscroll-contain bg-primary p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] md:px-12 md:py-12 lg:hidden"
	in:slide={{ duration: 300 }}
	out:slide={{ duration: 300 }}
>
	<div class="self-end">
		<Button on:click={handleClose}>{closeTitle}</Button>
	</div>
	<h2 class="text-4xl font-medium lg:text-5xl">
		{currentTimelineItem.title}
	</h2>
	<div class="flex flex-col gap-8">
		<p class="text-lg">
			{currentTimelineItem.text}
		</p>
		<div class="flex flex-col gap-6 md:flex-row md:gap-8">
			{#if currentTimelineItem.technologies && currentTimelineItem.technologies.length > 0}
				<div class="flex flex-col gap-4">
					<h3 class="text-md font-medium text-secondary/60">
						{technologiesTitle}
					</h3>
					<ul class="flex flex-wrap items-center gap-4">
						{#each currentTimelineItem.technologies as technology}
							<li>
								<Badge variant="secondary">{technology}</Badge>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
			{#if currentTimelineItem.members && currentTimelineItem.members.length > 0}
				<div class="flex flex-col gap-4">
					<h3 class="text-md font-medium text-secondary/60">
						{membersTitle}
					</h3>
					<ul class="flex flex-wrap items-center gap-4">
						{#each currentTimelineItem.members as member}
							<li class="flex">
								<Button as="a" href={member.link}>{member.name}</Button>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	</div>
</div>
