<script>
	let className = "";
	export { className as class };

  export let disabled = false;
  export let href = null;
  export let mode = null;
  export let type = "button";
</script>

{#if href}
  <a 
    class="{className}" 
    href="{href}"
  >
    <slot />
  </a>

{:else}
  <button 
    class="btn  {mode}  {className}" 
    {disabled}
    type="{type}"
    on:click
  >
    <slot />
  </button>
{/if}
