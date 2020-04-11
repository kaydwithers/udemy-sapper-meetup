<script>
  import Heading from "./Heading.svelte";
  import Layout from "./Layout.svelte";
  import LayoutItem from "./LayoutItem.svelte";
</script>

<header class="bg-violet">
  <Layout 
    py="py-4" 
    class="items-center"
  >
    <LayoutItem class="text-center">
      <Heading 
        size="1"
        spacing="mb-0"
      >
        📚 Maester Winston's Knowledge Compendium
      </Heading>
    </LayoutItem>
  </Layout>
</header>
