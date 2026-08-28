<script lang="ts">
	import Badge from '$lib/components/badge.svelte';
	import Button from '$lib/components/button.svelte';
	import type { Project } from '$lib/types';

	export let project: Project;
	export let isArchive = false;
</script>

<div class="group relative overflow-hidden rounded-lg ring-2 ring-secondary/20">
	<div class="relative bg-primary">
		{#if project.badges && project.badges.length > 0}
			<ul
				class="absolute right-0 top-0 z-10 m-3 flex flex-wrap items-center gap-2 opacity-100 transition-opacity duration-300 group-focus-within:opacity-0 group-hover:opacity-0"
			>
				{#each project.badges as badge}
					<li>
						<Badge>{badge.title}</Badge>
					</li>
				{/each}
			</ul>
		{/if}
		<div
			class="transition-all duration-300 group-focus-within:opacity-25 group-focus-within:blur-sm group-hover:opacity-25 group-hover:blur-sm"
		>
			{#if isArchive || !project.thumbnail}
				<div class="flex h-52 w-full items-center justify-center bg-primary">
					<h3 class="text-2xl text-white">
						{project.title}
					</h3>
				</div>
			{:else}
				<img src={project.thumbnail} alt={project.title} />
			{/if}
		</div>
	</div>
	<div
		class="absolute inset-0 left-0 top-0 z-20 flex h-full w-full cursor-pointer flex-col justify-center gap-1 px-5 py-3 opacity-0 transition-opacity duration-300 focus-within:opacity-100 group-hover:opacity-100"
	>
		<h2 class="text-lg font-medium text-secondary">{project.title}</h2>
		<p class="w-4/5 text-sm text-secondary/60">{project.description}</p>
		{#if project.links && project.links.length > 0}
			<ul class="mt-4 flex gap-4">
				{#each project.links as link}
					<li class="flex">
						<Button as="a" href={link.url}>{link.title}</Button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
