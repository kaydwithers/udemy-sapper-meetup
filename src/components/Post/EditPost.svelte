<script>
  import posts from "../../store.js";
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import { isEmpty, isValidEmail } from "../../helpers/validation.js";

  export let id = null;

  // let date = "";
  let category = "";
  let content = "";

  if (id) {
    const unsubscribe = posts.subscribe(items => {
      const selectedPost = items.find(i => i.id === id);
      // date = selectedPost.date;
      category = selectedPost.category;
      content = selectedPost.content;
    });

    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  // $: dateValid = !isEmpty(date);
  $: categoryValid = !isEmpty(category);
  $: contentValid = !isEmpty(content);
  $: formIsValid =
    // dateValid &&
    categoryValid &&
    contentValid;

  function submitForm() {
    const postData = {
      // date: date,
      category: category,
      content: content
    };

    // posts.push(newPost); // DOES NOT WORK!
    if (id) {
      fetch(`https://knowledge-5fe10.firebaseio.com/posts/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("An error occurred, please try again!");
          }
          posts.updatePost(id, postData);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      fetch("https://knowledge-5fe10.firebaseio.com/posts.json", {
        method: "POST",
        body: JSON.stringify({ ...postData, isFavorite: false }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("An error occurred, please try again!");
          }
          return res.json();
        })
        .then(data => {
          posts.addPost({
            ...postData,
            isFavorite: false,
            id: data.name
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
    dispatch("save");
  }

  function deletePost() {
    fetch(`https://knowledge-5fe10.firebaseio.com/posts/${id}.json`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("An error occurred, please try again!");
        }
        posts.removePost(id);
      })
      .catch(err => console.log(err));
    dispatch("save");
  }

  function cancel() {
    dispatch("cancel");
  }
</script>

<Modal 
  title={ id ? 'Edit Post' : 'Add Post' } 
  on:cancel
>
  <form 
    class="w-full"
    on:submit={submitForm}
  >
    <!-- 
    <TextInput
      id="date"
      label="Date"
      valid={dateValid}
      validityMessage="Please enter a valid date."
      value={date}
      on:input={event => (date = event.target.value)}
    /> 
    -->
    <TextInput
      id="category"
      label="Category"
      valid={categoryValid}
      validityMessage="Please enter a valid category."
      value={category}
      on:input={event => (category = event.target.value)}
    /> 
    <TextInput
      id="content"
      label="Content"
      controlType="textarea"
      valid={contentValid}
      validityMessage="Please enter valid content."
      bind:value={content}
    />
  </form>

  <div slot="footer">
    <Button 
      type="button" 
      mode="secondary" 
      on:click={cancel}
    >
      Cancel
    </Button>

    <Button 
      type="button" 
      mode="primary"
      on:click={submitForm} 
      disabled={!formIsValid}
    >
      Save
    </Button>

    {#if id}
    <Button 
      type="button" 
      mode="error"
      on:click={deletePost}
    >
      Delete
    </Button>
    {/if}
  </div>
</Modal>
