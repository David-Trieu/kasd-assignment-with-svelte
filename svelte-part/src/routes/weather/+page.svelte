<script>
    import { onMount} from "svelte";
    import Header from '$lib/Header.svelte';
    import Navigator from "$lib/Navigator.svelte";
    import PlacemarkMap from "$lib/PlacemarkMap.svelte";
    import AddPOI from "$lib/AddPOI.svelte";
    import {placemarkService} from "../../services/placemarkService.ts";


    let categories;

    onMount(async () => {
        categories = await placemarkService.getAllCategories();
    });

</script>

<Header>
    <Navigator />
</Header>

<div class="columns is-vcentered">
    <div class="column has-text-centered">
        <h1>For reference</h1>
        <PlacemarkMap mapName="BasicMap" />
        <h1>For travel</h1>
        <PlacemarkMap mapName="BasicMap2", layer="OPNV"/>
    </div>
    <div class="column box has-text-centered">
        <h1>Temperature</h1>
        <PlacemarkMap mapName="TemperatureMap" layer="Temperature"/>
        <h1>Precipitation</h1>
        <PlacemarkMap mapName="PrecipitationMap" layer="Precipitation"/>
    </div>

</div>
