<script>
	let className = "";
	export { className as class };

  export let size = "1";
</script>

{#if size === '1'}
<h1 class="text-3xl  bold  {className}">
  <slot />
</h1>

{:else if size === '2'}
<h2 class="text-2xl  bold  {className}">
  <slot />
</h2>

{:else}
<h6 class="text-xl  bold  {className}">
  <slot />
</h6>
{/if}
