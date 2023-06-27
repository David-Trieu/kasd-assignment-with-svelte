<script lang="ts">
    import Header from "$lib/Header.svelte";
    import Chart from "svelte-frappe-charts";
    import {onMount} from "svelte";
    import {placemarkService} from "../../../services/placemarkService.ts";
    import Navigator from "$lib/Navigator.svelte";
    import {latestChart} from "../../../stores.ts";
    import type {Category, POI} from "../../../services/placemark-types";

    let data = {
        labels: [],
        datasets: [
            {
                values: []
            }
        ]
    };
    function populateByCategory(pois: POI[],categories: Category[]){
        categories.forEach((category: Category) => {
            data.labels.push(`${category.name}`);
            data.datasets[0].values.push(0);
        });
        categories.forEach((category: Category, i: number) =>  {
            data.datasets[0].values[i] = 0;
            pois.forEach((poi: POI) => {
                if (poi.categoryId === (category._id)) {
                    data.datasets[0].values[i] += 1;
                }
            });
        });
    }
    async function refreshChart(){
        let pois: POI[] = await placemarkService.getAllPOIS();
        let categories: Category[] = await placemarkService.getAllCategories();
        populateByCategory(pois,categories);
    }
    onMount(async () => {
        await refreshChart();
    });

</script>

<Header>
    <Navigator />
</Header>
<div class="columns">
    <a class="button is-info" href="/charts">Back to Selection</a>
</div>
<div class="columns">
    <div class="column box has-text-centered">
        <h1 class="title is-4">Category Analysis</h1>
        <Chart {data} type={$latestChart} />
    </div>
</div>
