<script>
  import axios from 'axios';
  export let query;

  let results = [];

  async function getResults() {
    let res = await axios.get(`/jstor/${query}`);
    res = res.data;
    const parser = new DOMParser();
    res = parser.parseFromString(res, 'text/html');
    res = res.querySelectorAll('div.title h3.medium-heading a');
    results = res;
  }

  getResults();
</script>

<style>
</style>

<h1>{query}</h1>

{#each results as result}
  <a href={result.href}>{result.innerText}</a>
{/each}