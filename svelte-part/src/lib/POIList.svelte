<script lang="ts">
    export let pois = [];
</script>

<table class="table is-fullwidth">
    <thead>
    <th>Name</th>
    <th>Category</th>
    <th>Explore</th>
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
                <a href="/summary/{poi._id}" class="button">EXPLORE</a>
            </td>
        </tr>
    {/each}
    </tbody>
</table>
