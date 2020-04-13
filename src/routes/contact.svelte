<script>
  import Button from "../components/UI/Button.svelte";
  import Heading from "../components/UI/Heading.svelte";
  import Layout from "../components/UI/Layout.svelte";
  import LayoutItem from "../components/UI/LayoutItem.svelte";
  import Page from "../components/UI/Page.svelte";
</script>

<svelte:head>
	<title>Contact</title>
</svelte:head>

<Page>
  <Layout>
    <LayoutItem>

      <Heading
        size="2" 
      >
        Contact
      </Heading>

      <Button
        type="href
        "href="mailto:kaydwithers@gmail.com"
      >
        kaydwithers@gmail.com
      </Button>

    </LayoutItem>
  </Layout>
</Page>
