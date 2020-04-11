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
  }
</style>

<!-- backdrop -->
<div 
  class="bg-black  fixed  top-0  left-0  h-screen  rounded  w-full  opacity-75  z-10" 
  on:click="{closeModal}"
  transition:fade
/>

<div 
  class="modal  bg-background  fixed  p-8  shadow  rounded  border  border-tint-3  w-4/5  z-20  overflow-scroll"
  transition:fly="{{ y: 300 }}"
>
  <header>
    <Heading 
      class="text-white"
      size="2"
    >
      {title}
    </Heading>
    <slot name="header" />
  </header>

  <div>
    <slot />
  </div>

  <!--
  <div class="disclaimer">
    <p class="text-sm">Before you close, agree to our terms.</p>
    <button on:click="{() => agreed = true}">Agree</button>
  </div>
  -->

  <footer>
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
