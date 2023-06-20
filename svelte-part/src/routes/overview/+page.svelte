<script>
  import {beforeUpdate, onMount} from "svelte";
  import Header from '$lib/Header.svelte';
  import Navigator from "$lib/Navigator.svelte";
  import PlacemarkMap from "$lib/PlacemarkMap.svelte";
  import AddPOI from "$lib/AddPOI.svelte";
  import {placemarkService} from "../../services/placemarkService.ts";
  import {goto} from "$app/navigation";

  let categories;

  onMount(async () => {
    categories = await placemarkService.getAllCategories();
  });

</script>

<Header>
  <Navigator />
</Header>

<div class="columns is-vcentered">
  <div class="column has-text-centered">
    <PlacemarkMap />
  </div>
  <div class="column box has-text-centered">
      <AddPOI {categories}/>
  </div>
</div>
