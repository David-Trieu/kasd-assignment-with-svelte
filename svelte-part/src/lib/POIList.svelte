<script lang="ts">
    import type {outputPOI} from "../services/placemark-types";

    export let pois: outputPOI[] = [];
</script>

<table class="table is-fullwidth">
    <thead>
    <th>Name:</th>
    <th>Category:</th>
    <th>Explore</th>
    <th>Delete</th>
    </thead>
    <tbody>
    {#each pois as poi}
        <tr>
            <td>
                {poi.name}
            </td>
            <td>
                {poi.categoryName}
            </td>
            <td>
                <a href="/summary/{poi._id}" class="button is-info">Explore</a>
            </td>
            <td><a href="/summary/{poi._id}/delete" class="button is-danger">Delete</a></td>
        </tr>
    {/each}
    </tbody>
</table>
