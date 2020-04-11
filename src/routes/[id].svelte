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

  export let loadedPost;

  let showdownContent = new showdown.Converter().makeHtml(loadedPost.content);
</script>

<section>
  <div>
    <p class="text-sm  mb-4">{loadedPost.date}</p>
    <p class="text-base">{loadedPost.category}</p>
    {@html showdownContent}
    <Button mode="outline" href="/">Close</Button>
  </div>
</section>
