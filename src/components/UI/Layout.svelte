<script>
  let className = "";
  export { className as class };

  export let mb = "mb-18  md:mb-24";
</script>

<div class="flex  -mx-6  {mb}  {className}">
  <slot />
</div>
