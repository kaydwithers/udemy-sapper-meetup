<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>

<script>
	import Heading from "../../components/UI/Heading.svelte";
  import Layout from "../../components/UI/Layout.svelte";
  import LayoutItem from "../../components/UI/LayoutItem.svelte";
  import Page from "../../components/UI/Page.svelte";

	export let posts;
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<Page>
  <Layout>
    <LayoutItem>

			<Heading
				size="2" 
			>
				Recent posts
			</Heading>

			<ul class="mb-4">
				{#each posts as post}
					<!-- 
						we're using the non-standard `rel=prefetch` attribute to
						tell Sapper to load the data for the page as soon as
						the user hovers over the link or taps it, instead of
						waiting for the 'click' event
					-->
					<li>
						<p><a rel='prefetch' href='blog/{post.slug}'>{post.title}</a></p>
					</li>
				{/each}
			</ul>

    </LayoutItem>
  </Layout>
</Page>
