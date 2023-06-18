<script lang="ts">
	import { goto } from "$app/navigation";
    import {placemarkService} from "../../service/placemarkService";

	placemarkService.logout();
	goto("/");
</script>
