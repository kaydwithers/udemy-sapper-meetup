<script>
	let className = "text-primary";
	export { className as class };

  export let size = "1";
  export let spacing = "mb-4";
</script>

{#if size === '1'}
<h1 class="text-3xl  font-bold  {className}  {spacing}">
  <slot />
</h1>

{:else if size === '2'}
<h2 class="text-2xl  font-bold  {className}  {spacing}">
  <slot />
</h2>

{:else}
<h6 class="text-xl  font-bold  {className}  {spacing}">
  <slot />
</h6>
{/if}
