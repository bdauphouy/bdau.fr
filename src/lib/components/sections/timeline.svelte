<script lang="ts">
	import Badge from '$lib/components/badge.svelte';
	import Button from '$lib/components/button.svelte';
	import TimelineDrawer from '$lib/components/timeline/timeline-drawer.svelte';
	import TimelinePath from '$lib/components/timeline/timeline-path.svelte';
	import { m } from '$lib/paraglide/messages';
	import type { TimelineItem } from '$lib/types';
	import { fade } from 'svelte/transition';

	export let items: TimelineItem[];

	let currentTimelineItemIndex = 0;
	let isTimelineItemContentExpanded = false;

	const timelineContentMaxLength = 100;

	$: orderedTimelineItems = items.sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	$: currentTimelineItem = orderedTimelineItems[currentTimelineItemIndex];

	$: displayLearnMoreButton =
		currentTimelineItem.text.length > timelineContentMaxLength ||
		(currentTimelineItem.technologies && currentTimelineItem.technologies.length > 0) ||
		(currentTimelineItem.members && currentTimelineItem.members.length > 0);

	$: currentItemSlicedContent =
		currentTimelineItem.text.length > timelineContentMaxLength
			? currentTimelineItem.text.slice(0, timelineContentMaxLength) + '...'
			: currentTimelineItem.text;

	const handleTimelineItemIntersect = (event: CustomEvent<number>) => {
		currentTimelineItemIndex = event.detail;
	};

	const handleContentExpand = () => {
		isTimelineItemContentExpanded = !isTimelineItemContentExpanded;
	};
</script>

<section
	id="timeline-section"
	class="flex h-screen flex-col-reverse justify-start gap-12 py-20 pt-6 md:gap-20 md:pt-12 lg:grid lg:h-auto lg:grid-cols-2 lg:py-32"
>
	{#if isTimelineItemContentExpanded}
		<TimelineDrawer
			{currentTimelineItem}
			membersTitle={m.timeline_members_title()}
			technologiesTitle={m.timeline_technologies_title()}
			closeTitle={m.timeline_close_title()}
			on:close={handleContentExpand}
		/>
	{/if}
	<div
		id="timeline-content"
		class="flex h-2/5 max-w-md flex-col justify-end gap-8 transition-colors duration-300 md:max-w-lg lg:h-auto lg:justify-start lg:gap-12"
	>
		{#key currentTimelineItemIndex}
			<h2 in:fade class="text-4xl font-medium lg:text-5xl">
				{currentTimelineItem.title}
			</h2>
			<div in:fade={{ delay: 200 }} class="flex flex-col gap-6 lg:gap-8">
				<p class="block text-lg md:hidden">
					{currentItemSlicedContent}
				</p>
				<p class="hidden text-lg md:block">
					{currentTimelineItem.text}
				</p>
				{#if currentTimelineItem.link}
					<div class="hidden self-start md:flex">
						<Button as="a" href={currentTimelineItem.link}>
							{m.timeline_link_title()}
						</Button>
					</div>
				{/if}
				{#if currentTimelineItem.link || displayLearnMoreButton}
					<div class="flex items-center gap-4 md:hidden">
						{#if currentTimelineItem.link}
							<div class="flex self-start">
								<Button as="a" href={currentTimelineItem.link}>
									{m.timeline_link_title()}
								</Button>
							</div>
						{/if}
						{#if displayLearnMoreButton}
							<div class="inline-flex md:hidden">
								<Button on:click={handleContentExpand}>
									{m.timeline_learn_more_title()}
								</Button>
							</div>
						{/if}
					</div>
				{/if}
				<div class="hidden flex-col gap-6 md:flex lg:gap-8">
					{#if currentTimelineItem.technologies && currentTimelineItem.technologies.length > 0}
						<div class="flex flex-col gap-4">
							<h3 class="text-md font-medium text-secondary/60">
								{m.timeline_technologies_title()}
							</h3>
							<ul class="flex items-center gap-4">
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
								{m.timeline_members_title()}
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
		{/key}
	</div>
	<div class="mx-auto flex w-full flex-col items-center md:w-2/3 lg:w-full">
		<TimelinePath items={orderedTimelineItems} on:intersect={handleTimelineItemIntersect} />
		<Badge variant="secondary">{m.timeline_scroll_to_explore_title()}</Badge>
	</div>
</section>
