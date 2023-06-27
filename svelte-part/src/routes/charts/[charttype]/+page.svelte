<script lang="ts">
    import Header from "$lib/Header.svelte";
    import Chart from "svelte-frappe-charts";
    import {onMount} from "svelte";
    import {placemarkService} from "../../../services/placemarkService.ts";
    import Navigator from "$lib/Navigator.svelte";
    import {latestChart} from "../../../stores.ts";

    let data = {
        labels: [],
        datasets: [
            {
                values: []
            }
        ]
    };
    function populateByCategory(pois,categories){
        categories.forEach((category) => {
            data.labels.push(`${category.name}`);
            data.datasets[0].values.push(0);
        });
        categories.forEach((category, i) =>  {
            data.datasets[0].values[i] = 0;
            pois.forEach((poi) => {
                if (poi.categoryId.equals(category._id)) {
                    data.datasets[0].values[i] += 1;
                }
            });
        });
    }
    async function refreshChart(){
        let pois = await placemarkService.getAllPOIS();
        let categories = await placemarkService.getAllCategories();
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
    <div class="column box has-text-centered">
        <h1 class="title is-4">Category Analysis</h1>
        <Chart {data} type={$latestChart} />
    </div>
</div>
