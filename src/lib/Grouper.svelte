<script>
    export let show = false;
    export let always = false;
    export let label;
    export let errors = [false];

    function change(){
        if(!always) show=!show
    }

    $: color = errors.some(x => x) ? "warning": "info"
    $: display = !show ? "a": ""
</script>

<div class="mb-2 mt-2 grid grid-cols-1 place-items-center">
    <button class={`btn btn-${color} md:w-full w-1/3`} on:click|preventDefault={change}>{label}</button>
    <div class={`${display}`}>
        <slot />
    </div>
</div>

<style>
    .a {
        display: none;
    }
</style>