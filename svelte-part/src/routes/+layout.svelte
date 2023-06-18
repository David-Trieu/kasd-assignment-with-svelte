<script>
    import { beforeUpdate } from "svelte";
    import {placemarkService} from "../service/placemarkService";
    beforeUpdate(() => {
        placemarkService.reload();
    });
</script>

<div class="container">
    <slot />
</div>
