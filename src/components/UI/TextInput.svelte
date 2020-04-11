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

  let styling = "w-full  bg-transparent  p-2  text-white  caret-white  overflow-elipsis  rounded  border  border-tint-3  focus:outline-none  focus:border-primary  placeholder-tint-3"
  let touched = false;
</script>

<div class="mb-4">
  <label 
    class="block  pb-2" 
    for="{id}"
  >
    {label}
  </label>

  {#if controlType === 'textarea'}
    <textarea 
      class="{styling}  {!valid && touched ? 'border-error' : ''}  h-48"
      {rows}
      {id}
      {placeholder}
      bind:value="{value}"
      on:blur="{() => touched = true}"
      on:input
    />
  {:else}

    <input 
      class="{styling}  {!valid && touched ? 'border-error' : ''}"
      {type}
      {id}
      {placeholder}
      {value}
      on:blur="{() => touched = true}"
      on:input
    />
  {/if}

  {#if validityMessage && !valid && touched}
    <p class="text-sm  text-error">{validityMessage}</p>
  {/if}
</div>


