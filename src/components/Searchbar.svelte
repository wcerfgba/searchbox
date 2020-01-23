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
</style>

<div class="container">
  <input type="text" bind:value={query} on:keypress={submit} />
</div>