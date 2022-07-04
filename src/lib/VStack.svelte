<script>
    export let col = 2;
</script>

<div class={`grid grid-cols-${col} gap-4`}>
    <slot />
</div>