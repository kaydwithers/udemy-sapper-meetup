<script>
  import { createEventDispatcher } from "svelte";
  import showdown from 'showdown';

  import posts from "../../store.js";
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";
  import LoadingSpinner from "../UI/LoadingSpinner.svelte";

  export let id;
  export let category;
  export let content;
  export let isFav;

  let isLoading = false;

  const dispatch = createEventDispatcher();

  let date = "";
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  date = `${mm}/${dd}/${yyyy}`;

  let showdownContent = new showdown.Converter().makeHtml(content);

  function toggleFavorite() {
    isLoading = true;
    fetch(`https://knowledge-5fe10.firebaseio.com/posts/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify({ isFavorite: !isFav }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("An error occurred, please try again!");
        }
        isLoading = false;
        posts.toggleFavorite(id);
      })
      .catch(err => {
        isLoading = false;
        console.log(err);
      });
  }
</script>

<article class="">
  <header>
    <div class="text-center  -mt-3">
      <p class="text-sm  mb-4">{date}</p>
    </div>

    <p class="text-base  mb-4">{category}</p>

    {#if isFav}
    <Badge>Favourite</Badge>
    {/if}
  </header>

  <div class="overflow-hidden  mb-4">
    {@html showdownContent}
  </div>

  <footer>
    <Button 
      mode="primary" 
      type="button" 
      on:click={() => dispatch('edit', id)}
    >
      Edit
    </Button>

    {#if isLoading}
      <!-- <LoadingSpinner /> -->
      <span>Changing...</span>

    {:else}
      <Button
        mode="primary"
        class={isFav ? null : 'text-warning'}
        type="button"
        on:click={toggleFavorite}>
        {isFav ? 'Unfavourite' : 'Favourite'}
      </Button>
    {/if}

    <Button 
      class="px-4"
      href="/{id}"
    >
      Show Details
    </Button>
  </footer>
</article>
