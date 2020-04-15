<script>
  import { createEventDispatcher } from "svelte";

  import Button from "../UI/Button.svelte";

  const dispatch = createEventDispatcher();

  export let getCategories;

  let selectedCategory = "";
</script>

{#each getCategories as category, i}
  <li>
    <Button 
      class="block  mb-2  {selectedCategory === {category} ? 'success' : ''}"
      mode="bare"
      type="button"
      on:click={() => {
        selectedCategory = {category};
        dispatch('select', {category});
      }}
    >
      {category}
    </Button>
  </li>
{/each}

<!-- 
<div>
  <button
    type="button"
    class:active={selectedButton === 0}
    on:click={() => {
      selectedButton = 0;
      dispatch('select', 0);
    }}
  >
    All
  </button>
  <button
    type="button"
    class:active={selectedButton === 1}
    on:click={() => {
      selectedButton = 1;
      dispatch('select', 1);
    }}
  >
    Favorites
  </button>
</div>
-->
