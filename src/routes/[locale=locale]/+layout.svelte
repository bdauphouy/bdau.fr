<script lang="ts">
	import Footer from '$lib/components/sections/footer.svelte';
	import Header from '$lib/components/sections/header.svelte';
	import { gsap } from 'gsap';
	import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import type { PageData } from './$types';

	gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

	export let data: PageData;
</script>

<Header />

<main class="relative p-6 md:px-12 md:py-10">
	<slot />
</main>

<Footer lastUpdate={data.lastUpdate} />
