<script lang="ts">

    import Header from '$lib/Header.svelte';
    import Navigator from "$lib/Navigator.svelte";
    import {placemarkService} from "../../../services/placemarkService";
    import {onMount} from "svelte";
    import POIInfo from "$lib/POIInfo.svelte";
    export let data

    let poi
    console.log(data)
    poi = data.poi
</script>
<Header>
    <Navigator />
</Header>

<div class="columns is-vcentered">
    <div class="column">
        <div class="title">
            Name: {poi.name}
        </div>
        <div class="title">
            Description: {poi.description}
        </div>
        <div class="title">
            Latitude: {poi.location.latitude}, Longitude: {poi.location.longitude}
        </div>
        <div class="title">
            Category: {poi.categoryName}
        </div>
    </div>
    <div class="column box has-text-centered">
        <figure class="image is-256x256">
            <img src={poi.img} alt="">
        </figure>
    </div>
</div>


