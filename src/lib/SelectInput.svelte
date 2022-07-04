<script>
    import {clickOutside} from './outside.js';
    import { createPopperActions } from 'svelte-popperjs';
    const [popperRef, popperContent] = createPopperActions();
    const popperOptions = {
        modifiers: [
        { name: 'offset', options: { offset: [0, 8] } }
        ],
    };

    let showTooltip = false;
    export let name;
    export let label;
    export let options;
</script>

<div class="form-control" use:clickOutside on:click_outside={()=>showTooltip = false}>
    <label class="input-group">
      <span use:popperRef
      on:click={() => showTooltip = true}>{label}</span>
      <select on:change name={name} class="select w-full max-w-xs">
        {#each options as opt}
        <option value={opt.value}>{opt.description}</option>
        {/each}
      </select>
    </label>
</div>
{#if showTooltip}
<div id="tooltip" use:popperContent={popperOptions}>
    <slot /> 
    <div id="arrow" data-popper-arrow />
</div>
  
{/if}

<style>
    #tooltip {
        background: #333;
        color: white;
        font-weight: bold;
        padding: 4px 8px;
        font-size: 13px;
        border-radius: 4px;
    }
</style>