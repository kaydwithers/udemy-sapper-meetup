<script>
  import { createEventDispatcher } from "svelte";
  import { isEmpty, isValidEmail } from "../../helpers/validation.js";

  import posts from "../../store.js";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Heading from "../UI/Heading.svelte";
  import Select from "../UI/Select.svelte";

  let category = "";
  let content = "";

  const dispatch = createEventDispatcher();

  $: categoryValid = !isEmpty(category);
  $: contentValid = !isEmpty(content);
  $: formIsValid =
    categoryValid &&
    contentValid;

  function submitForm() {
    const postData = {
      category: category,
      content: content
    };

    // posts.push(newPost); // DOES NOT WORK!
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

  function cancel() {
    dispatch("cancel");
  }
</script>

<Heading
  size="2" 
>
  New post
</Heading>

<form 
  class="w-full"
  on:submit={submitForm}
>
  <!--
  <Select>
    <option>None</option>
    <option>JavaScript</option>
    <option>Svelte</option>
    <option>Vue</option>
  </Select>
  -->

  <TextInput
    id="category"
    label="Category"
    placeholder="Enter a category"
    valid={categoryValid}
    validityMessage="Please enter a valid category."
    value={category}
    on:input={event => (category = event.target.value)}
  /> 
  <TextInput
    id="content"
    label="Content"
    controlType="textarea"
    placeholder="Enter some markdown content"
    valid={contentValid}
    validityMessage="Please enter valid content."
    bind:value={content}
  />
</form>

<div>
  <Button 
    type="button" 
    mode="primary"
    on:click={submitForm} 
    disabled={!formIsValid}
  >
    Save
  </Button>
</div>
