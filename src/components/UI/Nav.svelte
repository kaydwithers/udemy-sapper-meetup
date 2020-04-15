<script>
	import Button from "./Button.svelte";

	export let segment;
</script>

<nav class="border-b  border-tint-3  py-2">
	<ul>
		<li class="inline-block  px-4  py-2">
			<Button 
				aria-current='{segment === undefined ? "page" : undefined}' 
				class='{segment === undefined ? "success" : ""}' 
				href='.'
				mode="bare"
			>home</Button>
		</li>

		<li class="inline-block  px-4  py-2">
			<Button 
				aria-current='{segment === "about" ? "page" : undefined}' 
				class='{segment === "about" ? "success" : ""}' 
				href='about'
				mode="bare"
			>about</Button>
		</li>

		<li class="inline-block  px-4  py-2">
			<Button 
				aria-current='{segment === "contact" ? "page" : undefined}' 
				class='{segment === "contact" ? "success" : ""}' 
				href='contact'
				mode="bare"
			>contact</Button>
		</li>

		<!-- 
			for the blog link, we're using rel=prefetch so that Sapper prefetches
		  the blog data when we hover over the link or tap it on a touchscreen
		-->
		<li class="inline-block  px-4  py-2">
			<Button 
				rel=prefetch 
				aria-current='{segment === "blog" ? "page" : undefined}' 
				class='{segment === "blog" ? "success" : ""}' 
				href='blog'
				mode="bare"
			>blog</Button>
		</li>

		<li class="inline-block  px-4  py-2">
			<Button 
				href='https://github.com/kaydwithers/udemy-sapper-meetup'
			>github</Button>
		</li>
	</ul>
</nav>
