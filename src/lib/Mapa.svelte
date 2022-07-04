<script>
	import 'leaflet/dist/leaflet.css'
	import {LeafletMap, Marker, TileLayer} from 'svelte-leafletjs';
  
	export let latlng;

	const mapOptions = {
		center: [latlng.lat, latlng.lng],
		zoom: 11,
	};
	let MAP_EL;
  
	const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
	const tileLayerOptions = {
		minZoom: 0,
		maxZoom: 20,
		maxNativeZoom: 19,
		attribution: "© OpenStreetMap contributors",
	};
	$: {
	  if(MAP_EL){
		let map = MAP_EL.getMap();
		map.panTo(latlng)
	  }    
	}
  </script>
  
  <div class="example">
	<LeafletMap bind:this={MAP_EL} events={['click']}  on:click={(ev) => latlng = ev.detail.latlng} options={mapOptions}>
		<TileLayer url={tileUrl} options={tileLayerOptions}/>
		<Marker latLng={[latlng.lat, latlng.lng]}/>
	</LeafletMap>
  </div>
  
  <style>
	.example{
	  height: 500px;
	}
  </style>