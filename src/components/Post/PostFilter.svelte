<script>
  import { createEventDispatcher } from "svelte";

  import Button from "../UI/Button.svelte";

  const dispatch = createEventDispatcher();

  let selectedButton = 0;
</script>

<li class="block  mb-2">
  <Button
    type="button"
    mode="bare"
    class={selectedButton === 0 ? 'success' : ''}
    on:click={() => {
      selectedButton = 0;
      dispatch('select', 0);
    }}
  >
    All
  </Button>
</li>

<li class="block  mb-2">
  <Button
    type="button"
    mode="bare"
    class={selectedButton === 1 ? 'success' : ''}
    on:click={() => {
      selectedButton = 1;
      dispatch('select', 1);
    }}
  >
    Favorites
  </Button>
</li>
