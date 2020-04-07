<script>
  export let color = null;
  export let disabled = false;
  export let href = null;
  export let mode = null;
  export let type = "button";
</script>

<style>
  .btn {
    display: inline-flex;
    padding: 1rem 2rem;
  }

  .btn:disabled {
    background-color: lightgray;
  }

  .tertiary {
    background-color: blue;
  }
</style>

{#if href}
<a 
  class="btn  bg-blue-900  text-white" 
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
