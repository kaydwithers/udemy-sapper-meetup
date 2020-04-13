<script>
  import { slide } from "svelte/transition";
</script>

<span 
  class="text-xs  inline-block  mb-2  px-2  rounded  border  border-cyan  bg-cyan  text-black"
  transition:slide
>
  <slot />
</span>
