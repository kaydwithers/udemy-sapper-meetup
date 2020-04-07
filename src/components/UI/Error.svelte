<script>
  import Modal from "./Modal.svelte";

  export let message;
</script>

<Modal 
  title="An error occured"
  on:cancel
>
  <p class="text-base  inline">{message}</p>
</Modal>
