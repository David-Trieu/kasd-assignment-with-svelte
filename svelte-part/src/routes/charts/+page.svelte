<script>
    import Header from "$lib/Header.svelte";
    import Chart from "svelte-frappe-charts";
    import { onMount } from "svelte";
    import {placemarkService} from "../../services/placemarkService.ts";
    import Navigator from "$lib/Navigator.svelte";

    let data = {
        labels: ["Landscape feature","National monument","Walking Trail","Bridges","Tree","Entertainment Venue", "Islands","Town","City","Forest","River","Archaeological Feature"],
        datasets: [
            {
                values: [0,0,0,0,0,0,0,0,0,0,0,0,]
            }
        ]
    };

    onMount(async () => {
        placemarkService.reload()
        let POIList = await placemarkService.getAllPOIS();
        POIList.forEach((poi) => {
            switch (poi.categoryName){
                case "Landscape feature": data.datasets[0].values[0] += 1;break;
                case "National monument": data.datasets[0].values[1] += 1;break;
                case "Walking Trail": data.datasets[0].values[2] += 1;break;
                case "Bridge": data.datasets[0].values[3] += 1;break;
                case "Tree": data.datasets[0].values[4] += 1;break;
                case "Entertainment Venue": data.datasets[0].values[5] += 1;break;
                case "Island": data.datasets[0].values[6] += 1;break;
                case "Town": data.datasets[0].values[7] += 1;break;
                case "City": data.datasets[0].values[8] += 1;break;
                case "Forest": data.datasets[0].values[9] += 1;break;
                case "River": data.datasets[0].values[10] += 1;break;
                case "Archaeological Feature": data.datasets[0].values[11] += 1;break;
            }
        });
    });
</script>

<Header>
    <Navigator />
</Header>

<div class="columns">
    <div class="column box has-text-centered">
        <h1 class="title is-4">Category Analysis</h1>
        <Chart {data} type="bar" />
    </div>
</div>
<div class="columns">
    <div class="column box has-text-centered">
        <h1 class="title is-4">Category Analysis</h1>
        <Chart {data} type="pie" />
    </div>
</div>
