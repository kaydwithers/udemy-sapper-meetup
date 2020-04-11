<script>
  export let color = null;
  export let disabled = false;
  export let href = null;
  export let mode = null;
  export let type = "button";
</script>

{#if href}
  <a 
    class="btn" 
    href="{href}"
  >
    <slot />
  </a>

{:else}
  <button 
    class="btn  {mode}  {color}" 
    {disabled}
    type="{type}"
    on:click
  >
    <slot />
  </button>
{/if}
