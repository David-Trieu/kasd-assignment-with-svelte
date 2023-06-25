<script lang="ts">

    import Header from '$lib/Header.svelte';
    import Navigator from "$lib/Navigator.svelte";
    import AlterPOI from "$lib/AlterPOI.svelte";
    export let data

    let poi
    poi = data.poi
</script>
<Header>
    <Navigator />
</Header>

<div class="columns is-vcentered">
    <div class="column">
        <div class="title">
            {poi.name}
        </div>
        <div class="title">
            {poi.description}
        </div>
        <div class="title">
            Location: {poi.location.latitude}, {poi.location.longitude}
        </div>
        <div class="title">
            Category: {poi.categoryName}
        </div>
    </div>
    <div class="column"><AlterPOI {data}/></div>
</div>

<div class="column is-half is-centered">
    {#each poi.img as img}
        <figure class="image is-256x256">
            <img src={img} alt="">
        </figure>
    {/each}
</div>


