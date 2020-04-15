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
  import BackToTop from '../components/UI/BackToTop.svelte';
  import Button from "../components/UI/Button.svelte";
  import CategoryFilter from "../components/Post/CategoryFilter.svelte";
  import EditPost from "../components/Post/EditPost.svelte";
  import Heading from "../components/UI/Heading.svelte";
  import Layout from "../components/UI/Layout.svelte";
  import LayoutItem from "../components/UI/LayoutItem.svelte";
  import LoadingSpinner from "../components/UI/LoadingSpinner.svelte";
  import Page from "../components/UI/Page.svelte";
  import PostItem from "../components/Post/PostItem.svelte";
  import PostFilter from "../components/Post/PostFilter.svelte";

  export let fetchedPosts;

  let categories = [];
  let editMode;
  let editedId;
  let loadedPosts = [];
  let isLoading;
  let unsubscribe;

  const dispatch = createEventDispatcher();

  let favsOnly = false;
  let isCategoryActive = false;
  let selectedCategory = "";

  $: filteredPosts = favsOnly
    ? loadedPosts.filter(p => p.isFavorite)
    : loadedPosts;

  // $: filteredCategories = selectedCategory
  //   ? loadedPosts.filter(c => c.category)
  //   : categories.filter((item, index) => categories.indexOf(item) === index);

  $: getCategories = categories.filter((item, index) => categories.indexOf(item) === index);

  $: filteredCategories = loadedPosts.filter((p => p.category === selectedCategory))

  onMount(() => {
    unsubscribe = posts.subscribe(items => {
      loadedPosts = items;
      categories = items.map(c => c.category);
      // getCategories = categories.filter((item, index) => categories.indexOf(item) === index);
      console.log('categories: ', categories);
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

  function setCategory(event) {
    selectedCategory = event.detail.category;

    if (selectedCategory) {
      isCategoryActive = true;
    }

    // loadedPosts.category
    // activeCategory = getCategories.filter((i) => )

    console.log('loadedPosts: ', loadedPosts);
    console.log('getCategories: ', getCategories);
    console.log('event: ', event);
    console.log('event.detail.category: ', event.detail.category);
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

<Page full>
  <Layout class="relative">
    <LayoutItem class="hidden  md:block  md:w-2/12  border-r  border-tint-3">
      <div class="sticky  top-0  pt-8">
        <Heading
          size="2" 
        >
          Categories
        </Heading>

        <ul>
          <PostFilter on:select={setFilter} />
          <CategoryFilter
            getCategories={getCategories}
            on:select={setCategory}
          />
        </ul>
      </div>
    </LayoutItem>

    <LayoutItem class="md:w-10/12">
      <div class="mb-24  pt-8">
        <AddPost />
      </div>

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

          <LayoutItem>
            <Heading
              size="2" 
            >
              All posts
            </Heading>
          </LayoutItem>

          {#each filteredPosts as post (post.id)}
          <div
            class="w-full  pb-8  border-b  first:border-t  border-tint-3"
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

	    <BackToTop />
    </LayoutItem>

  </Layout>

</Page>
