<script lang="ts">
	import { goto } from "$app/navigation";
    import {placemarkService} from "../../services/placemarkService";

	placemarkService.logout();
	goto("/");
</script>
