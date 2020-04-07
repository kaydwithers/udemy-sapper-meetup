<script>
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";

  import Button from "./Button.svelte";
  import Heading from "./Heading.svelte";

  // export let content = null;
  export let title;

  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch("cancel");
  }

  let agreed = false;
</script>

<style>
  .modal {
    top: 10vh;
    left: 10%;
    max-height: 80vh;
    overflow: scroll;
  }
</style>

<!-- backdrop -->
<div 
  class="bg-black  fixed  top-0  left-0  h-screen  rounded  w-full  opacity-75  z-10" 
  on:click="{closeModal}"
  transition:fade
/>

<div 
  class="modal  bg-white  fixed  p-4  shadow  rounded  w-4/5  z-20"
  transition:fly="{{ y: 300 }}"
>
  <header class="border-b">
    <Heading size="1">{title}</Heading>
    <slot name="header" />
  </header>

  <div class="p-4">
    <slot />
  </div>

  <div class="disclaimer">
    <p class="text-sm">Before you close, agree to our terms.</p>
    <button on:click="{() => agreed = true}">Agree</button>
  </div>

  <footer class="p-4">
    <slot 
      name="footer" 
      didAgree={agreed}
    >
      <Button 
        on:click="{closeModal}"
        disabled="{!agreed}"
      >
        Close
      </Button>
    </slot>
  </footer>
</div>
