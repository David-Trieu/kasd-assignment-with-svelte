<script>
    import Header from "$lib/Header.svelte";
    import Chart from "svelte-frappe-charts";
    import { onMount } from "svelte";
    import {placemarkService} from "../../services/placemarkService.ts";
    import Navigator from "$lib/Navigator.svelte";
    import {goto} from "$app/navigation";
    import {latestChart} from "../../stores.ts";

    let charttype;

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
                if (poi.categoryId == category._id) {
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
        placemarkService.reload();
        await refreshChart();
    });
    async function selecttype() {
        latestChart.set(charttype);
        goto(`/charts/${charttype}`);
    }
</script>

<Header>
    <Navigator />
</Header>
<div class="columns">
    <form on:submit|preventDefault={selecttype}>
        <div class="columns is-vcentered">
            <div class="column">
                <div class="select">
                    <select bind:value={charttype} id="charttype">
                        <option value=pie>Pie</option>
                        <option value=bar>Bar</option>
                        <option value=percentage>Percentage</option>
                    </select>
                </div>
            </div>
            <div class="column">
                <div class="control">
                    <button class="button is-link is-light">Change Charttype</button>
                </div>
            </div>
        </div>
    </form>
</div>
<div class="columns">
    <div class="column box has-text-centered">
        <h1 class="title is-4">Category Analysis</h1>
        <Chart {data} type=pie />
    </div>
</div>
