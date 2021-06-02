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
      metaData = result;
    } catch (error) {
      metaData = {};
    }
    
  });
</script>

<div class="container">

  {#if metaData}
    <a href={url}
      rel="nofollow noreferrer noopener"
      target="_blank"
    >
      <div class="info">
        <h1>{metaData?.title}</h1>
      </div>
      {#if metaData?.description}
        <div>{metaData.description}</div>
      {/if}
  
  
      {#if metaData?.image}
        <div class="thumbnail">
          <img 
            src={metaData.image}
            alt=""
          />
        </div>
        
      {/if}
    </a>
  {/if}
</div>

<style>
  .container {
    max-width: 780px;
    margin: 0 auto;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    overflow: hidden
  }
  a {
    display: flex;
    align-items: center;
    font-size: 16.5px;
    height: 120px;
    line-height: 1.5;
    transition: 0.2s;
    color: rgba(0, 0, 0, 0.82);
    text-decoration: none;
    background: #fff;
  }
  a:hover {
    background: rgba(239, 246, 251, 0.7);
  }
  .info {
    flex: 1;
    padding: 0.8em 1.2em;
  }

  h1 {
    font-size: 1em;
  }

  .thumbnail > img {
    height: 120px;
  }
</style>