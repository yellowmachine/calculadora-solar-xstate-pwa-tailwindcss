<script>
import { createForm } from 'felte';
import Grouper from './Grouper.svelte'
import VStack from './VStack.svelte'
import HStack from './HStack.svelte'
import Input from './FInput.svelte';
import SelectInput from './SelectInput.svelte';
import CheckInput from './CheckInput.svelte';
import FileDropZone from './FileDropZone.svelte';
import { validator } from '@felte/validator-vest';
import suite from './suite.UserInput';
import RInput from './Input.svelte';
import { matchesState } from 'xstate';

export let state;
export let azimut;
export let angle;

let csv;

const optstypeyearconsume = [{value: 1, description: 'Mayor en verano'},
                              {value: 2, description: 'Mayor en invierno'},
                              {value: 3, description: 'Igual durante el año'}]
const optstypedayconsume = [{value: 1, description: "Tarde"},
                            {value: 2, description: "Noche"},
                            {value: 3, description: "Igual"}]
const optsbonopercentage = [{value: 0, description: 'Bono25%'}, 
                            {value: 1, description: 'Bono40%'}]

const { form, data, errors, isValid } = createForm({
    extend: validator({ suite }), 
    onSubmit: (values) => {
        //console.log(csv)
        //console.log('errors', $errors)
        console.log(values)
    },
})

function variant(e, k){
  return e[k] ? "warning": ""
}

function canCalculate(r, isValid){
    return r && !r.error && isValid //check usecsv and file ok!
}

function errorsByKeys(e, keys){
    return keys.map(k => e[k]?true:false)
}

</script>

<div class="w-full">
  <form use:form>

    <Grouper label={"Cubierta"} show={true} always={true}>
      <VStack>
        <HStack>
          <div class="basis-1/2">
            <RInput bind:value={azimut} variant="" label="Azimut">
              My tooltip
            </RInput>
          </div>
          <div class="basis-1/2">
            <RInput bind:value={angle} variant="" label="Ángulo">
              My tooltip
            </RInput>
          </div>
        </HStack>
        <HStack>
          <div class="basis-1/2">
            <Input name="width" variant="" label="Anchura">
              My tooltip
            </Input>
          </div>
          <div class="basis-1/2">
            <Input name="deep" variant="" label="Profundidad">
              My tooltip
            </Input>
          </div>
        </HStack>
      </VStack>
    </Grouper>  

    <slot />

  <Grouper label={"Consumo"} errors={errorsByKeys($errors, ['yearconsume'])}>
      <VStack>
          <HStack>
              <CheckInput name="usecsv" label="Consumo real o aproximado" />
          </HStack>
          <HStack>
              <VStack>
                  <CheckInput name="ree" label="Perfil oficial ree" />
                  <Input name="yearconsume" label="Consumo anual" variant="" />
                  <SelectInput name="typeyearconsume" label="Tipo de consumo anual" options={optstypeyearconsume} />
                  <SelectInput name="typedayconsume" label="Tipo de consumo diario" options={optstypedayconsume} />
              </VStack>
              <div>
                  <FileDropZone bind:data={csv} />
              </div>
          </HStack>
      </VStack>
  </Grouper>

  <Grouper label={"Tarifa"} errors={errorsByKeys($errors, ['power', 'powerrentedvalle', 'fixedrate', 'fixedvalle', 'vallerate', 'vallellano', 'picorate'])}>
    <VStack>
        <HStack>
          <Input class="basis-1/2" name="power" label="Potencia contratada kW" variant={variant($errors, "power")} />
          <Input class="basis-1/2" name="powerrentedvalle" label="Potencia contratada valle (kW) 2.0TD" variant={variant($errors, "powerrentedvalle")} />
        </HStack>
        <HStack>
          <Input class="basis-1/2" name="fixedrate" label="Tarifa de término fijo pico €" variant={variant($errors, "fixedrate")} />
          <Input class="basis-1/2" name="fixedvalle" label="Tarifa de termino fijo valle €" variant={variant($errors, "fixedvalle")} />
        </HStack>
        <HStack>
          <Input class="basis-1/3" name="vallerate" label="Tarifa de energía valle €" variant={variant($errors, "vallerate")} />
          <Input class="basis-1/3" name="vallellano" label="Tarifa energía llano (€/kWh)" variant={variant($errors, "vallellano")} />
          <Input class="basis-1/3" name="picorate" label="Tarifa de energía pico €" variant={variant($errors, "picorate")} />
        </HStack>
        <HStack>
          <CheckInput name="rented" label="Alquiler contador" />
          <CheckInput name="socialb" label="Bono Social" />
        </HStack>
        <HStack>
          <SelectInput name="bonopercentage" label="Bono social porcentaje" options={optsbonopercentage} />
          <Input name="otherconcepts" label="Otros conceptos" variant={variant($errors, "otherconcepts")} />
        </HStack>
    </VStack>     
  </Grouper>

  <Grouper label={"Paneles"} errors={errorsByKeys($errors, ['numpanels', 'panelpower', 'batterycapacity', 'inversorpower'])}>
    <VStack>  
      <HStack>
        <Input name="numpanels" label="Número de paneles" variant={variant($errors, "numpanels")} />
        <Input name="panelpower" label="Potencia del panel (Wp)" variant={variant($errors, "panelpower")} />
      </HStack>     
      <HStack>
        <Input name="batterycapacity" label="Capacidad de la batería" variant={variant($errors, "batterycapacity")} />
        <Input name="inversorpower" label="Potencia del inversor" variant={variant($errors, "inversorpower")} />
      </HStack>
    </VStack>     
  </Grouper>

  <Grouper label="Coche eléctrico" errors={errorsByKeys($errors, ['carannualkm', 'electriccarpower', 'carefficiency'])} >
    <VStack>  
      <HStack>
        <Input class="w-1/3" name="carannualkm" label="Kilómetros anuales del coche" variant={variant($errors, "carannualkm")} />
        <div class="w-1/3"></div>
        <Input class="w-1/3" name="electriccarpower" label="Potencia de carga del coche" variant={variant($errors, "electriccarpower")} />            
      </HStack>     
      <HStack>
        <Input name="carefficiency" label="Eficiencia del coche" variant={variant($errors, "carefficiency")} />
      </HStack>
    </VStack>     
  </Grouper>

    <div class="mb-2 mt-2 grid grid-cols-1 place-items-center">
      {#if matchesState({home: 'radiationDone'}, $state.value)}
          <button class="btn btn-secondary" type="submit">Calcular</button>
      {:else if matchesState({home: 'idle'}, $state.value)}
          <div>Se necesita calcular la radiación</div>
      {:else if matchesState({home: 'error'}, $state.value)}
          <div>Se ha producido un error calculando la radiación</div>
      {:else if matchesState({home: 'fetching'}, $state.value)}
          <div>Calculando radiación</div>
      {:else}
          <div>Hay errores sin capturar</div>
      {/if}
    </div>
  </form>
</div>

<style>
  .shadow{
    pointer-events: none;
    opacity: 0.4;
  }
</style>