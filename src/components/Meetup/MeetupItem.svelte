<script>
  import { createEventDispatcher } from "svelte";
  import meetups from "../../store.js";
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";
  import LoadingSpinner from "../UI/LoadingSpinner.svelte";

  export let id;
  export let title;
  export let subtitle;
  export let imageUrl;
  export let description;
  export let address;
  export let email;
  export let isFav;

  let isLoading = false;

  const dispatch = createEventDispatcher();

  function toggleFavorite() {
    isLoading = true;
    fetch(`https://udemy-svelte-meetup.firebaseio.com/meetups/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify({ isFavorite: !isFav }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("An error occurred, please try again!");
        }
        isLoading = false;
        meetups.toggleFavorite(id);
      })
      .catch(err => {
        isLoading = false;
        console.log(err);
      });
  }
</script>

<article class="shadow">
  <header>
    <h1>
      {title}
      {#if isFav}
        <Badge>FAVORITE</Badge>
      {/if}
    </h1>
    <h2>{subtitle}</h2>
    <p>{address}</p>
  </header>

  <div class="image">
    <img src={imageUrl} alt={title} />
  </div>

  <div class="content">
    <p>{description}</p>
  </div>

  <footer>
    <Button mode="outline" type="button" on:click={() => dispatch('edit', id)}>
      Edit
    </Button>
    {#if isLoading}
      <!-- <LoadingSpinner /> -->
      <span>Changing...</span>
    {:else}
      <Button
        mode="outline"
        color={isFav ? null : 'success'}
        type="button"
        on:click={toggleFavorite}>
        {isFav ? 'Unfavorite' : 'Favorite'}
      </Button>
    {/if}
    <Button href="/{id}">
      Show Details
    </Button>
  </footer>
</article>
