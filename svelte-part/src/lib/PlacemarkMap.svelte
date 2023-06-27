<script>
    import "leaflet/dist/leaflet.css";
    import { LeafletMap } from "../services/leaflet-map";
    import { onMount } from "svelte";
    import {placemarkService} from "../services/placemarkService.ts";
    import {latestPOI} from "../stores.js";


    const mapConfig = {
        location: { lat: 52.160858, lng: -7.15242 },
        zoom: 8,
        minZoom: 1
    };
    let map
    export let mapName
    export let layer


    onMount(async () => {
        map = new LeafletMap(mapName, mapConfig, layer);
        map.showZoomControl();
        map.addLayerGroup("POI");
        map.showLayerControl();
        const pois = await placemarkService.getAllPOIS();
        pois.forEach((poi) => {
            map.addMarker({ lat: poi.location.latitude, lng: poi.location.longitude },poi.name, "POI", poi._id);
        });
        map.moveTo(2, { lat: 49, lng: 12 });
    });


    latestPOI.subscribe(async (poi) => {
        if (poi && map) {
           await map.addMarker({ lat: poi.location.latitude, lng: poi.location.longitude },poi.name, "POI", poi._id);
           await map.moveTo(8, { lat: poi.location.latitude, lng: poi.location.longitude });
        }
    });


</script>

<div class="box" id={mapName} style="height:75vh"></div>
