<script>
    //import Dropzone from "svelte-file-dropzone";
    import { csv2mapa, mapacsv2array } from './utils';
    import vector from './fechayhoracsv'
    import {isHeader, popWhile} from './utils';
    
    let files;
    function extractFromRawCSV(raw){
      if(raw === null){
          return {header: '', tail: ''}
      }
      const lines = raw.split(/\r?\n/)
      let {header, tail} = popWhile(lines, isHeader)
      let h = header.join("\n")
      tail = [...tail.slice(0, 5), "...", ...tail.slice(-5)].join("\n")
      return {header: h, tail}
    }
  
    let content = {header: '', tail: ''};
    export let data;

    function handleFilesSelect(file) {
      console.log('El fichero que se va a calcular es', file);
      const reader = new FileReader();
  
      reader.onload = (evload) => {
          const raw = evload.target.result;
          content = extractFromRawCSV(raw);
          const mapa = csv2mapa(raw);
          const arr = mapacsv2array(mapa, vector);
          data = arr;
      }
      reader.readAsText(file);
    }

  $: if(files && files[0]) handleFilesSelect(files[0])
  </script>
  
  <!--<Dropzone on:drop={handleFilesSelect} />-->
  <!--<input type="file" class="btn btn-active btn-ghost" bind:files>-->

  <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
    <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
    </svg>
    <span class="mt-2 text-base leading-normal">Select a file</span>
    <input bind:files type='file' class="hidden" />
  </label>
  
  {#if files && files[0]}
    <p>
      {files[0].name}
    </p>
  {/if}

  <div>
    <pre>{content.header}</pre>
    <pre>{content.tail}</pre>
  </div>
