<script lang="ts">
	import Meta from '$lib/components/meta.svelte';
	import Contact from '$lib/components/sections/contact.svelte';
	import Landing from '$lib/components/sections/landing.svelte';
	import Projects from '$lib/components/sections/projects.svelte';
	import Timeline from '$lib/components/sections/timeline.svelte';
	import { m } from '$lib/paraglide/messages';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import Lenis from 'lenis';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		const lenis = new Lenis();

		lenis.on('scroll', ScrollTrigger.update);

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});

		gsap.ticker.lagSmoothing(0);
	});

	onDestroy(() => {
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
	});
</script>

<Meta
	title={m.meta_portfolio_title()}
	description={m.meta_portfolio_description()}
	keywords={m.meta_portfolio_keywords()}
	globals={data.content.globals}
/>

<Landing
	globals={data.content.globals}
	location={data.location}
	highlightedProjects={data.content.projects}
/>

<Projects content={data.content.projects} />

<Timeline items={data.content.timeline.items} />

<Contact globals={data.content.globals} />
