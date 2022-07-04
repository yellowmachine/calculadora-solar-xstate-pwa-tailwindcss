<script>
  import m from './lib/machine';
  import { useMachine } from '@xstate/svelte';
  import { matchesState } from 'xstate';
  import ReloadPrompt from './lib/ReloadPrompt.svelte'
  import Mapa from './lib/Mapa.svelte';
  import data from './lib/form.js';

  import HStack from './lib/HStack.svelte';
  //import VStack from './lib/VStack.svelte';
  import UserInput from './lib/UserInput.svelte';
  import Input from './lib/Input.svelte'

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

  function handleGo(){
    if(isLatitude($data.lat) && isLongitude($data.lng))
      latlng = {lat: $data.lat, lng: $data.lng}
  }

  $: if(isLatLng({...latlng, azimut, angle})) send('TYPE', {...latlng, azimut, angle})

</script>

<main>
  {#if matchesState('home', $state.value)}
    <div class="grid grid-cols-1 place-items-center">
      <HStack>
        <div>
          <Input bind:value={$data.lat} variant="" label="Latitud">
              My tooltip
          </Input>
        </div>
        <div>
          <button on:click={handleGo} class="btn btn-warning" disabled={!isLatitude($data.lat) || !isLongitude($data.lng)}>Ir</button>
        </div>
        <div>
          <Input bind:value={$data.lng} variant="warning" label="Longitud">
            My tooltip
          </Input>
        </div>
      </HStack>  
      <HStack>
        <UserInput bind:azimut bind:angle>
          <Mapa bind:latlng />
        </UserInput>
      </HStack>  
    </div>
  {:else}
    <p>Resultados</p>
  {/if}
</main>

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
