<script lang="ts">
    import Header from "$lib/Header.svelte";
    import Chart from "svelte-frappe-charts";
    import { onMount } from "svelte";
    import {placemarkService} from "../../services/placemarkService.ts";
    import Navigator from "$lib/Navigator.svelte";
    import {goto} from "$app/navigation";
    import {latestChart} from "../../stores.ts";
    import type {Category, POI, User} from "../../services/placemark-types";

    let charttype: string;
    let usercount: number;

    let data = {
        labels: [],
        datasets: [
            {
                values: []
            }
        ]
    };
    function countUser(users: User[]) {
        usercount = users.length;
    }
    function populateByCategory(pois: POI[],categories: Category[]){
        categories.forEach((category: Category) => {
            data.labels.push(`${category.name}`);
            data.datasets[0].values.push(0);
        });
        categories.forEach((category: Category, i: number) =>  {
            data.datasets[0].values[i] = 0;
            pois.forEach((poi: POI) => {
                if (poi.categoryId === category._id) {
                    data.datasets[0].values[i] += 1;
                }
            });
        });
    }
    async function refreshChart(){
        let pois: POI[] = await placemarkService.getAllPOIS();
        let categories: Category[] = await placemarkService.getAllCategories();
        let users: User[] = await placemarkService.getAllUser();
        populateByCategory(pois,categories);
        countUser(users);
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
                        <option value=bar>Bar</option>
                        <option value=pie>Pie</option>
                        <option value=percentage>Percentage</option>
                    </select>
                </div>
            </div>
                <div class="control">
                    <button class="button is-link is-info">Change Charttype</button>
                </div>
        </div>
    </form>
</div>
<div class="columns">
    <div class="column box has-text-centered">
        <h1 class="title is-4">Category Analysis</h1>
        <Chart {data} type=pie />
        <h1 class="title is-4">Users: {usercount}</h1>
    </div>
</div>


