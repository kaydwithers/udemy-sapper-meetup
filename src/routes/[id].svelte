<script context="module">
  export function preload(page) {
    const postId = page.params.id;

    return this.fetch(
      `https://knowledge-5fe10.firebaseio.com/posts/${postId}.json`
    )
      .then(res => {
        if (!res.ok) {
          throw new Error("Fetching posts failed, please try again later!");
        }
        return res.json();
      })
      .then(postData => {
        return { loadedPost: { ...postData, id: postId } };
      })
      .catch(err => {
        this.error(404, "Could not fetch post!");
      });
  }
</script>

<script>
  import { onMount } from "svelte";
  import showdown from 'showdown';

  import posts from "../store.js";
  import Button from "../components/UI/Button.svelte";
  import Heading from "../components/UI/Heading.svelte";
  import Layout from "../components/UI/Layout.svelte";
  import LayoutItem from "../components/UI/LayoutItem.svelte";
  import Page from "../components/UI/Page.svelte";

  export let loadedPost;

  let showdownContent = new showdown.Converter().makeHtml(loadedPost.content);
</script>

<Page>
  <Layout>
    <LayoutItem>
      <Heading
        size="2" 
      >
        {loadedPost.id}
      </Heading>

      <p class="text-sm  mb-4">{loadedPost.date}</p>
      <p class="text-base">{loadedPost.category}</p>
      {@html showdownContent}
      <Button mode="outline" href="/">Close</Button>
    </LayoutItem>
  </Layout>
</Page>
