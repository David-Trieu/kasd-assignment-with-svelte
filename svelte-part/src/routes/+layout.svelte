<script>
    import { beforeUpdate } from "svelte";
    import {placemarkService} from "../services/placemarkService";
    beforeUpdate(() => {
        placemarkService.reload();
    });
</script>

<div class="container">
    <slot />
</div>
