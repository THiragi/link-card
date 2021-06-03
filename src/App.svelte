<script lang="ts">
  import { onMount } from "svelte";
  import { fetcher } from './fetcher';
  
  const params = new URLSearchParams(window.location.search);
  const url = params.get('url');
  const hostname = new URL(url).hostname;

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
        {#if metaData?.description}
          <div class="description">
            {#if metaData.description.length > 120}
              {`${metaData.description.slice(0, 120)}...`}
            {:else}
              {metaData.description}
            {/if}
          </div>
        {/if}
        {#if hostname}
          <div class="hostname">
            <img 
              src={`https://www.google.com/s2/favicons?sz=32&domain=${hostname}`}
              width="16"
              height="16"
              alt={hostname}
            />
            <span >
              {hostname}
            </span>
          </div>          
        {/if}
      </div>
  
  
      {#if metaData?.image}
        <div 
          class="thumbnail"
          style={`background-image: url(${metaData.image});`}
        >
        </div>
        
      {/if}
    </a>
  {/if}
</div>

<style>
  .container {
    max-width: 720px;
    margin: 0 auto;
    border: 1px solid #eaeaea;
    border-radius: 8px;
    overflow: hidden
  }
  a {
    display: flex;
    align-items: center;
    font-size: 16.5px;
    height: 180px;
    line-height: 1.5;
    transition: 0.2s;
    color: rgba(0, 0, 0, 0.82);
    text-decoration: none;
    background: #fff;
  }
  /* a:hover {
    background: rgba(239, 246, 251, 0.7);
  } */
  .info {
    flex: 1;
    padding: 0.8em 1.2em;
  }

  h1 {
    font-size: 1em;
  }
  
  .description {
    font-size: 0.8em;
    color: #888888;
  }

  .thumbnail {
    height: 180px;
    width: 180px;
    background-position: center;
    background-size: cover;
  }

  .hostname {
    margin-top:1em;
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .hostname > img {
    margin-right: 0.4em;
  }

  .hostname > span {
    font-size: 0.8em;
  }
</style>