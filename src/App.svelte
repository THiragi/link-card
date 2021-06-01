<script lang="ts">
  import { onMount } from "svelte";
  import { fetcher } from './fetcher';
  
  const params = new URLSearchParams(window.location.search);
  const url = params.get('url');

  type Meta = {
    title?: string;
    description?:string;
    image?: string;
  }

  let metaData: undefined | Meta;

  onMount(async () => {
    try {
      const result = await fetcher<Meta>(`/api?url=${url}`);
      console.log(result)
      metaData = result;
    } catch (error) {
      console.log(error);
      metaData = {};
    }
    
  });
</script>

<main>
  <h1>URL</h1>
  <p>{url}</p>
  <h1>TITLE</h1>
  <p>{metaData?.title}</p>
</main>
