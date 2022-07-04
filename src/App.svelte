<script>
   import m from './machine';
  import { useMachine } from '@xstate/svelte';
  import { matchesState } from 'xstate';
  import Counter from './lib/Counter.svelte'
  import ReloadPrompt from './lib/ReloadPrompt.svelte'
  import Mapa from './lib/Mapa.svelte';
  import data from './lib/form.js';

  let latlng={lat: $data.lat, lng: $data.lng}
  let azimut = 0.0;
  let angle = 0.0;

  const {state, send} = useMachine(m);

  function isLatitude(v){
    return -90.0 <= v && v <= 90.0
  }

  function isLongitude(v){
    return -180.0 <= v && v <= 180.0
  }

  function isLatLng({lat, lng, azimut, angle}){
    return isLatitude(lat) && isLongitude(lng) //isAzimut(azimut)  isAngle(angle)
  }

  $: if(isLatLng({...latlng, azimut, angle})) send('TYPE', {...latlng, azimut, angle})

</script>

<main>
  {#if matchesState('home', $state.value)}
    <img src="/favicon.svg" alt="PWA Logo" width="60" height="60"/>
    <Mapa {latlng} />
    <button class="btn btn-warning">Warning</button>
  {/if}
  
</main>

<div> ... (4)</div>

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
