<script lang="ts">

    import Header from '$lib/Header.svelte';
    import Navigator from "$lib/Navigator.svelte";
    import AlterPOI from "$lib/AlterPOI.svelte";
    import {placemarkService} from "../../../services/placemarkService";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";

    export let data
    const apiKey = import.meta.env.VITE_OPWAPI

    let fileName = "";
    let files;
    let conditions;

    async function addImages() {
        fileName = "";
        if (files.length > 0) {
            for (const element of files) {
                fileName += element.name;
            }
        }
    }
    async function uploadImage() {
        await placemarkService.uploadImage(data.poi._id, files);
        await goto("/explore");
    }
    async function deleteImage(){
        await placemarkService.deleteImage(data.poi._id);
        await goto("/explore");
    }
    onMount(async () => {
        const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${data.poi.location.latitude}&lon=${data.poi.location.longitude}&units=metric&appid=${apiKey}` ;
        await fetch(requestUrl, {
            mode: 'cors'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                conditions = data;
            });
    });

</script>
<Header>
    <Navigator />
</Header>

<div class="columns is-vcentered">
    <div class="column">
        <div class="title">
            {data.poi.name}
        </div>
        <div class="subtitle">
            {data.poi.description}
        </div>
        <div class="subtitle">
            Location: {data.poi.location.latitude}, {data.poi.location.longitude}
        </div>
        <div class="subtitle">
            Category: {data.poi.categoryName}
        </div>
        <div class="subtitle">
            Weather: {conditions?.weather[0]?.main}
        </div>
        <div class="subtitle">
            Temperature: {conditions?.main?.temp} °C
        </div>
    </div>
</div>
<details>
    <summary><span class="has-text-info">Edit if it is yours</span></summary>
    <div class="column"><AlterPOI {data}/></div>
</details>
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
        {#each data.poi.img as img}
            <figure class="image is-256x256">
                <img src={img} alt="">
            </figure>
        {/each}
    </div>
</div>

