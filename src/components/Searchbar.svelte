<script>
  import { createEventDispatcher } from 'svelte';

  let query;

  const dispatch = createEventDispatcher();

  function submit(e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      // Enter pressed
      dispatch('submit', query);
      return false;
    }
  }
</script>

<style>
  .container {
    height: 2rem;
  }

  input {
		font-family: Poppins;
		font-size: 2.7647999999999997em;
		line-height: 4rem;
		font-weight: 400;
		font-style: normal;
		letter-spacing: 0em;
    margin: 0;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.3);
    padding: 0 0.25em;
  }
</style>

<div class="container">
  <input type="text" bind:value={query} on:keypress={submit} />
</div>