<script>
	let className = "";
	export { className as class };

  export let width = "";
</script>

<div class="px-6  w-full  {width}  {className}">
	<slot />
</div>
