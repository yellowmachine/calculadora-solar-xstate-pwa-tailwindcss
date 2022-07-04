import { writable } from 'svelte/store';
import axios from 'axios';

const T = 2000;

export const radiation = writable({error: false});

export async function getRadiation({lat, lng, azimut, angle}){
    try{
        const {data} = await axios.get(`/api/radiation?lat=${lat}&lng=${lng}&azimut=${azimut}&angle=${angle}`)
        return data
    }catch(error){
        console.log(error)
        return {error: true}
    }
    finally{
        
    }
}
