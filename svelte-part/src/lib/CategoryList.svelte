<script lang="ts">
    import { placemarkService } from "../services/placemarkService.ts";
    export let categories = [];
</script>

<table class="table is-fullwidth">
    <thead>
    <th>Name</th>
    </thead>
    <tbody>
    {#each categories as category}
        <tr>
            <td>
                {category.name}
            </td>
        </tr>
    {/each}
    </tbody>
</table>
