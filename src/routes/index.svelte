<script>
	import Searchbar from '../components/Searchbar.svelte';
	import Searcher from '../components/Searcher.svelte';

	let query;
</script>

<style>
	.searchers {
		display: flex;
		flex-flow: row nowrap;
		overflow-x: auto;
		height: calc(100vh - 2rem);
	}
</style>

<svelte:head>
</svelte:head>

<Searchbar on:submit={(e) => query = e.detail}/>

<div class="searchers">
	{#if query != null}
		<Searcher source="sciencedirect" query={query}/>
		<Searcher source="jstor" query={query}/>
		<Searcher source="sciencedirect" query={query}/>
		<Searcher source="jstor" query={query}/>
		<Searcher source="sciencedirect" query={query}/>
		<Searcher source="jstor" query={query}/>
	{/if}
</div>