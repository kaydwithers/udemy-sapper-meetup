<script>
  import Heading from "./Heading.svelte";
  import Layout from "./Layout.svelte";
  import LayoutItem from "./LayoutItem.svelte";
  import Page from "./Page.svelte";
</script>

<header class="bg-violet">
  <Page>
    <Layout 
      mb="mb-0"
      class="items-center  py-4"
    >
      <LayoutItem class="text-center">
        <Heading 
          size="1"
          spacing="mb-0"
        >
          Kayd&rsquo;s Knowledge Memorandum 📚
        </Heading>
      </LayoutItem>
    </Layout>
  </Page>
</header>
