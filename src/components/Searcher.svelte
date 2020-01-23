<script>
  export let source, query;
  import search from '../search';

  let results = [];
  
  (async () => results = await search(source, query))();
</script>

<style>
.container {
  min-width: 30rem;
  max-width: 30rem;
  display: flex;
  padding: 1rem;
  flex-flow: column nowrap;
  overflow-y: auto;
}

a {
  display: block;
  text-decoration: none;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3);
  padding: 1rem;
  margin-bottom: 1rem;
}


a p {
  color: rgba(0, 0, 0, 0.7);
}

a p:last-child {
  margin-bottom: 0;
}
</style>

<div class="container">
  <h2>{source}</h2>

  {#each results as result}
    <a href={result.link} target="_blank">
      <h3>{result.title}</h3>
      <p>{result.description}</p>
    </a>
{/each}
</div>