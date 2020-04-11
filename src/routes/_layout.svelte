<script>
	import Header from "../components/UI/Header.svelte";
	import Page from "../components/UI/Page.svelte";
	import Nav from '../components/UI/Nav.svelte';

	export let segment;
</script>

<Header />

<Nav {segment} />

<main class="py-24">
	<Page>
		<slot></slot>
	</Page>
</main>
