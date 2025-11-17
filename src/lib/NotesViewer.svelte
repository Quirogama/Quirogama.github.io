<script>
  import { onMount } from 'svelte';
  let notes = [];
  let text = '';
  const STORAGE_KEY = 'win98-notes';

  onMount(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      notes = raw ? JSON.parse(raw) : [];
    } catch (e) {
      notes = [];
    }
  });

  function save() {
    if (!text.trim()) return;
    notes = [{ id: Date.now(), text: text.trim() }, ...notes];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    text = '';
  }

  function remove(id) {
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }
</script>

<div style="padding:8px;">
  <div style="display:flex;gap:8px;margin-bottom:8px;">
    <input placeholder="Write a quick note..." bind:value={text} style="flex:1;padding:6px;" />
    <button on:click={save}>Add</button>
  </div>

  {#if notes.length}
    <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px;">
      {#each notes as n}
        <li style="border:1px solid #ccc;padding:6px;display:flex;justify-content:space-between;align-items:center;">
          <div style="white-space:pre-wrap;">{n.text}</div>
          <button on:click={() => remove(n.id)}>Del</button>
        </li>
      {/each}
    </ul>
  {:else}
    <div>No notes yet.</div>
  {/if}
</div>

<style>
  button { cursor: pointer; }
</style>
