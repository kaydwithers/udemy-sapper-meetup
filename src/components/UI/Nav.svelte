<script>
	// import Button from "./Button.svelte";

	export let segment;
</script>

<nav>
	<ul>
		<li class="inline-block  px-4  py-2">
			<a 
				aria-current='{segment === undefined ? "page" : undefined}' 
				href='.'
			>home</a>
		</li>

		<li class="inline-block  px-4  py-2">
			<a 
				aria-current='{segment === "about" ? "page" : undefined}' 
				href='about'
			>about</a>
		</li>

		<li class="inline-block  px-4  py-2">
			<a 
				aria-current='{segment === "contact" ? "page" : undefined}' 
				href='contact'
			>contact</a>
		</li>

		<!-- 
			for the blog link, we're using rel=prefetch so that Sapper prefetches
		  the blog data when we hover over the link or tap it on a touchscreen
		-->
		<li class="inline-block  px-4  py-2">
			<a 
				rel=prefetch 
				aria-current='{segment === "blog" ? "page" : undefined}' 
				href='blog'
			>blog</a>
		</li>

		<li class="inline-block  px-4  py-2">
			<a 
				href='https://github.com/kaydwithers/udemy-sapper-meetup'
			>github</a>
		</li>
	</ul>
</nav>
