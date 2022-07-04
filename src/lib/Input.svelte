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
    export let value;
    export let label;
    export let variant;
</script>

<div class="form-control mr-4 ml-4" use:clickOutside on:click_outside={()=>showTooltip = false}>
    <label class="input-group">
      <span use:popperRef
      on:click={() => showTooltip = true}>{label}</span>
      <input bind:value={value} type="number" placeholder="Type here" class="input input-bordered input-{variant} w-full max-w-xs appearance-none">
    </label>
</div>
{#if showTooltip}
<div id="tooltip" use:popperContent={popperOptions}>
    <slot /> 
    <div id="arrow" data-popper-arrow />
</div>
  
{/if}

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }
    
    #tooltip {
        background: #333;
        color: white;
        font-weight: bold;
        padding: 4px 8px;
        font-size: 13px;
        border-radius: 4px;
    }
</style>