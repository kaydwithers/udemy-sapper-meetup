<script>
  import { slide } from "svelte/transition";
</script>

<span 
  class="text-xs  uppercase  inline-block  mx-1  px-2  rounded  border  border-red-900  bg-red-900  text-white"
  transition:slide
>
  <slot />
</span>
