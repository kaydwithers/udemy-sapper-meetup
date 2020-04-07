<script>
  export let size = "1";
  export let mb = "mb-4";
</script>

{#if size === '1'}
<h2 class="text-3xl  bold  {mb}">
  <slot />
</h2>

{:else if size === '2'}
<h2 class="text-2xl  bold  {mb}">
  <slot />
</h2>

{:else}
<h6 class="text-xl  bold  {mb}">
  <slot />
</h6>
{/if}
