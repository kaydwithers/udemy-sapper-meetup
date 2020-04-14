<script>
  let className = "";
  export { className as class };

  export let disabled = false;
  export let href = null;
  export let mode = null;
  export let type = "button";

  /**
   * Button and href component.
   * @example <caption>Example usage of href.</caption>
   * <Button 
   *   class="mb-4"
   *   href="#"
   * >
   *   Href text
   * </Button>
   * @example <caption>Example usage of button.</caption>
   * <Button 
   *   class="mb-4"
   *   mode="primary"
   *   type="button"
   *   on:click={myFunction}
   * >
   *   Button text
   * </Button>
   * @type {String} mode - primary, secondary.
   */
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
