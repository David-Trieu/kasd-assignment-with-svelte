<script lang="ts">
    import { onMount} from "svelte";
    import Header from '$lib/Header.svelte';
    import Navigator from "$lib/Navigator.svelte";
    import {placemarkService} from "../../services/placemarkService.ts";
    import POIList from "$lib/POIList.svelte";
    import type {POI} from "../../services/placemark-types";
    let pois: POI[];

    onMount(async () => {
        pois = await placemarkService.getAllPOIS();
    });

</script>

<Header>
    <Navigator />
</Header>

<div class="columns is-vcentered">
    <div class="column has-text-centered">
        <POIList {pois}/>
    </div>
</div>
