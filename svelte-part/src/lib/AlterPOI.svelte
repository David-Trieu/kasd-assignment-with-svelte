<script lang="ts">
    import { placemarkService } from "../services/placemarkService.ts";
    import type {Category} from "../services/placemark-types";
    export let data;

    let selectedCategory: Category;

    let message:string = "Change the placemark";
    async function alterPlacemark() {
        if (data.poi.name && selectedCategory && data.poi.description) {
            const newPOI = {
                _id: data.poi._id,
                name: data.poi.name,
                description: data.poi.description,
                location: {
                    latitude: data.poi.location.latitude,
                    longitude: data.poi.location.longitude,
                },
                categoryId: selectedCategory._id,
                categoryName: selectedCategory.name,
                img: data.poi.img,
                createdBy: data.poi.createdBy,
            }
            await placemarkService.alterPOI(newPOI);
            message = "You changed the POI";
        } else {
            message = " Something was missing, please start again.";
        }
    }
</script>

<form on:submit|preventDefault={alterPlacemark}>
    <div class="field">
        <label class="label" for="name">Enter Name</label>
        <input bind:value={data.poi.name} class="input" id="name" name="name" type="text">
    </div>
    <div class="field">
        <label class="label" for="description">Description:</label>
        <input bind:value={data.poi.description} class="input" id="description" name="description" type="text"/>
    </div>
    <div class="columns is-vcentered">
        <div class="column is-half">
            <div class="field">
                <label class="label" for="latitude">Latitude:</label>
                <input bind:value={data.poi.location.latitude} class="input" id="latitude" name="latitude" type="number" step="0.00001" min="-90" max="90"/>
            </div>
        </div>
        <div class="column is-half">
            <div class="field">
                <label class="label" for="longitude">Longitude:</label>
                <input bind:value={data.poi.location.longitude} class="input" id="longitude" name="longitude" type="number" step="0.00001" min="-180" max="180"/>
            </div>
        </div>
    </div>
    <div class="field">
        <label class="label" for="category">Choose Category:</label>
        <div class="control">
            <div class="select">
                <select bind:value={selectedCategory} class="input" name="category" id="category">
                    {#each data.category as cat}
                        <option value={cat}>{cat.name}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>
    <div class="field">
        <div class="control">
            <button class="button is-link is-light">Save Changes</button>
        </div>
    </div>
    <div class="box">
        {message}
    </div>
</form>