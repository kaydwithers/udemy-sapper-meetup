<script>
  export let full;
</script>

<div class="mx-auto  px-4  {full ? '' : 'container'}">
  <slot />
</div>
