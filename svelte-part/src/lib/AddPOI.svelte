<script lang="ts">
    import { placemarkService } from "../services/placemarkService.ts";
    import type {Category} from "../services/placemark-types";
    export let categories = [];
    let name = "";
    let description = "";
    let longitude = 0;
    let latitude = 0;
    let selectedCategory: Category;


    let message = "Add a point of interest";
    async function addPlacemark() {
        if (name && longitude && latitude && selectedCategory) {
            const newPOI = {
                name: name,
                description: description,
                location: {
                    latitude: latitude,
                    longitude: longitude,
                },
                categoryId: selectedCategory._id,
                categoryName: selectedCategory.name,
            }
            await placemarkService.addPOI(newPOI);
            message = "You pointed out your interest :P";
        } else {
            message = " Something was missing, please start again.";
        }
    }
</script>

<form on:submit|preventDefault={addPlacemark}>
    <div class="field">
        <label class="label" for="name">Enter Name</label>
        <input bind:value={name} class="input" id="name" name="name" type="text" />
    </div>
    <div class="field">
        <label class="label" for="description">Description:</label>
        <input bind:value={description} class="input" id="description" name="description" type="text" />
    </div>
    <div class="columns is-vcentered">
        <div class="column is-half">
            <div class="field">
                <label class="label" for="latitude">Latitude:</label>
                <input bind:value={latitude} class="input" id="latitude" name="latitude" type="number" step="0.00001" min="-90" max="90" />
            </div>
        </div>
        <div class="column is-half">
            <div class="field">
                <label class="label" for="longitude">Longitude:</label>
                <input bind:value={longitude} class="input" id="longitude" name="longitude" type="number" step="0.00001" min="-180" max="180" />
            </div>
        </div>
    </div>
    <div class="field">
        <label class="label" for="category">Choose Category:</label>
        <div class="control">
            <div class="select">
                <select bind:value={selectedCategory} class="input" name="category" id="category">
                    {#each categories as category}
                        <option value={category}>{category.name}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>
    <div class="field">
        <div class="control">
            <button class="button is-link is-light">Add POI</button>
        </div>
    </div>
    <div class="box">
        {message}
    </div>
</form>