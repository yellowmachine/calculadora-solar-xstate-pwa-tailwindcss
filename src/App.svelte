<script>
   import m from './machine';
  import { useMachine } from '@xstate/svelte';
  import { matchesState } from 'xstate';
  import Counter from './lib/Counter.svelte'
  import ReloadPrompt from './lib/ReloadPrompt.svelte'

  const {state, send} = useMachine(m);
</script>

<main>
  {#if matchesState('home', state)}
    <img src="/favicon.svg" alt="PWA Logo" width="60" height="60"/>
    <h1>Hello world!!!</h1>

    <button class="btn btn-warning">Warning</button>

    <Counter />

    <p>
      Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte
      apps.
    </p>

    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
  {/if}
  
</main>

<div> ... (3)</div>

<ReloadPrompt />

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  img {
    height: 16rem;
    width: 16rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>
