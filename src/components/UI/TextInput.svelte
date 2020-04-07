<script>
  export let controlType = null;
  export let id;
  export let label;
  export let placeholder;
  export let rows = null;
  export let type = "text";
  export let valid = true;
  export let validityMessage = "";
  export let value;

  let touched = false;
</script>

<style>
  label {
    display: block;
  }

  input,
  textarea {
    border: 1px solid black;
    color: black;
  }
</style>

<div class="mb-4">
  <label for="{id}">{label}</label>
  {#if controlType === 'textarea'}
    <textarea 
      class="border  {valid && !touched ? '' : 'border-red-300'}"
      {rows}
      {id}
      {placeholder}
      bind:value="{value}"
      on:blur="{() => touched = true}"
      on:input
    />
  {:else}
    <input 
      class="border  {valid && !touched ? '' : 'border-red-300'}"
      {type}
      {id}
      {placeholder}
      {value}
      on:blur="{() => touched = true}"
      on:input
    />
  {/if}
  {#if validityMessage && !valid && touched}
  <p class="text-sm  text-red-300">{validityMessage}</p>
  {/if}
</div>


