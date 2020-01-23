<script>
  export let source, query;
  import search from '../search';

  let results = [];
  
  (async () => results = await search(source, query))();
</script>

<style>
a {
  display: block;
}
</style>

<h1>{query}</h1>

{#each results as result}
  <a href={result.link}>
    <h4>{result.title}</h4>
    <p>{result.description}</p>
  </a>
{/each}