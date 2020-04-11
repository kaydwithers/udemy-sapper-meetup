<script>
	let className = "";
	export { className as class };

	export let py = "py-12  md:py-16";
</script>

<div 
	class="flex  -mx-4  {py}  {className}"
>
	<slot />
</div>
