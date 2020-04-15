<script>
  export let full;
</script>

<div class="mx-auto  px-6  {full ? '' : 'container'}">
  <slot />
</div>
