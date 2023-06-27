<script lang="ts">

    import Header from '$lib/Header.svelte';
    import Navigator from "$lib/Navigator.svelte";
    import {onMount} from "svelte";
    import {placemarkService} from "../../services/placemarkService";

    let images:string[] = [];

    onMount(async () => {
        images = await placemarkService.getAllImages();
    });
</script>
<Header>
    <Navigator/>
</Header>
<div class="columns is-centered">
    <div class="column is-half">
        <h1 class="title is-5">Images</h1>
        {#each images as image}
            <figure class="image">
                <img src={image.secure_url} alt="">
            </figure>
        {/each}
    </div>
</div>
