<script lang="ts">

    import Header from '$lib/Header.svelte';
    import Navigator from "$lib/Navigator.svelte";
    import AlterPOI from "$lib/AlterPOI.svelte";
    import {placemarkService} from "../../../services/placemarkService";
    import {goto} from "$app/navigation";

    export let data

    let poi;
    poi = data.poi;

    let fileName = "";
    let files;

    async function addImages() {
        fileName = "";
        if (files.length > 0) {
            for (const element of files) {
                fileName += element.name;
            }
        }
    }
    async function uploadImage() {
        await placemarkService.uploadImage(poi._id, files);
        await goto("/explore");
    }
    async function deleteImage(){
        await placemarkService.deleteImage(poi._id);
        await goto("/explore");
    }

</script>
<Header>
    <Navigator />
</Header>

<div class="columns is-vcentered">
    <div class="column">
        <div class="title">
            {poi.name}
        </div>
        <div class="subtitle">
            {poi.description}
        </div>
        <div class="subtitle">
            Location: {poi.location.latitude}, {poi.location.longitude}
        </div>
        <div class="subtitle">
            Category: {poi.categoryName}
        </div>
    </div>
    {#if 1}
        <div className="column">
            <AlterPOI {data}/>
        </div>
    {/if}
</div>
<div class="columns is-centered">
    <div class="column is-half">
        <div class="card">
            <div class="card-content">
                <form on:submit|preventDefault={uploadImage} enctype="multipart/form-data">
                    <div id="file-select" class="file has-name is-fullwidth">
                        <label class="file-label">
                            <input bind:files on:change={addImages} class="file-input" name="imagefile"
                                   type="file" accept="image/png, image/jpeg">
                            <span class="file-cta">
                                <span class="file-icon">
                                    <i class="fas fa-upload"></i>
                                </span>
                                <span class="file-label">
                                    Choose a file…
                                </span>
                            </span>
                            <span class="file-name">{fileName}</span>
                        </label>
                        <button type="submit" class="button is-info">Upload</button>
                    </div>
                </form>
            </div>
            <div class="card-content">
                <form on:submit|preventDefault={deleteImage}>
                    <button type="submit" class="button is-danger">Delete All</button>
                </form>
            </div>
        </div>
        {#each poi.img as img}
            <figure class="image is-256x256">
                <img src={img} alt="">
            </figure>
        {/each}
    </div>
</div>

