<script lang="ts">
    import {onMount} from "svelte";
    import { placemarkService} from "../../../../services/placemarkService.ts";
    import { goto } from "$app/navigation";

    export let data;


    onMount(async() =>{
        await placemarkService.deletePOI(data.poi);
        await goto("/explore");
    })
</script>