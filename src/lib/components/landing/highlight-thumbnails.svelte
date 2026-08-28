<script lang="ts">
	import type { Project } from '$lib/types';

	export let projects: Project[];

	const rotations = ['-rotate-6', 'rotate-3', '-rotate-3', 'rotate-6', '-rotate-2'];
</script>

{#if projects.length > 0}
	<ul class="flex items-center">
		{#each projects as project, i (project.id)}
			<li
				class="{i > 0 ? '-ml-4' : ''} {rotations[
					i % rotations.length
				]} relative shrink-0 transition-transform duration-300 hover:z-10 hover:rotate-0 hover:scale-110"
				style="z-index: {projects.length - i};"
			>
				<img
					src={project.thumbnail}
					alt={project.title}
					class="h-14 w-14 rounded-xl border-2 border-primary object-cover ring-2 ring-secondary/20 md:h-16 md:w-16"
				/>
			</li>
		{/each}
	</ul>
{/if}
