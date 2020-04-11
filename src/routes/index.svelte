<script context="module">
  export function preload(page) {
    return this.fetch("https://knowledge-5fe10.firebaseio.com/posts.json")
      .then(res => {
        if (!res.ok) {
          throw new Error("Fetching posts failed, please try again later!");
        }
        return res.json();
      })
      .then(data => {
        const loadedPosts = [];
        for (const key in data) {
          loadedPosts.push({
            ...data[key],
            id: key
          });
        }
        return { fetchedPosts: loadedPosts.reverse() };
        // setTimeout(() => {
        //   isLoading = false;
        //   posts.setPosts(loadedPosts.reverse());
        // }, 1000);
      })
      .catch(err => {
        error = err;
        isLoading = false;
        console.log(err);
        this.error(500, "Could not fetch posts!");
      });
  }
</script>

<script>
  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import posts from "../store.js";

  import AddPost from "../components/Post/AddPost.svelte";
  import Button from "../components/UI/Button.svelte";
  import EditPost from "../components/Post/EditPost.svelte";
  import Layout from "../components/UI/Layout.svelte";
  import LayoutItem from "../components/UI/LayoutItem.svelte";
  import LoadingSpinner from "../components/UI/LoadingSpinner.svelte";
  import PostItem from "../components/Post/PostItem.svelte";
  import PostFilter from "../components/Post/PostFilter.svelte";

  export let fetchedPosts;

  let loadedPosts = [];
  let editMode;
  let editedId;
  let isLoading;
  let unsubscribe;

  const dispatch = createEventDispatcher();

  let favsOnly = false;

  $: filteredPosts = favsOnly
    ? loadedPosts.filter(m => m.isFavorite)
    : loadedPosts;

  onMount(() => {
    unsubscribe = posts.subscribe(items => {
      loadedPosts = items;
    });
    posts.setPosts(fetchedPosts);
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  function setFilter(event) {
    favsOnly = event.detail === 1;
  }

  function savedPost(event) {
    editMode = null;
    editedId = null;
  }

  function cancelEdit() {
    editMode = null;
    editedId = null;
  }

  function startEdit(event) {
    editMode = "edit";
    editedId = event.detail;
  }

  function startAdd() {
    editMode = "edit";
  }
</script>

<svelte:head>
  <title>All Posts</title>
</svelte:head>

<AddPost />

{#if editMode === 'edit'}
  <EditPost id={editedId} on:save={savedPost} on:cancel={cancelEdit} />
{/if}

{#if isLoading}
  <LoadingSpinner />

{:else}
  <!--
  <Layout>
    <LayoutItem>
      <PostFilter on:select={setFilter} />
      <Button on:click={startAdd}>New Post</Button>
    </LayoutItem>
  </Layout>
  -->

  {#if filteredPosts.length === 0}
    <p>No posts found, you can start adding some.</p>
  {/if}

  <Layout class="flex-wrap">
    {#each filteredPosts as post (post.id)}
    <div
      class="w-full  mb-16"
      transition:scale
      animate:flip={{ duration: 300 }}
    >
      <LayoutItem>
        <PostItem 
          category={post.category} 
          content={post.content} 
          date={post.date} 
          id={post.id} 
          isFav={post.isFavorite} 
          on:edit={startEdit}
        />
      </LayoutItem>
    </div>
    {/each}
  </Layout>
{/if}
