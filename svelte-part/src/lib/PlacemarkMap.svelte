<script lang="ts">
    //import "leaflet/dist/leaflet.css";
    import { LeafletMap } from "../services/leaflet-map";
    import { onMount } from "svelte";
    import {placemarkService} from "../services/placemarkService.ts";
    import {latestPOI} from "../stores.ts";
    import type {mapConfig_type} from "../services/placemark-types";


    const mapConfig: mapConfig_type = {
        location: { lat: 52.160858, lng: -7.15242 },
        zoom: 8,
        minZoom: 1
    };
    let map
    export let mapName:string
    export let layer:string


    onMount(async () => {
        map = new LeafletMap(mapName, mapConfig, layer);
        map.showZoomControl();
        map.addLayerGroup("POI");
        map.showLayerControl();
        const pois = await placemarkService.getAllPOIS();
        pois.forEach((poi) => {
            let poiStr = `${poi.name} <br> ${poi.description} <br>${poi.categoryName}`
            map.addMarker({ lat: poi.location.latitude, lng: poi.location.longitude },poiStr, "POI", poi._id);
        });
        map.moveTo(2, { lat: 49, lng: 12 });
    });


    latestPOI.subscribe(async (poi) => {
        if (poi && map) {
            let poiStr = `${poi.name} <br> ${poi.description} <br> Category ${poi.categoryName}`
           await map.addMarker({ lat: poi.location.latitude, lng: poi.location.longitude },poiStr, "POI", poi._id);
           await map.moveTo(8, { lat: poi.location.latitude, lng: poi.location.longitude });
        }
    });


</script>

<div class="box" id={mapName} style="height:75vh"></div>
